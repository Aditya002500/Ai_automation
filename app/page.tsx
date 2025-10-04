"use client";

import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { HoverButton } from "@/components/ui/hover-button";
import LandingNav from "@/components/LandingNav";
import { Loader } from "@/components/ui/loader";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useCallback, lazy, Suspense } from "react";

// Lazy load heavy components for better performance
const FeaturesCards = lazy(() => import("@/components/feature-shader-cards"));
const ModernPricingPage = lazy(() => import("@/components/animated-glassy-pricing").then(module => ({ default: module.ModernPricingPage })));
const TeamSection = lazy(() => import("@/components/TeamSection"));
const Footer = lazy(() => import("@/components/footer-section").then(module => ({ default: module.Footer })));

export default function Home() {
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());
  const sectionRefs = useRef<{ [key: string]: HTMLElement | null }>({});
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  // Optimized intersection observer with debouncing to prevent blinking
  const handleIntersection = useCallback((entries: IntersectionObserverEntry[]) => {
    // Clear existing timeout
    if (debounceTimeout.current) {
      clearTimeout(debounceTimeout.current);
    }
    
    // Debounce state updates to prevent rapid changes
    debounceTimeout.current = setTimeout(() => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        // Only add section if it's significantly visible (more than 40% threshold)
        if (entry.isIntersecting && entry.intersectionRatio > 0.4) {
          setVisibleSections(prev => new Set(Array.from(prev).concat(sectionId)));
        } else if (!entry.isIntersecting || entry.intersectionRatio < 0.05) {
          // Only remove section if it's almost completely out of view
          setVisibleSections(prev => {
            const newSet = new Set(Array.from(prev));
            newSet.delete(sectionId);
            return newSet;
          });
        }
      });
    }, 50); // 50ms debounce
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      threshold: [0.1, 0.3, 0.5, 0.7, 0.9], // Multiple thresholds for smoother transitions
      rootMargin: '-20px 0px -20px 0px' // Reduced margin to prevent premature triggers
    });

    Object.values(sectionRefs.current).forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => {
      observer.disconnect();
      // Clean up timeout on unmount
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [handleIntersection]);

  const getStackStyle = (sectionId: string, index: number) => {
    const isVisible = visibleSections.has(sectionId);
    const baseZIndex = 10 - index;
    const translateY = isVisible ? 0 : 30 + (index * 15); // Reduced movement distance
    const opacity = 1; // Always full opacity - no dimming!
    const scale = isVisible ? 1 : 0.98; // Reduced scale change

    return {
      transform: `translateY(${translateY}px) scale(${scale})`,
      opacity,
      zIndex: baseZIndex,
      transition: 'all 1.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)', // Longer, smoother transition
    };
  };

  return (
    // Full-screen background with the geometric pattern extending across entire page
    <div className="min-h-screen bg-[#0a0a0f] px-4 pt-4 pb-4 flex flex-col gap-8">
      {/* Header removed; Tubelight navbar handles logo and CTA */}

      {/* Tubelight Navbar (glass, rounded) */}
      <LandingNav />
      
      {/* Full-screen Hero Section with background extending across entire viewport */}
      <div 
        ref={(el) => { sectionRefs.current.home = el; }}
        id="home" 
        className="relative min-h-screen bg-[#0a0a0f] rounded-3xl overflow-hidden border border-purple-500/20 z-10"
        style={getStackStyle('home', 0)}
      >
        {/* Geometric background that extends beyond screen height to cover features */}
        <div className="absolute inset-0" style={{ height: '150vh' }}>
          <HeroGeometric
            badge="CompileCraft"
            title1="AI Content"
            title2="Generator"
          />
        </div>
        
        {/* Content overlay positioned in front of background - positioned at bottom of hero */}
        <div className="absolute bottom-0 left-0 right-0 z-32 pb-16 sm:pb-24 md:pb-32 px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Get Started Button - positioned directly below the title */}
            <div className="mb-2 sm:mb-3">
              <HoverButton href="/dashboard">
                Get started
                {/* <svg className="flex-shrink-0 size-4 ml-2" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg> */}
              </HoverButton>
            </div>
            
            {/* Descriptive paragraph - positioned below the button */}
            <div className="max-w-3xl mx-auto px-2">
              <p className="text-sm sm:text-base md:text-lg text-white/90 drop-shadow-lg leading-relaxed">
                Revolutionize your content creation with our AI-powered app, delivering engaging and high-quality text in seconds.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Features section with shader cards */}
      <div 
        ref={(el) => { sectionRefs.current.features = el; }}
        id="features"
        className="relative rounded-3xl overflow-hidden border border-purple-500/20 z-10"
        style={getStackStyle('features', 1)}
      >
        <Suspense fallback={<div className="flex items-center justify-center h-96"><Loader size="md" /></div>}>
          <FeaturesCards />
        </Suspense>
      </div>

      {/* Templates anchor (takes user to dashboard templates CTA) */}
      <div 
        ref={(el) => { sectionRefs.current.templates = el; }}
        id="templates" 
        className="relative bg-[#0a0a0f] rounded-3xl overflow-hidden border border-purple-500/20 z-10 py-6 sm:py-8"
        style={getStackStyle('templates', 2)}
      >
        <div className="flex items-center justify-center px-4 sm:px-6 lg:px-8">
          <Link href="/dashboard" className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 hover:bg-white/15 backdrop-blur-md px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base text-white transition whitespace-nowrap">
            Explore Templates
          </Link>
        </div>
      </div>

      {/* Pricing placeholder anchor */}
      <div 
        ref={(el) => { sectionRefs.current.pricing = el; }}
        id="pricing" 
        className="relative rounded-3xl overflow-hidden border border-purple-500/20 z-10"
        style={getStackStyle('pricing', 3)}
      >
        <Suspense fallback={<div className="flex items-center justify-center h-96"><Loader size="md" /></div>}>
          <ModernPricingPage
            title={<span>Creator AI Pricing</span>}
            subtitle={<span>Choose the plan that's right for you and your team. Start creating for free and upgrade as you grow.</span>}
            plans={[
              {
                planName: "Starter",
                description: "Perfect for individuals and students getting started with AI-powered creation.",
                price: "0",
                features: [
                  "AI Content Generation",
                  "Collaborative Editor",
                  "AI Research Canvas",
                  "Quick Research (Gemini)",
                ],
                buttonText: "Get Started",
                buttonVariant: 'secondary'
              },
              {
                planName: "Pro",
                description: "The ultimate toolkit for content creators, freelancers, and small teams who need unlimited power.",
                price: "19",
                features: [
                  "Everything in Starter",
                  "Unlimited AI Content",
                  "Deep Research (Jina AI)",
                  "Team Management",
                  "Full Version History",
                ],
                buttonText: "Upgrade",
                isPopular: true,
              },
              {
                planName: "Enterprise",
                description: "A secure, scalable solution for large teams and organizations that require advanced control and support.",
                price: "Custom",
                features: [
                  "Everything in Pro",
                  "Advanced Security (SSO)",
                  "Role-Based Access Control",
                  "Complete Audit Logs",
                  "Dedicated Support & Onboarding",
                ],
                buttonText: "Contact Sales",
                buttonVariant: 'secondary'
              },
            ]}
            showAnimatedBackground={true}
          />
        </Suspense>
      </div>

      {/* Team section */}
      <div 
        ref={(el) => { sectionRefs.current.team = el; }}
        id="team"
        className="relative rounded-3xl overflow-hidden border border-purple-500/20 z-10"
        style={getStackStyle('team', 4)}
      >
        <Suspense fallback={<div className="flex items-center justify-center h-96"><Loader size="md" /></div>}>
          <TeamSection />
        </Suspense>
      </div>

      {/* Footer section */}
      <div 
        ref={(el) => { sectionRefs.current.footer = el; }}
        id="footer" 
        className="relative z-10 mt-auto"
        style={getStackStyle('footer', 5)}
      >
        <Suspense fallback={<div className="flex items-center justify-center h-32"><Loader size="sm" /></div>}>
          <Footer />
        </Suspense>
      </div>
    </div>
  );
}
