export const modelPrices = {
  "gpt-4.1-2025-04-14": { name: "gpt-4.1", input: 20.00, output: 80.00 },
  "gpt-4.1-mini-2025-04-14": { name: "gpt-4.1-mini", input: 4.00, output: 16.00 },
  "gpt-4.1-nano-2025-04-14": { name: "gpt-4.1-nano", input: 1.00, output: 4.00 },
  "gpt-4.5-preview-2025-02-27": { name: "gpt-4.5-preview", input: 750.00, output: 1500.00 },
  "gpt-4o-2024-08-06": { name: "gpt-4o", input: 25.00, output: 100.00 },
  "gpt-4o-audio-preview-2024-12-17": { name: "gpt-4o-audio-preview", input: 25.00, output: 100.00 },
  "gpt-4o-realtime-preview-2025-06-03": { name: "gpt-4o-realtime-preview", input: 50.00, output: 200.00 },
  "gpt-4o-mini-2024-07-18": { name: "gpt-4o-mini", input: 1.50, output: 6.00 },
  "gpt-4o-mini-audio-preview-2024-12-17": { name: "gpt-4o-mini-audio-preview", input: 1.50, output: 6.00 },
  "gpt-4o-mini-realtime-preview-2024-12-17": { name: "gpt-4o-mini-realtime-preview", input: 6.00, output: 24.00 },
  "o1-2024-12-17": { name: "o1", input: 150.00, output: 600.00 },
  "o1-pro-2025-03-19": { name: "o1-pro", input: 1500.00, output: 6000.00 },
  "o3-pro-2025-06-10": { name: "o3-pro", input: 200.00, output: 800.00 },
  "o3-2025-04-16": { name: "o3", input: 20.00, output: 80.00 },
  "o3-deep-research-2025-06-26": { name: "o3-deep-research", input: 100.00, output: 400.00 },
  "o4-mini-2025-04-16": { name: "o4-mini", input: 11.00, output: 44.00 },
  "o4-mini-deep-research-2025-06-26": { name: "o4-mini-deep-research", input: 20.00, output: 80.00 },
  "o3-mini-2025-01-31": { name: "o3-mini", input: 11.00, output: 44.00 },
  "o1-mini-2024-09-12": { name: "o1-mini", input: 11.00, output: 44.00 },
  "codex-mini-latest": { name: "codex-mini-latest", input: 15.00, output: 60.00 },
  "gpt-4o-mini-search-preview-2025-03-11": { name: "gpt-4o-mini-search-preview", input: 1.50, output: 6.00 },
  "gpt-4o-search-preview-2025-03-11": { name: "gpt-4o-search-preview", input: 25.00, output: 100.00 },
  "computer-use-preview-2025-03-11": { name: "computer-use-preview", input: 30.00, output: 120.00 }
} as const;

export type ModelId = keyof typeof modelPrices;