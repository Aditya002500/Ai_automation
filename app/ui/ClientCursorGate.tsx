"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), { ssr: false });

export default function ClientCursorGate() {
  const pathname = usePathname();
  
  // Disable on main dashboard page and collaborative editor pages (content pages)
  const disable = pathname === "/dashboard" || pathname.includes("/dashboard/content/");
  
  if (disable) return null;
  
  return <SplashCursor />;
}
