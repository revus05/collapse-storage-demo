"use client";

import { extractModelKey } from "@/lib/assembly";
import type { Product } from "@/lib/data";
import { toggleProduct } from "@/store/assemblySlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

export function AssemblyCheckbox({ product }: { product: Product }) {
  const dispatch = useAppDispatch();
  const { selectedIds, modelKey } = useAppSelector((s) => s.assembly);

  const isSelected = selectedIds.includes(product.id);
  const productModelKey = extractModelKey(product.name);
  const isDisabled =
    !isSelected && modelKey !== null && modelKey !== productModelKey;

  return (
    <input
      type="checkbox"
      checked={isSelected}
      disabled={isDisabled}
      onChange={() =>
        dispatch(toggleProduct({ id: product.id, modelKey: productModelKey }))
      }
      onClick={(e) => e.stopPropagation()}
      title={
        isDisabled
          ? `Можно добавлять только товары модели «${modelKey}»`
          : isSelected
            ? "Убрать из комплектации"
            : "Добавить в комплектацию"
      }
      className="w-4 h-4 rounded border-border accent-primary cursor-pointer disabled:opacity-25 disabled:cursor-not-allowed"
    />
  );
}
