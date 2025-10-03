'use client'
import React, { useRef, useState } from "react";
import { motion } from "framer-motion";

interface FeatureGradientCardProps {
  title: string;
  content: string;
}

export default function FeatureGradientCard({ title, content }: FeatureGradientCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 5;
    const rotateY = (x / rect.width) * 5;
    setRotation({ x: rotateX, y: rotateY });
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-3xl overflow-hidden w-full h-full min-h-[320px] bg-[#0e131f]"
      style={{ transformStyle: "preserve-3d" }}
      initial={{ y: 0 }}
      animate={{ y: isHovered ? -4 : 0, rotateX: rotation.x, rotateY: rotation.y, perspective: 1000 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => { setIsHovered(false); setRotation({ x: 0, y: 0 }); }}
      onMouseMove={handleMouseMove}
    >
      <motion.div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #000000 0%, #000000 70%)" }} />
      <motion.div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='5' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`
      }} />
      <motion.div className="absolute bottom-0 left-0 right-0 h-2/3" style={{
        background: `radial-gradient(ellipse at bottom right, rgba(172, 92, 255, 0.7) -10%, rgba(79, 70, 229, 0) 70%), radial-gradient(ellipse at bottom left, rgba(56, 189, 248, 0.7) -10%, rgba(79, 70, 229, 0) 70%)`,
        filter: "blur(40px)"
      }} animate={{ opacity: isHovered ? 0.9 : 0.8 }} />

      <div className="relative z-10 p-6 md:p-8">
        <h3 className="text-white text-xl md:text-2xl font-semibold mb-3">{title}</h3>
        <p className="text-gray-300 text-sm md:text-base leading-relaxed">{content}</p>
      </div>
    </motion.div>
  );
}



