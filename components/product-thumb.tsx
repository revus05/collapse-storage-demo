import Image from "next/image";

interface ProductThumbProps {
  imageUrl: string;
  size?: "sm" | "lg";
}

export function ProductThumb({ imageUrl, size = "lg" }: ProductThumbProps) {
  const dim = size === "sm" ? "size-8" : "size-14.5";

  return (
    <div className={`${dim} rounded-lg shrink-0 overflow-hidden bg-muted`}>
      <Image
        src={imageUrl}
        width={58}
        height={58}
        alt=""
        className="w-full h-full object-cover"
      />
    </div>
  );
}
