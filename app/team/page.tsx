// app/team/page.tsx
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Mail, Linkedin, Globe } from "lucide-react";

type TeamMember = {
  id: string;
  name: string;
  role: string;
  location?: string;
  bio?: string;
  imageSrc?: string; // put files in /public/team/...
  links?: { type: "email" | "linkedin"; href: string }[];
};

const TEAM: TeamMember[] = [
  {
    id: "1",
    name: "Aggeliki Sitara",
    role: "CEO & CTO",
    location: "Austria",
    bio: "Building sustainable plant nutrition from brewery by-products.",
    imageSrc: "/Angeliki.jpg",
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
    imageSrc: "/Filip.jpg",
    links: [
      { type: "linkedin", href: "#" },
      { type: "email", href: "filip@brewcycle.at" },
    ],
  },
];

function iconFor(type: "email" | "linkedin") {
  if (type === "email") return Mail;
  if (type === "linkedin") return Linkedin;
  return Globe;
}

function labelFor(type: "email" | "linkedin" | "site") {
  if (type === "email") return "Email";
  if (type === "linkedin") return "LinkedIn";
  return "Website";
}

export default function TeamPage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-6 py-14 sm:py-20">
      {/* Header */}
      <section className="space-y-4">
        <Badge className="bg-[#1F6F50]/15 text-[#1F6F50] hover:bg-[#1F6F50]/15">
          Team
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">
          Die Menschen hinter Brewcycle
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Ein kleines Team mit großer Mission: Kreislaufwirtschaft in echte
          Pflanzenpower verwandeln.
        </p>
      </section>

      {/* Two-person layout */}
      <section className="mt-10 mx-auto max-w-4xl grid gap-6 md:grid-cols-2">
        {TEAM.map((m) => (
          <Card key={m.id} className="overflow-hidden">
            <CardHeader className="space-y-3">
              <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
                {m.imageSrc ? (
                  <Image
                    src={m.imageSrc}
                    alt={m.name}
                    fill
                    className="object-cover bg-"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    priority
                  />
                ) : null}
              </div>

              <div className="space-y-1">
                <CardTitle className="text-xl">{m.name}</CardTitle>
                <p className="text-sm text-muted-foreground">{m.role}</p>
                {m.location ? (
                  <p className="text-sm text-muted-foreground">{m.location}</p>
                ) : null}
              </div>
            </CardHeader>

            <CardContent className="space-y-4">
              {m.bio ? (
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {m.bio}
                </p>
              ) : null}

              <div className="flex flex-wrap gap-2">
                {(m.links ?? []).map((l, idx) => {
                  const Icon = iconFor(l.type);
                  return (
                    <Button
                      key={idx}
                      asChild
                      variant="outline"
                      size="sm"
                      className="rounded-xl"
                    >
                      <a href={l.href} target="_blank" rel="noreferrer">
                        <Icon className="mr-2 h-4 w-4" />
                        {labelFor(l.type)}
                      </a>
                    </Button>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </section>
    </main>
  );
}
