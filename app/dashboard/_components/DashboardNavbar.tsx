"use client";

import { UserButton } from '@clerk/nextjs';
import { Search, Home, FileClock, CreditCard, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import React from 'react';

interface DashboardNavbarProps {
  onSearchInput?: (value: string) => void;
}

export default function DashboardNavbar({ onSearchInput }: DashboardNavbarProps) {
  const pathname = usePathname();

  const navItems = [
    { name: "Template", url: "/dashboard", icon: Home },
    { name: "History", url: "/dashboard/history", icon: FileClock },
    { name: "Billing", url: "/dashboard/billing", icon: CreditCard },
    { name: "Settings", url: "/dashboard/settings", icon: Settings },
  ];

  return (
    <div className="w-full bg-transparent backdrop-blur-md rounded-b-3xl">
      <div className="w-full px-8 sm:px-12 lg:px-16">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.svg" 
                alt="CreatorAI" 
                width={120} 
                height={40}
                className="h-8 w-auto"
              />
            </Link>
          </div>

          {/* Navigation Items */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.url;
              
              return (
                <Link
                  key={item.name}
                  href={item.url}
                  className={`
                    relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300
                    ${isActive 
                      ? 'text-white bg-purple-500/20 border border-purple-500/30' 
                      : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                    }
                  `}
                >
                  <div className="flex items-center space-x-2">
                    <Icon size={18} strokeWidth={2} />
                    <span>{item.name}</span>
                  </div>
                  {isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-sm -z-10" />
                  )}
                </Link>
              );
            })}
          </div>

          {/* Search and User Section */}
          <div className="flex items-center space-x-8">
            {/* Search Bar */}
            <div className="relative">
              <div className="flex items-center gap-2 px-3 py-2 border border-white/10 rounded-full bg-white/5 hover:bg-white/10 transition-all duration-300 min-w-[200px] sm:min-w-[250px]">
                <Search className="text-white/60 w-4 h-4 flex-shrink-0" />
                <input
                  type="text"
                  placeholder="Search templates..."
                  onChange={(e) => onSearchInput && onSearchInput(e.target.value)}
                  className="outline-none bg-transparent text-white placeholder-white/50 w-full text-sm"
                />
              </div>
            </div>

            {/* User Avatar */}
            <div className="flex-shrink-0">
              <UserButton 
                appearance={{
                  elements: {
                    avatarBox: "w-10 h-10 border-2 border-purple-500/30 hover:border-purple-500/60 transition-all duration-300",
                    userButtonAvatarBox: "w-10 h-10",
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
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-3 overflow-x-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.url;
                
                return (
                  <Link
                    key={item.name}
                    href={item.url}
                    className={`
                      flex items-center space-x-1 px-3 py-2 rounded-full text-xs font-medium transition-all duration-300 whitespace-nowrap
                      ${isActive 
                        ? 'text-white bg-purple-500/20 border border-purple-500/30' 
                        : 'text-white/80 hover:text-white hover:bg-white/10 border border-transparent'
                      }
                    `}
                  >
                    <Icon size={14} strokeWidth={2} />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
