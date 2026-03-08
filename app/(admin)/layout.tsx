import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  Leaf,
  LayoutDashboard,
  CalendarCheck2,
  Users,
  LogOut,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/login/actions";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row bg-[#F4F1E8]  font-sans">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 bg-white border-r flex flex-col justify-between">
        <div>
          <div className="flex h-16 items-center px-6 border-b">
            <Link
              href="/admin"
              className="flex items-center gap-2 font-serif text-xl tracking-tight text-[#1A4314]"
            >
              Landing Page
            </Link>
          </div>
          <nav className="p-4 space-y- flex sm:flex-col">
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F4F1E8] text-gray-900"
            >
              <LayoutDashboard className="h-4 w-4 text-gray-500" />
              Overview
            </Link>
            <Link
              href="/admin/surveys"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F4F1E8] text-gray-900"
            >
              <CalendarCheck2 className="h-4 w-4 text-gray-500" />
              Surveys
            </Link>
            <Link
              href="/admin/waitlist"
              className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium hover:bg-[#F4F1E8] text-gray-900"
            >
              <Users className="h-4 w-4 text-gray-500" />
              Subscribers
            </Link>
          </nav>
        </div>
        <div className="p-4 border-t"></div>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Header (Mobile / Topbar placeholder) */}
        <header className="flex h-16 items-center justify-end px-6 bg-white border-b lg:bg-transparent lg:border-none">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium text-gray-600">
              {user.email}
            </span>
            <form action={signOut}>
              <Button
                variant="ghost"
                className="w-full justify-start gap-3 rounded-lg px-3 text-red-600 hover:bg-red-50 hover:text-red-700"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
