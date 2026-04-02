"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";
import { patchProductComment } from "@/lib/api";

type Status = "idle" | "saving" | "saved";

type ProductCommentProps = {
  productId: string;
  field: "userComment" | "productionComment";
  label?: string;
  initialValue: string;
  readonly?: boolean;
  rows?: number;
  /** Inline mode: shows plain text, click → textarea, blur → text */
  inline?: boolean;
};

export function ProductComment({
  productId,
  field,
  label,
  initialValue,
  readonly = false,
  rows = 3,
  inline = false,
}: ProductCommentProps) {
  const [value, setValue] = useState(initialValue);
  const [status, setStatus] = useState<Status>("idle");
  const [isEditing, setIsEditing] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const savedTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (status === "idle") {
      setValue(initialValue);
    }
  }, [initialValue, status]);

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (text: string) => patchProductComment(productId, field, text),
    onSuccess: () => {
      setStatus("saved");
      if (savedTimer.current) clearTimeout(savedTimer.current);
      savedTimer.current = setTimeout(() => setStatus("idle"), 2000);
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: () => setStatus("idle"),
  });

  function handleChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const next = e.target.value;
    setValue(next);
    setStatus("saving");
    if (debounceTimer.current) clearTimeout(debounceTimer.current);
    debounceTimer.current = setTimeout(() => mutate(next), 800);
  }

  /* ── Inline mode ─────────────────────────────────────────────── */
  if (inline) {
    if (!isEditing) {
      return (
        <div className="relative">
          <button
            type="button"
            onClick={() => setIsEditing(true)}
            className="w-full text-left rounded-md px-2 py-1 -mx-2 -my-1 hover:bg-muted/60 transition-colors"
          >
            {value ? (
              <span className="text-sm text-foreground line-clamp-2">
                {value}
              </span>
            ) : (
              <span className="text-xs text-muted-foreground/60 italic">
                Добавить комментарий...
              </span>
            )}
          </button>
          {status !== "idle" && (
            <span
              className={`absolute -top-5 right-0 text-xs pointer-events-none ${status === "saved" ? "text-emerald-600 dark:text-emerald-400" : "text-muted-foreground"}`}
            >
              {status === "saving" ? "Сохранение..." : "Сохранено"}
            </span>
          )}
        </div>
      );
    }
    return (
      <div className="relative">
        <textarea
          value={value}
          onChange={handleChange}
          onBlur={() => setIsEditing(false)}
          rows={rows}
          placeholder="Введите комментарий..."
          className="w-full rounded-lg border border-ring bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
        />
        <span className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">
          {status === "saving" && "Сохранение..."}
          {status === "saved" && (
            <span className="text-emerald-600 dark:text-emerald-400">
              Сохранено
            </span>
          )}
        </span>
      </div>
    );
  }

  /* ── Default mode ────────────────────────────────────────────── */
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            {label}
          </p>
          {status === "saving" && (
            <span className="text-xs text-muted-foreground">Сохранение...</span>
          )}
          {status === "saved" && (
            <span className="text-xs text-emerald-600 dark:text-emerald-400">
              Сохранено
            </span>
          )}
        </div>
      )}
      {readonly ? (
        <p className="text-sm text-foreground min-h-8">
          {value || (
            <span className="text-muted-foreground italic">
              Нет комментария
            </span>
          )}
        </p>
      ) : (
        <div className="relative">
          <textarea
            value={value}
            onChange={handleChange}
            rows={rows}
            placeholder="Введите комментарий..."
            className="block w-full rounded-lg border border-border bg-background px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-ring placeholder:text-muted-foreground"
          />
          {!label && (
            <span className="absolute bottom-2 right-2 text-xs text-muted-foreground pointer-events-none">
              {status === "saving" && "Сохранение..."}
              {status === "saved" && (
                <span className="text-emerald-600 dark:text-emerald-400">
                  Сохранено
                </span>
              )}
            </span>
          )}
        </div>
      )}
    </div>
  );
}
