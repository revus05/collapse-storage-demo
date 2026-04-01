import Image from "next/image";

interface ProductThumbProps {
  imageUrl: string;
  size?: "sm" | "lg";
}

export function ProductThumb({ imageUrl, size = "sm" }: ProductThumbProps) {
  const dim = size === "sm" ? "w-8 h-8" : "w-14 h-14";

  return (
    <div className={`${dim} rounded-lg shrink-0 overflow-hidden bg-muted`}>
      <Image
        src={imageUrl}
        width={40}
        height={40}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}
