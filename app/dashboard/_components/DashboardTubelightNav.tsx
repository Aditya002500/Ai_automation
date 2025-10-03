"use client";

import { NavBar } from "@/components/ui/tubelight-navbar";
import { UserButton } from '@clerk/nextjs';
import { Search, Home, FileClock, CreditCard, Settings } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

interface DashboardTubelightNavProps {
  onSearchInput?: (value: string) => void;
}

export default function DashboardTubelightNav({ onSearchInput }: DashboardTubelightNavProps) {
  const navItems = [
    { name: "Template", url: "/dashboard", icon: Home },
    { name: "History", url: "/dashboard/history", icon: FileClock },
    { name: "Billing", url: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="w-full pt-4 pb-2">
      <NavBar
        items={navItems}
        prefix={
          <Link href="/dashboard" className="flex items-center">
            <Image 
              src="/logo.svg" 
              alt="CreatorAI" 
              width={120} 
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        }
        suffix={
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Bar */}
            <div className="relative hidden sm:block">
              <div className="flex items-center gap-2 px-3 py-2 border border-white/20 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 min-w-[150px] sm:min-w-[200px] md:min-w-[250px]">
                <Search className="text-white/60 w-4 h-4 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => onSearchInput && onSearchInput(e.target.value)}
                  className="outline-none bg-transparent text-white placeholder-white/50 w-full text-sm"
                />
              </div>
            </div>

            {/* Mobile Search Icon */}
            <button className="sm:hidden p-2 border border-white/20 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300">
              <Search className="text-white/60 w-4 h-4" />
            </button>

            {/* User Avatar */}
            <div className="flex-shrink-0">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-8 h-8 sm:w-10 sm:h-10 border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300",
                    userButtonAvatarBox: "w-8 h-8 sm:w-10 sm:h-10",
                    userButtonPopoverCard: "bg-slate-800/95 backdrop-blur-md border-slate-600/50 rounded-xl",
                    userButtonPopoverMain: "bg-slate-800/95",
                    userButtonPopoverActionButton: "text-gray-200 hover:bg-purple-500/20 hover:text-white transition-all duration-300",
                    userButtonPopoverActionButtonText: "text-gray-200",
                    userButtonPopoverFooter: "bg-slate-800/95"
                  }
                }} 
              />
            </div>
          </div>
        }
      />
    </div>
  );
}
