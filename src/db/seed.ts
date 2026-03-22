import { faker } from "@faker-js/faker";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/node-postgres";
import { analysisItems, roasts } from "./schema";

config({ path: ".env.local" });

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error("DATABASE_URL is not set");
}

const db = drizzle(databaseUrl);

const severities = ["critical", "warning", "good"] as const;

const languages = [
  "javascript",
  "typescript",
  "python",
  "java",
  "go",
  "rust",
  "cpp",
  "csharp",
  "php",
  "ruby",
];

const roastTemplates = [
  {
    verdict: "needs_serious_help",
    scoreRange: [0, 2],
    quotes: [
      "This code looks like it was written during an earthquake.",
      "I've seen clearer messages in fortune cookies.",
      "Your variable naming convention is... creative.",
      "The person who wrote this should be tried in a court of law.",
      "I've seen better code in a kindergarten drawing.",
      "The bugs in this code have their own bugs.",
    ],
    critical: [
      "No input validation found",
      "SQL injection vulnerability exposed",
      "Memory leak in main loop",
      "Hardcoded credentials in source",
      "No error handling whatsoever",
      "Using eval() with user input",
      "Credentials committed to repository",
    ],
    warning: [
      "Functions exceed 200 lines",
      "Magic numbers scattered everywhere",
      "Deeply nested callbacks",
      "No TypeScript types used",
      "No unit tests",
      "Global variables everywhere",
    ],
  },
  {
    verdict: "rough_around_edges",
    scoreRange: [2.1, 4],
    quotes: [
      "Almost respectable. Almost.",
      "There's a future for this code. It's called refactoring.",
      "The comments lie. The code lies harder.",
      "Works on my machine, they said.",
      "This is why we can't have nice software.",
    ],
    critical: [
      "Missing null checks on API responses",
      "Unclosed database connections",
      "Race condition in async operations",
    ],
    warning: [
      "Inconsistent naming conventions",
      "Large functions need refactoring",
      "Missing unit tests",
      "No JSDoc comments",
      "Deep nesting detected",
    ],
  },
  {
    verdict: "decent_code",
    scoreRange: [4.1, 6],
    quotes: [
      "This code won't win awards, but it won't cause incidents either.",
      "It's fine. Nobody will compliment it, but nobody will complain.",
      "Mediocrity achieved. A rare accomplishment these days.",
      "The code equivalent of instant noodles.",
      "Perfectly average. Like a participation trophy.",
    ],
    critical: [],
    warning: [
      "Could use more abstraction",
      "Some magic strings should be constants",
      "Consider adding interface documentation",
      "Missing error boundaries",
    ],
  },
  {
    verdict: "solid_work",
    scoreRange: [6.1, 8],
    quotes: [
      "Look at you, writing actual quality code. Unexpected.",
      "This code has more discipline than most developers.",
      "Clean, readable, and maintainable. Who are you?",
      "I'm almost impressed. Almost.",
      "This is what happens when someone cares.",
    ],
    critical: [],
    warning: [
      "Could benefit from more edge case tests",
      "Some utility functions could be extracted",
    ],
  },
  {
    verdict: "exceptional",
    scoreRange: [8.1, 10],
    quotes: [
      "This code is so clean, it sparkles.",
      "Architectural masterpiece. Frame it.",
      "I couldn't roast this if I tried. Annoying.",
      "The documentation writes itself. Literally.",
      "This belongs in a design patterns textbook.",
    ],
    critical: [],
    warning: [],
  },
];

