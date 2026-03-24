import { ShoppingBag } from "lucide-react"

interface ProductThumbProps {
  color: string
  size?: "sm" | "lg"
}

export function ProductThumb({ color, size = "sm" }: ProductThumbProps) {
  const dim = size === "sm" ? "w-8 h-8" : "w-14 h-14"
  const iconSize = size === "sm" ? 14 : 22

  return (
    <div
      className={`${dim} rounded-lg shrink-0 flex items-center justify-center`}
      style={{ backgroundColor: color + "22", border: `1.5px solid ${color}44` }}
    >
      <ShoppingBag size={iconSize} style={{ color }} />
    </div>
  )
}
