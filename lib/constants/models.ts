export const modelPrices = [
  { name: "gpt-4.1", id: "gpt-4.1-2025-04-14", input: 2.00, output: 8.00 },
  { name: "gpt-4.1-mini", id: "gpt-4.1-mini-2025-04-14", input: 0.40, output: 1.60 },
  { name: "gpt-4.1-nano", id: "gpt-4.1-nano-2025-04-14", input: 0.10, output: 0.40 },
  { name: "gpt-4.5-preview", id: "gpt-4.5-preview-2025-02-27", input: 75.00, output: 150.00 },
  { name: "gpt-4o", id: "gpt-4o-2024-08-06", input: 2.50, output: 10.00 },
  { name: "gpt-4o-audio-preview", id: "gpt-4o-audio-preview-2024-12-17", input: 2.50, output: 10.00 },
  { name: "gpt-4o-realtime-preview", id: "gpt-4o-realtime-preview-2025-06-03", input: 5.00, output: 20.00 },
  { name: "gpt-4o-mini", id: "gpt-4o-mini-2024-07-18", input: 0.15, output: 0.60 },
  { name: "gpt-4o-mini-audio-preview", id: "gpt-4o-mini-audio-preview-2024-12-17", input: 0.15, output: 0.60 },
  { name: "gpt-4o-mini-realtime-preview", id: "gpt-4o-mini-realtime-preview-2024-12-17", input: 0.60, output: 2.40 },
  { name: "o1", id: "o1-2024-12-17", input: 15.00, output: 60.00 },
  { name: "o1-pro", id: "o1-pro-2025-03-19", input: 150.00, output: 600.00 },
  { name: "o3-pro", id: "o3-pro-2025-06-10", input: 20.00, output: 80.00 },
  { name: "o3", id: "o3-2025-04-16", input: 2.00, output: 8.00 },
  { name: "o3-deep-research", id: "o3-deep-research-2025-06-26", input: 10.00, output: 40.00 },
  { name: "o4-mini", id: "o4-mini-2025-04-16", input: 1.10, output: 4.40 },
  { name: "o4-mini-deep-research", id: "o4-mini-deep-research-2025-06-26", input: 2.00, output: 8.00 },
  { name: "o3-mini", id: "o3-mini-2025-01-31", input: 1.10, output: 4.40 },
  { name: "o1-mini", id: "o1-mini-2024-09-12", input: 1.10, output: 4.40 },
  { name: "codex-mini-latest", id: "codex-mini-latest", input: 1.50, output: 6.00 },
  { name: "gpt-4o-mini-search-preview", id: "gpt-4o-mini-search-preview-2025-03-11", input: 0.15, output: 0.60 },
  { name: "gpt-4o-search-preview", id: "gpt-4o-search-preview-2025-03-11", input: 2.50, output: 10.00 },
  { name: "computer-use-preview", id: "computer-use-preview-2025-03-11", input: 3.00, output: 12.00 }
] as const;

export type Model = typeof modelPrices[number];
export type ModelName = typeof modelPrices[number]["name"];