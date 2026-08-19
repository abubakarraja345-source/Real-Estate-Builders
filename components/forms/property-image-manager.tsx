"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import {
  addPropertyImage,
  deletePropertyImage,
  reorderPropertyImages,
  setCoverPropertyImage,
  updatePropertyImageAlt,
} from "@/features/properties/image-actions";
import { uploadPropertyImageFile } from "@/features/properties/image-upload";
import { ALLOWED_IMAGE_MIME_TYPES, validateImageFile } from "@/features/properties/image-validations";
import { getPropertyImageUrl } from "@/lib/supabase/storage";
import type { Database } from "@/types/database";

type PropertyImage = Database["public"]["Tables"]["property_images"]["Row"];

type PendingUpload = {
  key: string;
  fileName: string;
  previewUrl: string;
  status: "uploading" | "error";
  error?: string;
};

export function PropertyImageManager({
  propertyId,
  initialImages,
}: {
  propertyId: string;
  initialImages: PropertyImage[];
}) {
  const [images, setImages] = useState(initialImages);
  const [pending, setPending] = useState<PendingUpload[]>([]);
  const [isReordering, startReorder] = useTransition();
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFiles(files: FileList | null) {
    if (!files || files.length === 0) return;

    for (const file of Array.from(files)) {
      const key = `${file.name}-${crypto.randomUUID()}`;
      const validationError = validateImageFile(file);

      if (validationError) {
        setPending((prev) => [
          ...prev,
          { key, fileName: file.name, previewUrl: "", status: "error", error: validationError },
        ]);
        continue;
      }

      const previewUrl = URL.createObjectURL(file);
      setPending((prev) => [...prev, { key, fileName: file.name, previewUrl, status: "uploading" }]);

      const uploadResult = await uploadPropertyImageFile(propertyId, file);

      if ("error" in uploadResult) {
        setPending((prev) =>
          prev.map((p) => (p.key === key ? { ...p, status: "error", error: uploadResult.error } : p)),
        );
        continue;
      }

      const insertResult = await addPropertyImage(propertyId, uploadResult.storagePath, "");

      if ("error" in insertResult) {
        setPending((prev) =>
          prev.map((p) => (p.key === key ? { ...p, status: "error", error: insertResult.error } : p)),
        );
        continue;
      }

      setImages((prev) => [...prev, insertResult.data]);
      setPending((prev) => prev.filter((p) => p.key !== key));
      URL.revokeObjectURL(previewUrl);
    }
  }

  function dismissPending(key: string) {
    setPending((prev) => prev.filter((p) => p.key !== key));
  }

  async function handleDelete(image: PropertyImage) {
    if (!confirm("Delete this image? This cannot be undone.")) return;
    const prev = images;
    setImages((cur) => cur.filter((i) => i.id !== image.id));
    const result = await deletePropertyImage(propertyId, image.id);
    if ("error" in result) {
      alert(result.error);
      setImages(prev);
    }
  }

  async function handleSetCover(image: PropertyImage) {
    const prevImages = images;
    setImages((cur) => cur.map((i) => ({ ...i, is_cover: i.id === image.id })));
    const result = await setCoverPropertyImage(propertyId, image.id);
    if ("error" in result) {
      alert(result.error);
      setImages(prevImages);
    }
  }

  function move(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;

    const reordered = [...images];
    [reordered[index], reordered[target]] = [reordered[target], reordered[index]];
    setImages(reordered);

    startReorder(async () => {
      const result = await reorderPropertyImages(
        propertyId,
        reordered.map((i) => i.id),
      );
      if ("error" in result) alert(result.error);
    });
  }

  async function handleAltBlur(image: PropertyImage, value: string) {
    if (value === (image.alt_text ?? "")) return;
    setImages((cur) => cur.map((i) => (i.id === image.id ? { ...i, alt_text: value } : i)));
    const result = await updatePropertyImageAlt(image.id, value);
    if ("error" in result) alert(result.error);
  }

  return (
    <div className="flex flex-col gap-4">
      <div
        className="flex flex-col items-center gap-2 rounded-md border-2 border-dashed border-gray-300 px-6 py-8 text-center dark:border-gray-700"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          e.preventDefault();
          void handleFiles(e.dataTransfer.files);
        }}
      >
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drag images here, or{" "}
          <button
            type="button"
            className="font-medium text-gray-900 underline dark:text-gray-100"
            onClick={() => fileInputRef.current?.click()}
          >
            browse
          </button>
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-500">
          JPEG, PNG, or WebP. Up to 8MB each.
        </p>
        <input
          ref={fileInputRef}
          type="file"
          accept={ALLOWED_IMAGE_MIME_TYPES.join(",")}
          multiple
          className="hidden"
          onChange={(e) => {
            void handleFiles(e.target.files);
            e.target.value = "";
          }}
        />
      </div>

      {pending.length > 0 && (
        <ul className="flex flex-col gap-2">
          {pending.map((p) => (
            <li
              key={p.key}
              className="flex items-center gap-3 rounded-md border border-gray-200 px-3 py-2 text-sm dark:border-gray-800"
            >
              {p.previewUrl ? (
                // eslint-disable-next-line @next/next/no-img-element -- local blob: preview, not an optimizable remote asset
                <img
                  src={p.previewUrl}
                  alt=""
                  className="h-10 w-10 shrink-0 rounded object-cover"
                />
              ) : (
                <span className="h-10 w-10 shrink-0 rounded bg-red-100 dark:bg-red-950" aria-hidden="true" />
              )}
              <span className="flex-1 truncate">{p.fileName}</span>
              {p.status === "uploading" ? (
                <span className="text-gray-500 dark:text-gray-400">Uploading…</span>
              ) : (
                <>
                  <span className="text-red-600 dark:text-red-400">{p.error}</span>
                  <button
                    type="button"
                    onClick={() => dismissPending(p.key)}
                    className="text-gray-500 hover:underline dark:text-gray-400"
                  >
                    Dismiss
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}

      {images.length === 0 ? (
        <p className="text-sm text-gray-500 dark:text-gray-500">No images uploaded yet.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <div
              key={image.id}
              className="flex flex-col gap-2 rounded-md border border-gray-200 p-3 dark:border-gray-800"
            >
              <div className="relative aspect-[4/3] overflow-hidden rounded-md bg-gray-100 dark:bg-gray-900">
                <Image
                  src={getPropertyImageUrl(image.storage_path)}
                  alt={image.alt_text ?? ""}
                  fill
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  className="object-cover"
                />
                {image.is_cover && (
                  <span className="absolute left-2 top-2 rounded bg-gray-900/80 px-2 py-0.5 text-xs font-medium text-white">
                    Cover
                  </span>
                )}
              </div>

              <input
                type="text"
                placeholder="Alt text"
                defaultValue={image.alt_text ?? ""}
                onBlur={(e) => handleAltBlur(image, e.target.value)}
                className="rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-700 dark:bg-gray-900"
              />

              <div className="flex flex-wrap items-center gap-3 text-sm">
                <button
                  type="button"
                  onClick={() => handleSetCover(image)}
                  disabled={image.is_cover}
                  className="text-gray-700 hover:underline disabled:text-gray-400 disabled:no-underline dark:text-gray-300 dark:disabled:text-gray-600"
                >
                  {image.is_cover ? "Cover image" : "Set as cover"}
                </button>
                <button
                  type="button"
                  onClick={() => move(index, -1)}
                  disabled={index === 0 || isReordering}
                  className="text-gray-700 hover:underline disabled:text-gray-300 dark:text-gray-300 dark:disabled:text-gray-700"
                >
                  Move up
                </button>
                <button
                  type="button"
                  onClick={() => move(index, 1)}
                  disabled={index === images.length - 1 || isReordering}
                  className="text-gray-700 hover:underline disabled:text-gray-300 dark:text-gray-300 dark:disabled:text-gray-700"
                >
                  Move down
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(image)}
                  className="ml-auto text-red-600 hover:underline dark:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
