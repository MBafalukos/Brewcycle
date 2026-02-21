"use client";

import { useEffect, useState } from "react";
import { getWaitlist } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";

export default function AdminWaitlistPage() {
  const [waitlist, setWaitlist] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getWaitlist();
        if (result.success && result.waitlist) {
          setWaitlist(result.waitlist);
        }
      } catch (err) {
        console.error("Failed to load waitlist:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground animate-pulse">Loading waitlist...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-gray-900">Waitlist Signups</h1>
        <p className="text-gray-500 mt-1">Users requesting early access.</p>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Source</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {waitlist.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center py-6 text-muted-foreground">
                  No waitlist entries found.
                </TableCell>
              </TableRow>
            ) : (
              waitlist.map((entry) => (
                <TableRow key={entry.id}>
                  <TableCell>
                    {entry.created_at
                      ? format(new Date(entry.created_at), "MMM d, yyyy HH:mm")
                      : "N/A"}
                  </TableCell>
                  <TableCell className="font-medium">{entry.email}</TableCell>
                  <TableCell>
                    <Badge variant={entry.source === "survey" ? "secondary" : "default"}>
                      {entry.source === "survey" ? "Survey" : "Landing Page"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
