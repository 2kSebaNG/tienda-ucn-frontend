"use client";

import { Eye, Upload, X } from "lucide-react";
import Image from "next/image";
import { useRef } from "react";

import { cn } from "@/lib";

import { useImageInput } from "../hooks";

type ImageInputProps = {
  value: File[];
  onChange: (files: File[]) => void;
  onBlur?: () => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  error?: boolean;
};

export function ImageInput({
  value,
  onChange,
  onBlur,
  name,
  disabled,
  className = "",
  error = false,
}: ImageInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    previews,
    totalSize,
    actions: { handleFiles, removeImage, formatFileSize },
  } = useImageInput({
    value,
    onChange,
    onBlur,
  });

  return (
    <div className={`flex flex-col gap-4 ${className}`}>
      {value.length > 0 && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-500">
              Peso total: {formatFileSize(totalSize)}
            </span>
          </div>

          <div className="space-y-2">
            {value.map((file, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition group"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className=" relative not-only:flex-shrink-0 w-10 h-10 rounded bg-blue-50 flex items-center justify-center overflow-hidden">
                    {previews[idx] ? (
                      <Image
                        src={URL.createObjectURL(file)}
                        alt={file.name}
                        fill
                        className="object-cover"
                        unoptimized
                      />
                    ) : (
                      <span className="text-xs font-medium text-blue-600">
                        {file.name.split(".").pop()?.toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <button
                    type="button"
                    onClick={() => {
                      const url = previews[idx];
                      if (url) window.open(url, "_blank");
                    }}
                    className="p-1.5 text-gray-400 hover:text-gray-600 transition opacity-0 group-hover:opacity-100 cursor-pointer"
                    aria-label="Ver imagen"
                    disabled={disabled}
                  >
                    <Eye size={18} />
                  </button>

                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="p-1.5 text-gray-400 hover:text-red-600 transition cursor-pointer"
                    aria-label="Eliminar archivo"
                    disabled={disabled}
                  >
                    <X size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div
        tabIndex={0}
        onFocus={e => e.currentTarget.classList.add("ring-2", "ring-ring/40")}
        onBlur={e => {
          e.currentTarget.classList.remove("ring-2", "ring-ring/40");
          const related = e.relatedTarget as HTMLElement | null;
          if (!related || !e.currentTarget.contains(related)) {
            onBlur?.();
          }
        }}
        onKeyDown={e => {
          if ((e.key === "Enter" || e.key === " ") && !disabled) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
        className={cn(
          "relative border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center gap-2 transition focus-visible:outline-none",
          disabled && "opacity-70 cursor-not-allowed",
          error
            ? "border-destructive/80 focus-visible:ring-2 focus-visible:ring-destructive/40"
            : "border-gray-300 hover:border-ring/80"
        )}
      >
        <Upload className="h-8 w-8 text-gray-400" />
        <p className="text-sm text-gray-600">
          Arrastra y suelta tus imágenes aquí o haz clic para seleccionar
        </p>
        <p className="text-xs text-gray-400">
          Soporta: JPG, JPEG, PNG, WEBP (Max: 5MB por archivo)
        </p>

        <input
          type="file"
          multiple
          accept=".jpg,.jpeg,.png,.webp"
          name={name}
          ref={inputRef}
          disabled={disabled}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          onChange={e => handleFiles(e.target.files)}
          tabIndex={-1}
        />
      </div>
    </div>
  );
}
