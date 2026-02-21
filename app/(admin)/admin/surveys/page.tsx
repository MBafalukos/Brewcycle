"use client";

import { useEffect, useState } from "react";
import { getSurveys } from "../actions";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { format } from "date-fns";

export default function AdminSurveysPage() {
  const [surveys, setSurveys] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const result = await getSurveys();
        if (result.success && result.surveys) {
          setSurveys(result.surveys);
        }
      } catch (err) {
        console.error("Failed to load surveys:", err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <p className="text-muted-foreground animate-pulse">
          Loading surveys...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-serif text-gray-900">Surveys</h1>
        <p className="text-gray-500 mt-1">
          View all collected survey responses.
        </p>
      </div>

      <div className="rounded-md border bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Waitlist Consent</TableHead>
              <TableHead>Contact Consent</TableHead>
              <TableHead>Answers</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {surveys.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center py-6 text-muted-foreground"
                >
                  No surveys found.
                </TableCell>
              </TableRow>
            ) : (
              surveys.map((survey) => (
                <TableRow key={survey.id}>
                  <TableCell>
                    {survey.created_at
                      ? format(new Date(survey.created_at), "MMM d, yyyy HH:mm")
                      : "N/A"}
                  </TableCell>
                  <TableCell>{survey.email || "Anonymous"}</TableCell>
                  <TableCell>
                    {survey.waitlist_consent ? "Yes" : "No"}
                  </TableCell>
                  <TableCell>
                    {survey.contact_me_consent ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="min-w-[400px]">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem
                        value={`item-${survey.id}`}
                        className="border-none"
                      >
                        <AccordionTrigger className="w-auto h-8 px-3 py-0 flex-none justify-center items-center text-xs font-medium rounded-md border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground text-foreground transition-colors [&[data-state=closed]>.hide-text]:hidden [&[data-state=closed]>.show-text]:block [&[data-state=open]>.hide-text]:block [&[data-state=open]>.show-text]:hidden hover:no-underline [&>svg]:ml-2">
                          <span className="show-text">Show answers</span>
                          <span className="hide-text">Hide answers</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <div className="mt-4 border rounded-md overflow-hidden bg-white shadow-sm">
                            <Table>
                              <TableBody>
                                {survey.answers &&
                                typeof survey.answers === "object" ? (
                                  Object.entries(survey.answers).map(
                                    ([key, value], idx) => (
                                      <TableRow
                                        key={idx}
                                        className="hover:bg-transparent"
                                      >
                                        <TableCell className="font-medium bg-muted/30 w-1/3 text-xs align-top border-r">
                                          {key}
                                        </TableCell>
                                        <TableCell className="text-xs whitespace-pre-wrap">
                                          {typeof value === "object" &&
                                          value !== null
                                            ? JSON.stringify(value, null, 2)
                                            : String(value)}
                                        </TableCell>
                                      </TableRow>
                                    ),
                                  )
                                ) : (
                                  <TableRow className="hover:bg-transparent">
                                    <TableCell className="text-xs text-muted-foreground p-4 text-center">
                                      No survey data available.
                                    </TableCell>
                                  </TableRow>
                                )}
                              </TableBody>
                            </Table>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
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
