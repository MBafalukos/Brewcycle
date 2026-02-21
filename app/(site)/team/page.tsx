// app/team/page.tsx
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Globe, MapPin } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  location?: string;
  bio?: string;
  imageSrc?: string;
  links?: { type: "email" | "linkedin"; href: string }[];
};

const TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Aggeliki Sitara",
    role: "CEO & CTO",
    location: "Austria",
    bio: "Building sustainable plant nutrition from brewery by-products.",
    imageSrc: "/team/Angeliki.jpg",
    links: [
      { type: "linkedin", href: "#" },
      { type: "email", href: "mailto:angeliki@brewcycle.at" },
    ],
  },
  {
    id: "2",
    name: "Philip Dvoracek",
    role: "CMO & CTO",
    location: "Vienna",
    bio: "Product, partnerships, and operations.",
    imageSrc: "/team/Filip.jpg",
    links: [
      { type: "linkedin", href: "#" },
      { type: "email", href: "mailto:filip@brewcycle.at" },
    ],
  },
];

function iconFor(type: "email" | "linkedin") {
  if (type === "email") return Mail;
  if (type === "linkedin") return Linkedin;
  return Globe;
}

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-[#F8F2E8] font-sans py-16 sm:py-24">
      <div className="container mx-auto px-6 max-w-6xl">
        {/* Header Section */}
        <section className="flex flex-col items-center text-center space-y-6 mb-16 sm:mb-24">
          <Badge className="bg-[#1F6F50]/10 text-[#1F6F50] border-[#1F6F50]/20 px-4 py-1.5 text-sm font-medium hover:bg-[#1F6F50]/15 transition-colors uppercase tracking-[0.2em] rounded-full">
            Unser Team
          </Badge>
          <h1 className="text-4xl font-bold tracking-tight text-[#3d571c] sm:text-5xl lg:text-6xl max-w-3xl">
            Die Menschen hinter <span className="text-black/80">Brewcycle</span>
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed">
            Ein kleines Team mit großer Mission: Kreislaufwirtschaft in echte
            Pflanzenpower verwandeln. Wir verbinden Leidenschaft für
            Nachhaltigkeit mit technischer Expertise.
          </p>
        </section>

        {/* Team Grid */}
        <section className="grid gap-10 md:grid-cols-2 max-w-5xl mx-auto">
          {TEAM.map((member) => (
            <Card
              key={member.id}
              className="group relative overflow-hidden border-0 bg-white/40 backdrop-blur-md shadow-xl shadow-black/5 ring-1 ring-black/5 rounded-lg transition-all duration-500 hover:shadow-2xl hover:shadow-[#1F6F50]/10 hover:-translate-y-1"
            >
              <CardContent className="p">
                <div className="flex flex-col sm:flex-row h-full">
                  {/* Image Container */}
                  <div className="relative w-full sm:w-2/5 aspect-[4/5]  sm:aspect-auto overflow-hidden">
                    {member.imageSrc ? (
                      <Image
                        src={member.imageSrc}
                        alt={member.name}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, 100vw"
                        priority
                      />
                    ) : (
                      <div className="h-full w-full bg-[#1F6F50]/5 flex items-center justify-center">
                        <span className="text-[#1F6F50]/20 font-bold text-4xl">
                          {member.name[0]}
                        </span>
                      </div>
                    )}

                    {/* Hover Overlay for social buttons on mobile? Or just display them below */}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 p-8 sm:p-10 flex flex-col justify-between">
                    <div className="space-y-4">
                      <div className="space-y-1">
                        <h2 className="text-2xl font-bold text-foreground transition-colors group-hover:text-[#1F6F50]">
                          {member.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="text-[#3d571c] font-semibold text-sm tracking-wide uppercase">
                            {member.role}
                          </p>
                          {member.location && (
                            <span className="flex items-center gap-1 text-xs text-muted-foreground font-medium">
                              <MapPin className="h-3 w-3" />
                              {member.location}
                            </span>
                          )}
                        </div>
                      </div>

                      {member.bio && (
                        <p className="text-sm leading-relaxed text-muted-foreground font-medium line-clamp-4">
                          {member.bio}
                        </p>
                      )}
                    </div>

                    <div className="mt-8 flex items-center gap-3">
                      {(member.links ?? []).map((link, idx) => {
                        const Icon = iconFor(link.type);
                        return (
                          <Button
                            key={idx}
                            asChild
                            variant="ghost"
                            size="icon"
                            className="h-10 w-10 rounded-xl bg-white border border-transparent shadow-sm hover:border-[#1F6F50]/20 hover:bg-[#1F6F50]/5 hover:text-[#1F6F50] transition-all"
                          >
                            <a
                              href={link.href}
                              target="_blank"
                              rel="noreferrer"
                              title={link.type}
                            >
                              <Icon className="h-5 w-5" />
                              <span className="sr-only">{link.type}</span>
                            </a>
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </section>

        {/* Footer Mission Statement */}
        <section className="mt-20 sm:mt-32 text-center"></section>
      </div>
    </main>
  );
}
