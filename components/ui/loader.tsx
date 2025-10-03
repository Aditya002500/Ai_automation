"use client";

import { cn } from "@/lib/utils";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function Loader({ size = "md", className }: LoaderProps) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12", 
    lg: "w-16 h-16"
  };

  return (
    <div 
      className={cn(
        "loader",
        sizeClasses[size],
        className
      )}
      style={{
        width: size === "sm" ? "24px" : size === "md" ? "48px" : "64px",
        "--b": size === "sm" ? "4px" : size === "md" ? "8px" : "12px"
      } as React.CSSProperties}
    />
  );
}




