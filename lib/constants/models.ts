export const modelPrices = {
  "gpt-5": { name: "gpt-5", input: 1.25, cachedInput: 0.125, output: 10.00 },
  "gpt-5-mini": { name: "gpt-5-mini", input: 0.25, cachedInput: 0.025, output: 2.00 },
  "gpt-5-nano": { name: "gpt-5-nano", input: 0.05, cachedInput: 0.005, output: 0.40 },
  "gpt-5-chat-latest": { name: "gpt-5-chat-latest", input: 1.25, cachedInput: 0.125, output: 10.00 },
  "gpt-4.1": { name: "gpt-4.1", input: 2.00, cachedInput: 0.50, output: 8.00 },
  "gpt-4.1-mini": { name: "gpt-4.1-mini", input: 0.40, cachedInput: 0.10, output: 1.60 },
  "gpt-4.1-nano": { name: "gpt-4.1-nano", input: 0.10, cachedInput: 0.025, output: 0.40 },
  "gpt-4o": { name: "gpt-4o", input: 2.50, cachedInput: 1.25, output: 10.00 },
  "gpt-4o-2024-05-13": { name: "gpt-4o-2024-05-13", input: 5.00, output: 15.00 },
  "gpt-4o-audio-preview": { name: "gpt-4o-audio-preview", input: 2.50, output: 10.00 },
  "gpt-4o-realtime-preview": { name: "gpt-4o-realtime-preview", input: 5.00, cachedInput: 2.50, output: 20.00 },
  "gpt-4o-mini": { name: "gpt-4o-mini", input: 0.15, cachedInput: 0.075, output: 0.60 },
  "gpt-4o-mini-audio-preview": { name: "gpt-4o-mini-audio-preview", input: 0.15, output: 0.60 },
  "gpt-4o-mini-realtime-preview": { name: "gpt-4o-mini-realtime-preview", input: 0.60, cachedInput: 0.30, output: 2.40 },
  "o1": { name: "o1", input: 15.00, cachedInput: 7.50, output: 60.00 },
  "o1-pro": { name: "o1-pro", input: 150.00, output: 600.00 },
  "o3-pro": { name: "o3-pro", input: 20.00, output: 80.00 },
  "o3": { name: "o3", input: 2.00, cachedInput: 0.50, output: 8.00 },
  "o3-deep-research": { name: "o3-deep-research", input: 10.00, cachedInput: 2.50, output: 40.00 },
  "o4-mini": { name: "o4-mini", input: 1.10, cachedInput: 0.275, output: 4.40 }
} as const;

export type ModelId = keyof typeof modelPrices;
