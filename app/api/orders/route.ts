import type { OrderStatus } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/session";

export async function GET(req: Request) {
  const session = await getSession();
  if (!session)
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") ?? "";
  const status = searchParams.get("status") as OrderStatus | null;

  const orders = await prisma.order.findMany({
    include: { products: { orderBy: { position: "asc" } } },
    orderBy: { createdAt: "desc" },
    where: {
      AND: [
        search
          ? {
              OR: [
                { id: { contains: search } },
                {
                  products: {
                    some: { name: { contains: search, mode: "insensitive" } },
                  },
                },
              ],
            }
          : {},
        status ? { products: { some: { status } } } : {},
      ],
    },
  });

  return NextResponse.json(orders);
}
