"use client";
import { NavBar } from "@/components/ui/tubelight-navbar";
import Image from "next/image";
import Link from "next/link";
import { HomeIcon, Sparkles, BadgeDollarSign, Users } from "lucide-react";

export default function LandingNav() {
  return (
    <NavBar
      items={[
        { name: "Home", url: "/", icon: HomeIcon },
        { name: "Template", url: "/dashboard", icon: Sparkles },
        { name: "Features", url: "#features", icon: Sparkles },
        { name: "Pricing", url: "#pricing", icon: BadgeDollarSign },
        { name: "Team", url: "#team", icon: Users }
      ]}
      prefix={
        <Link href="/" className="hidden lg:block">
          <Image src={"/logo.svg"} alt="logo" width={120} height={120} />
        </Link>
      }
      suffix={
        <Link href="/dashboard" className="inline-flex items-center gap-x-1 sm:gap-x-2 font-medium border border-white/10 text-white/90 hover:text-white py-1.5 sm:py-2 px-3 sm:px-4 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/15 transition text-xs sm:text-sm whitespace-nowrap">
          <span className="hidden xs:inline">Get started</span>
          <span className="xs:hidden">Start</span>
        </Link>
      }
    />
  );
}
