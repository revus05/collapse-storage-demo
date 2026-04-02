import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { getSession } from "@/lib/session"
import type { OrderStatus } from "@prisma/client"

type PatchBody = {
  status?: OrderStatus
  userComment?: string
  productionComment?: string
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const session = await getSession()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await params
  const body: PatchBody = await req.json()

  // Only admins can change status or production comment
  if ((body.status !== undefined || body.productionComment !== undefined) && session.role !== "ADMIN") {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 })
  }

  const product = await prisma.product.update({
    where: { id },
    data: {
      ...(body.status !== undefined && { status: body.status }),
      ...(body.userComment !== undefined && { userComment: body.userComment }),
      ...(body.productionComment !== undefined && { productionComment: body.productionComment }),
    },
  })

  return NextResponse.json(product)
}
