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
        <Link href="/">
          <Image src={"/logo.svg"} alt="logo" width={120} height={120} />
        </Link>
      }
      suffix={
        <Link href="/dashboard" className="inline-flex items-center gap-x-2 font-medium border border-white/10 text-white/90 hover:text-white py-2 px-4 rounded-full backdrop-blur-md bg-white/10 hover:bg-white/15 transition">
          Get started
        </Link>
      }
    />
  );
}
