"use client"

import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
  prefix?: React.ReactNode
  suffix?: React.ReactNode
}

export function NavBar({ items, className, prefix, suffix }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  return (
    <div
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 z-50 ",
        className,
      )}
    >
      <div className="flex items-center justify-between gap-3 w-[92vw] max-w-[1200px] bg-background/10 border border-purple-400 backdrop-blur-xl py-2 px-3 sm:px-4 rounded-full shadow-xl">
        {/* Left: Logo / custom prefix */}
        <div className="flex items-center min-w-[140px]">{prefix}</div>

        {/* Middle: Nav items */}
        <div className="flex items-center gap-1 sm:gap-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.name

          return (
            <Link
              key={item.name}
              href={item.url}
              onClick={() => setActiveTab(item.name)}
              className={cn(
                "relative cursor-pointer text-sm sm:text-base font-semibold px-6 sm:px-7 py-2.5 sm:py-3 rounded-full transition-colors",
                isActive ? "text-white bg-muted/80" : "text-foreground/80 hover:text-primary",
              )}
            >
              <span className="hidden md:inline">{item.name}</span>
              <span className="md:hidden">
                <Icon size={18} strokeWidth={2.5} />
              </span>
              {isActive && (
                <motion.div
                  layoutId="lamp"
                  className="absolute inset-0 w-full bg-primary/10 rounded-full -z-10"
                  initial={false}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 30,
                  }}
                >
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-10 h-1 bg-white rounded-t-full">
                    <div className="absolute w-12 h-6 bg-white/30 rounded-full blur-md -top-2 -left-2" />
                    <div className="absolute w-8 h-6 bg-white/30 rounded-full blur-md -top-1" />
                    <div className="absolute w-4 h-4 bg-white/40 rounded-full blur-sm top-0 left-2" />
                  </div>
                </motion.div>
              )}
            </Link>
          )
        })}
        </div>

        {/* Right: CTA / custom suffix */}
        <div className="flex items-center min-w-[140px] justify-end">{suffix}</div>
      </div>
    </div>
  )
}
