"use client";
import { GlassmorphismProfileCard } from "@/components/profile-card-1";
import { Github, Linkedin, Mail } from 'lucide-react';

export default function TeamSection() {
  const teamMembers = [
    {
      avatarUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fmale-avatar&psig=AOvVaw15_h3i8Ik-0xHhxnKXymVH&ust=1759615998720000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjSkMaGiZADFQAAAAAdAAAAABAE',
      name: 'Aditya Kumar',
      title: 'Backend & DevOps',
      bio: 'Building robust backend systems and scalable infrastructure. Passionate about cloud architecture and automation.',
      socialLinks: [
        { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/Aditya002500' },
        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://linkedin.com/in/aditya-kumar-93567b286' },
        { id: 'mail', icon: Mail, label: 'Email', href: 'mailto:adityakumar250025@gmail.com' },
      ],
      actionButton: { text: 'Contact', href: 'mailto:adityakumar250025@gmail.com' },
    },
    {
      avatarUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fmale-avatar&psig=AOvVaw15_h3i8Ik-0xHhxnKXymVH&ust=1759615998720000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjSkMaGiZADFQAAAAAdAAAAABAE',
      name: 'Abhishek Kumar Chaudhary',
      title: 'Full Stack & AI Integration',
      bio: 'Developing intelligent systems and seamless user experiences. Bridging the gap between AI capabilities and practical applications.',
      socialLinks: [
        { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/Abhishek-ch30' },
        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'http://linkedin.com/in/abhishekkumarc' },
        { id: 'mail', icon: Mail, label: 'Email', href: 'mailto:abhishekvox15@gmail.com' },
      ],
      actionButton: { text: 'Contact', href: 'mailto:abhishekvox15@gmail.com' },
    },
    {
      avatarUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.vecteezy.com%2Ffree-vector%2Fmale-avatar&psig=AOvVaw15_h3i8Ik-0xHhxnKXymVH&ust=1759615998720000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMjSkMaGiZADFQAAAAAdAAAAABAE',
      name: 'M Pranav',
      title: 'UI/UX Design',
      bio: 'Crafting beautiful and intuitive interfaces. Making complex AI tools feel simple and accessible to everyone.',
      socialLinks: [
        { id: 'github', icon: Github, label: 'GitHub', href: 'https://github.com/GHPRNV' },
        { id: 'linkedin', icon: Linkedin, label: 'LinkedIn', href: 'https://www.linkedin.com/in/m-pranav-a622a0293/' },
        { id: 'mail', icon: Mail, label: 'Email', href: 'mailto:5361129.10.pranav@gmail.com' },
      ],
      actionButton: { text: 'Contact', href: 'mailto:5361129.10.pranav@gmail.com' },
    },
  ];

  return (
    <section className="relative z-10 bg-[#0a0a0f]">
      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4">Meet Our Team</h2>
          <p className="text-[18px] md:text-[22px] text-white/90 max-w-3xl mx-auto leading-relaxed">
            The passionate minds behind CreatorAI, dedicated to revolutionizing content creation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-10 lg:gap-10 justify-items-center">
          {teamMembers.map((member, index) => (
            <div key={index} className="w-full max-w-sm">
              <div className="relative">
                <GlassmorphismProfileCard {...member} />
                <div className="absolute inset-0 rounded-3xl -z-10 transition-all duration-500 ease-out blur-2xl opacity-40 bg-gradient-to-r from-[#294861] via-[#2a454b] to-[#0e1c26]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
