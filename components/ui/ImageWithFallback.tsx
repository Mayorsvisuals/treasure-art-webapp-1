"use client";

import React, { useState } from "react";
import Image, { ImageProps } from "next/image";
import { Image as ImageIcon } from "lucide-react";

export function ImageWithFallback({ src, alt, fallbackText = "Treasure Arts", className = "", ...rest }: ImageProps & { fallbackText?: string }) {
  const [error, setError] = useState(false);

  if (error || !src) {
    return (
      <div className={`flex flex-col items-center justify-center bg-gray-100 text-gray-500 w-full h-full ${className}`}>
        <ImageIcon className="w-8 h-8 mb-2 opacity-50" />
        <span className="text-xs tracking-wider uppercase font-medium">{fallbackText}</span>
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      sizes={rest.fill && !rest.sizes ? "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" : rest.sizes}
      onError={() => {
        setError(true);
      }}
      {...rest}
    />
  );
}
