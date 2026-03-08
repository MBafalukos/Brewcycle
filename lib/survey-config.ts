
export type Option = { id: string; label: string };
export type Question = {
  id: string;
  title: string;
  description?: string;
  options: Option[];
};

export const QUESTIONS: Question[] = [
  {
    id: "interest_reason",
    title: "Was interessiert dich an Brewcycle am meisten?",
    options: [
      { id: "sustainability", label: "Nachhaltigkeit & Kreislaufwirtschaft" },
      { id: "vegan", label: "Rein pflanzliche / vegane Inhaltsstoffe" },
      { id: "local_austria", label: "Regionale Herkunft aus Österreich" },
      { id: "innovation", label: "Innovatives Konzept" },
      { id: "other", label: "Sonstiges" },
    ],
  },
  {
    id: "primary_use_area",
    title: "Für welchen Bereich suchst du primär einen Dünger?",
    options: [
      { id: "indoor_balcony", label: "Balkon- und Zimmerpflanzen" },
      { id: "vegetables_raised_bed", label: "Gemüsebeet und Hochbeet" },
      { id: "lawn_ornamental", label: "Rasen und Ziergarten" },
      { id: "agriculture", label: "Landwirtschaftliche Flächen" },
      { id: "other", label: "Sonstiges" },
    ],
  },
  {
    id: "typical_purchase_channel",
    title: "Wo kaufst du Gartenprodukte üblicherweise ein?",
    options: [
      { id: "online_shop", label: "Bequem im Online-Shop" },
      { id: "diy_store", label: "Im Baumarkt (z.B. OBI, Hornbach)" },
      {
        id: "garden_center",
        label: "Im Gartencenter (z.B. Bellaflora, Dehner, Starkl)",
      },
      { id: "local_specialist", label: "Im lokalen Fachhandel" },
      { id: "other", label: "Sonstiges" },
    ],
  },
  {
    id: "age_group",
    title: "Wie alt bist du?",
    options: [
      { id: "under_25", label: "Unter 25" },
      { id: "25_35", label: "25 – 35" },
      { id: "36_45", label: "36 – 45" },
      { id: "46_55", label: "46 – 55" },
      { id: "56_65", label: "56 – 65" },
      { id: "65_plus", label: "65+" },
    ],
  },
];

export const QUESTION_MAP = QUESTIONS.reduce((acc, q) => {
  acc[q.id] = {
    title: q.title,
    options: q.options.reduce((oAcc, opt) => {
      oAcc[opt.id] = opt.label;
      return oAcc;
    }, {} as Record<string, string>),
  };
  return acc;
}, {} as Record<string, { title: string; options: Record<string, string> }>);
