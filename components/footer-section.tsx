'use client';
import React from 'react';
import type { ComponentProps, ReactNode } from 'react';
import { motion, useReducedMotion } from 'motion/react';
// Removed unused social media icons

interface FooterLink {
	title: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
}

interface FooterSection {
	label: string;
	links: FooterLink[];
}

const footerLinks: FooterSection[] = [
	{
		label: 'Product',
		links: [
			{ title: 'Features', href: '#features' },
			{ title: 'Templates', href: '/dashboard' },
			{ title: 'Pricing', href: '#pricing' },
		],
	},
	{
		label: 'Company',
		links: [
			{ title: 'About Us', href: '#team' },
			{ title: 'Privacy Policy', href: '/privacy' },
			{ title: 'Terms of Service', href: '/terms' },
			{ title: 'Contact Us', href: '/contact' },
		],
	},
];

export function Footer() {
	return (
		<footer className="relative w-full flex flex-col items-center justify-center rounded-t-[3rem] md:rounded-t-[4rem] border-t border-purple-500/20 bg-gradient-to-br from-purple-900/30 via-violet-900/20 to-fuchsia-900/30 backdrop-blur-md px-6 py-12 lg:py-16">
			{/* Star field background */}
			<div className="absolute inset-0 bg-[radial-gradient(1px_1px_at_20px_30px,#8b5cf6,transparent),radial-gradient(1px_1px_at_40px_70px,#a855f7,transparent),radial-gradient(1px_1px_at_90px_40px,#c084fc,transparent)] bg-[length:200px_100px] opacity-40" />
			
			<div className="bg-purple-400/40 absolute top-0 right-1/2 left-1/2 h-px w-1/3 -translate-x-1/2 -translate-y-1/2 rounded-full blur" />

			<div className="grid w-full max-w-7xl mx-auto gap-8 xl:grid-cols-3 xl:gap-8 relative z-10">
				<AnimatedContainer className="space-y-4">
					<div className="flex items-center gap-2">
						<div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
							<span className="text-white font-bold text-sm">CA</span>
						</div>
						<span className="text-white font-semibold text-lg">CreatorAI</span>
					</div>
					<p className="text-purple-200/70 mt-8 text-base md:mt-0">
						© {new Date().getFullYear()} CreatorAI. All rights reserved.
					</p>
				</AnimatedContainer>

				<div className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-2 xl:col-span-2 xl:mt-0">
					{footerLinks.map((section, index) => (
						<AnimatedContainer key={section.label} delay={0.1 + index * 0.1}>
							<div className="mb-10 md:mb-0">
								<h3 className="text-sm text-purple-300 font-semibold uppercase tracking-wider">{section.label}</h3>
								<ul className="text-purple-200/70 mt-4 space-y-2 text-base">
									{section.links.map((link) => (
										<li key={link.title}>
											<a
												href={link.href}
												className="hover:text-purple-300 hover:translate-x-1 inline-flex items-center transition-all duration-300"
											>
												{link.icon && <link.icon className="me-1 size-4" />}
												{link.title}
											</a>
										</li>
									))}
								</ul>
							</div>
						</AnimatedContainer>
					))}
				</div>
			</div>
		</footer>
	);
};

type ViewAnimationProps = {
	delay?: number;
	className?: ComponentProps<typeof motion.div>['className'];
	children: ReactNode;
};

function AnimatedContainer({ className, delay = 0.1, children }: ViewAnimationProps) {
	const shouldReduceMotion = useReducedMotion();

	if (shouldReduceMotion) {
		return children;
	}

	return (
		<motion.div
			initial={{ filter: 'blur(4px)', translateY: -8, opacity: 0 }}
			whileInView={{ filter: 'blur(0px)', translateY: 0, opacity: 1 }}
			viewport={{ once: true }}
			transition={{ delay, duration: 0.8 }}
			className={className}
		>
			{children}
		</motion.div>
	);
};