function getCodeSnippet(language: string): string {
  const snippets: Record<string, string[]> = {
    javascript: [
      `async function fetchUser(id) {
  const response = await fetch(\`/api/users/\${id}\`);
  return response.json();
}`,
      `const processData = (items) =>
  items
    .filter(x => x.active)
    .map(x => ({ ...x, processed: true }));`,
    ],
    typescript: [
      `interface User {
  id: string;
  name: string;
  email: string;
}

async function getUser(id: string): Promise<User | null> {
  const user = await db.users.findById(id);
  return user ?? null;
}`,
      `type Result<T, E = Error> = { ok: true; value: T } | { ok: false; error: E };

function divide(a: number, b: number): Result<number> {
  if (b === 0) return { ok: false, error: new Error("Division by zero") };
  return { ok: true, value: a / b };
}`,
    ],
    python: [
      `def calculate_total(items: list[dict]) -> float:
    return sum(item["price"] for item in items if item.get("active"))`,
      `class DataProcessor:
    def __init__(self, data: list):
        self.data = data
    
    def transform(self) -> list:
        return [x * 2 for x in self.data]
    
    def validate(self) -> bool:
        return all(isinstance(x, (int, float)) for x in self.data)`,
    ],
    go: [
      `func fetchUser(id string) (*User, error) {
    var user User
    err := db.QueryRow("SELECT * FROM users WHERE id = $1", id).Scan(&user)
    if err != nil {
        return nil, err
    }
    return &user, nil
}`,
    ],
    rust: [
      `fn process_data(items: Vec<Item>) -> Vec<ProcessedItem> {
    items
        .into_iter()
        .filter(|item| item.active)
        .map(|item| ProcessedItem {
            id: item.id,
            value: item.value * 2,
        })
        .collect()
}`,
    ],
  };

  const langSnippets = snippets[language] || snippets.javascript;
  return faker.helpers.arrayElement(langSnippets);
}

function getAnalysisItems(verdict: string, targetCount: number) {
  const template = roastTemplates.find((t) => t.verdict === verdict);
  if (!template) return [];

  const items: Array<{
    severity: (typeof severities)[number];
    title: string;
    description: string;
    order: number;
  }> = [];
  let order = 0;

  const criticalCount = faker.number.int({
    min: 0,
    max: Math.min(template.critical.length, 3),
  });
  for (const title of template.critical.slice(0, criticalCount)) {
    items.push({
      severity: "critical",
      title,
      description: faker.lorem.sentence(),
      order: order++,
    });
  }

  const warningCount = faker.number.int({
    min: 1,
    max: Math.min(template.warning.length + 2, 5),
  });
  for (const title of template.warning.slice(0, warningCount)) {
    items.push({
      severity: "warning",
      title,
      description: faker.lorem.sentence(),
      order: order++,
    });
  }

  const goodTitles = [
    "Clean variable naming",
    "Good error messages",
    "Proper indentation",
    "Consistent formatting",
    "Good use of constants",
    "Appropriate function size",
    "Clear function names",
  ];

  while (items.length < targetCount) {
    const goodTitle = faker.helpers.arrayElement(goodTitles);
    items.push({
      severity: "good",
      title: `${goodTitle} (line ${faker.number.int({ min: 1, max: 100 })})`,
      description: faker.lorem.sentence(),
      order: order++,
    });
  }

  return items;
}

async function seed() {
  console.log("Seeding database with 100 roasts...\n");

  const roastCount = 100;

  for (let i = 0; i < roastCount; i++) {
    const template = faker.helpers.arrayElement(roastTemplates);
    const score = faker.number.float({
      min: template.scoreRange[0],
      max: template.scoreRange[1],
      fractionDigits: 1,
    });
    const language = faker.helpers.arrayElement(languages);
    const roastQuote = faker.helpers.arrayElement(template.quotes);
    const lineCount = faker.number.int({ min: 3, max: 150 });
    const roastMode = faker.datatype.boolean(0.3);
    const suggestedFix = faker.datatype.boolean(0.6)
      ? `// Improved version:\n${getCodeSnippet(language)}`
      : null;
    const createdAt = faker.date.past({ years: 1 }).toISOString();
    const code = getCodeSnippet(language);

    const [roast] = await db
      .insert(roasts)
      .values({
        code,
        language,
        lineCount,
        roastMode,
        score,
        verdict: template.verdict as
          | "needs_serious_help"
          | "rough_around_edges"
          | "decent_code"
          | "solid_work"
          | "exceptional",
        roastQuote,
        suggestedFix,
        createdAt: new Date(createdAt),
      })
      .returning();

    const analysisCount = faker.number.int({ min: 3, max: 8 });
    const analysis = getAnalysisItems(template.verdict, analysisCount);

    if (analysis.length > 0) {
      await db.insert(analysisItems).values(
        analysis.map((item) => ({
          roastId: roast.id,
          ...item,
        })),
      );
    }

    if ((i + 1) % 10 === 0) {
      console.log(`  Inserted ${i + 1}/${roastCount} roasts...`);
    }
  }

  console.log(`\nSeed complete! ${roastCount} roasts created.`);
}

seed()
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
