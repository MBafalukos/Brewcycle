"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import { Menu } from "lucide-react";

type NavItem = { label: string; href: string };

type HeaderProps = {
  brand?: { label: string; href?: string };
  nav?: NavItem[];
  cta?: { label: string; href: string };
};

export default function Header({
  brand = { label: "Brewcycle", href: "/" },
  nav = [
    { label: "Home", href: "/" },
    { label: "Kontakt", href: "/contact" },
    { label: "Team", href: "/team" },
  ],
  cta = { label: "Start Survey", href: "/survey" },
}: HeaderProps) {
  const pathname = usePathname();
  const [open, setOpen] = React.useState(false);

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            width={150}
            height={150}
            alt="Picture of the author"
            src="./logos/LogoBrew.svg"
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {nav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={item.href}
                      className={[
                        "inline-flex h-10 items-center rounded-xl px-3 text-sm transition-colors",
                        isActive(item.href)
                          ? "bg-muted text-foreground font-medium"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground",
                      ].join(" ")}
                    >
                      {item.label}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        {/* Desktop CTA */}
        <div className="hidden md:flex">
          <Button asChild className="rounded-xl">
            <Link href={cta.href}>{cta.label}</Link>
          </Button>
        </div>

        {/* Mobile menu */}
        <div className="md:hidden">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="rounded-xl">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>

            <SheetContent side="right" className="w-[320px]">
              <SheetHeader>
                <SheetTitle className="flex items-center gap-2">
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-primary-foreground text-sm font-semibold">
                    B
                  </span>
                  <span>{brand.label}</span>
                </SheetTitle>
              </SheetHeader>

              <div className="mt-6 flex flex-col gap-2">
                {nav.map((item) => (
                  <Button
                    key={item.href}
                    variant={isActive(item.href) ? "secondary" : "ghost"}
                    className="justify-start rounded-xl"
                    asChild
                    onClick={() => setOpen(false)}
                  >
                    <Link href={item.href}>{item.label}</Link>
                  </Button>
                ))}

                <div className="mt-2">
                  <Button className="w-full rounded-xl" asChild>
                    <Link href={cta.href}>{cta.label}</Link>
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
