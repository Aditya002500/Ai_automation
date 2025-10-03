"use client";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const SplashCursor = dynamic(() => import("@/components/SplashCursor"), { ssr: false });

export default function ClientCursorGate() {
  const pathname = usePathname();
  
  // Only disable on the main dashboard page, enable on all other pages including dashboard sub-pages
  const disable = pathname === "/dashboard";
  
  if (disable) return null;
  
  return <SplashCursor />;
}
