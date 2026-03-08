
import { QUESTION_MAP } from "./survey-config";

export function formatSurveyAnswers(answers: Record<string, any>): { label: string; value: string }[] {
  const result: { label: string; value: string }[] = [];

  // Sort by the order in QUESTIONS if possible, but for now we iterate over QUESTION_MAP
  Object.keys(QUESTION_MAP).forEach((questionId) => {
    if (answers[questionId]) {
      const question = QUESTION_MAP[questionId];
      const answerId = answers[questionId];
      const answerLabel = question.options[answerId] || answerId;
      result.push({
        label: question.title,
        value: answerLabel,
      });
    }
  });

  // Always put notes at the end if they exist
  if (answers.notes) {
    result.push({
      label: "Notes",
      value: answers.notes,
    });
  }

  return result;
}

export function convertToCSV(data: any[], headers: string[]): string {
  if (data.length === 0) return "";

  const csvRows = [];
  csvRows.push(headers.join(","));

  for (const row of data) {
    const values = headers.map((header) => {
      const val = row[header];
      const escaped = ("" + val).replace(/"/g, '""');
      return `"${escaped}"`;
    });
    csvRows.push(values.join(","));
  }

  return csvRows.join("\n");
}

export function downloadCSV(csvContent: string, fileName: string) {
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
