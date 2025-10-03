import React, { useState, useEffect } from 'react';
import { Twitter, Github, Linkedin, ArrowUpRight } from 'lucide-react';

//================================================================================
// 1. DEMO COMPONENT (demos/default/code.demo.tsx)
// This file demonstrates how to use the reusable GlassmorphismProfileCard.
//================================================================================

/**
 * This is the main App component that renders the demo.
 * It sets up the theme (light/dark) and provides the CSS variables
 * that the reusable component will use.
 */
export function Component() {
  
  return (
    <>
      <div className="">
        <div className="flex items-center justify-center min-h-screen p-4 font-sans bg-background transition-colors duration-500 sm:p-8 w-full">
          <ProfileCardDemo />
        </div>
      </div>
    </>
  );
}


/**
 * The Demo component that showcases the GlassmorphismProfileCard with specific props.
 */
const ProfileCardDemo = () => {
  const cardProps = {
    avatarUrl: 'https://vucvdpamtrjkzmubwlts.supabase.co/storage/v1/object/public/users/user_2zMtrqo9RMaaIn4f8F2z3oeY497/avatar.png',
    name: 'Ravi Katiyar',
    title: 'Sr. Designer',
    bio: 'Building beautiful and intuitive digital experiences. Passionate about design systems and web animation.',
    socialLinks: [
      { id: 'github', icon: Github, label: 'GitHub', href: '#' },
      { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: '#' },
      { id: 'twitter', icon: Twitter, label: 'Twitter', href: '#' },
    ],
    actionButton: {
      text: 'Contact Me',
      href: '#',
    },
  };

  return <GlassmorphismProfileCard {...cardProps} />;
};


//================================================================================
// 2. REUSABLE COMPONENT (your-component/code.tsx)
// This is the core, reusable component logic. It is fully customizable via props.
//================================================================================

interface SocialLink {
  id: string;
  icon: React.ElementType;
  label: string;
  href: string;
}

interface ActionButtonProps {
  text: string;
  href: string;
}

interface GlassmorphismProfileCardProps {
  avatarUrl: string;
  name: string;
  title: string;
  bio: string;
  socialLinks?: SocialLink[];
  actionButton: ActionButtonProps;
}

/**
 * --- Glassmorphism Profile Card Component ---
 * A responsive, animated, and themeable profile card with a glassmorphism effect.
 */
export const GlassmorphismProfileCard: React.FC<GlassmorphismProfileCardProps> = ({
  avatarUrl,
  name,
  title,
  bio,
  socialLinks = [],
  actionButton,
}) => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div className="relative w-full max-w-sm">
      <div 
        className="relative flex flex-col items-center p-8 rounded-3xl border transition-all duration-500 ease-out backdrop-blur-xl bg-white/10 border-white/20"
        style={{
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
        }}
      >
        <div className="w-24 h-24 mb-4 rounded-full p-1 border-2 border-white/20">
          <img 
            src={avatarUrl} 
            alt={`${name}'s Avatar`}
            className="w-full h-full rounded-full object-cover"
            onError={(e) => { 
              const target = e.target as HTMLImageElement;
              target.onerror = null; 
              target.src = `https://placehold.co/96x96/6366f1/white?text=${name.charAt(0)}`; 
            }}
          />
        </div>

        <h2 className="text-2xl font-bold text-white">{name}</h2>
        <p className="mt-1 text-sm font-medium text-cyan-300">{title}</p>
        <p className="mt-4 text-center text-sm leading-relaxed text-gray-200">{bio}</p>

        <div className="w-1/2 h-px my-6 rounded-full bg-white/20" />

        <div className="flex items-center justify-center gap-3">
          {socialLinks.map((item) => (
            <SocialButton key={item.id} item={item} setHoveredItem={setHoveredItem} hoveredItem={hoveredItem} />
          ))}
        </div>

        <ActionButton action={actionButton} />
      </div>
      
      <div className="absolute inset-0 rounded-3xl -z-10 transition-all duration-500 ease-out blur-2xl opacity-30 bg-gradient-to-r from-indigo-500/50 to-purple-500/50" />
    </div>
  );
};

// --- Sub-components (Internal to GlassmorphismProfileCard) ---

const SocialButton: React.FC<{ item: SocialLink; setHoveredItem: (id: string | null) => void; hoveredItem: string | null }> = ({ item, setHoveredItem, hoveredItem }) => (
  <div className="relative">
    <a
      href={item.href}
      target="_blank"
      rel="noopener noreferrer"
      className="relative flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ease-out group overflow-hidden bg-white/20 hover:bg-white/30"
      onMouseEnter={() => setHoveredItem(item.id)}
      onMouseLeave={() => setHoveredItem(null)}
      aria-label={item.label}
    >
      <div className="relative z-10 flex items-center justify-center">
        <item.icon size={20} className="transition-all duration-200 ease-out text-white/70 group-hover:text-white" />
      </div>
    </a>
    <Tooltip item={item} hoveredItem={hoveredItem} />
  </div>
);

const ActionButton: React.FC<{ action: ActionButtonProps }> = ({ action }) => (
  <a
    href={action.href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-2 px-6 py-3 mt-8 rounded-full font-semibold text-base backdrop-blur-sm transition-all duration-300 ease-out hover:scale-[1.03] active:scale-95 group bg-cyan-500 text-white"
    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
  >
    <span>{action.text}</span>
    <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:rotate-45" />
  </a>
);

const Tooltip: React.FC<{ item: SocialLink; hoveredItem: string | null }> = ({ item, hoveredItem }) => (
  <div 
    role="tooltip"
    className={`absolute -top-12 left-1/2 -translate-x-1/2 z-50 px-3 py-1.5 rounded-lg backdrop-blur-md border text-xs font-medium whitespace-nowrap transition-all duration-300 ease-out pointer-events-none bg-popover text-popover-foreground border-border ${hoveredItem === item.id ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
    style={{ boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
  >
    {item.label}
    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 rotate-45 bg-popover border-b border-r border-border" />
  </div>
);
