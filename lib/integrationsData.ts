export const integrationsData: {
  [key: string]: {
    name: string,
    description: string,
    tag: string | null,
    action: string
  }[]
} = {
  analytics: [
    {
      name: "Plausible",
      description: "Privacy-focused web analytics",
      tag: null,
      action: "Add",
    },
    {
      name: "PostHog",
      description: "Product analytics you can self-host",
      tag: "Template",
      action: "More",
    },
  ],
  authentication: [
    {
      name: "Auth0",
      description: "Authentication and authorization as a service",
      tag: "Template",
      action: "More",
    },
    {
      name: "Clerk",
      description: "User management for modern web apps",
      tag: null,
      action: "Add",
    },
  ],
  cms: [
    {
      name: "Contentful",
      description: "Headless CMS for structured content",
      tag: "Template",
      action: "More",
    },
    {
      name: "Sanity",
      description: "Composable content platform",
      tag: null,
      action: "Add",
    },
  ],
  commerce: [
    {
      name: "BigCommerce",
      description: "Bring your business online with Vercel",
      tag: "Template",
      action: "More",
    },
    {
      name: "Saleor",
      description: "A fast, open and standards-based commerce API",
      tag: "Template",
      action: "More",
    },
    {
      name: "Salesforce Commerce Cloud",
      description: "A customer-centric commerce platform",
      tag: "Template",
      action: "More",
    },
    {
      name: "Shopify",
      description: "Headless, composable storefronts",
      tag: null,
      action: "More",
    },
    {
      name: "Sitecore OrderCloud",
      description: "API-first B2X commerce",
      tag: null,
      action: "Add",
    },
  ],
  devtools: [
    {
      name: "Sentry",
      description: "Error tracking and performance monitoring",
      tag: null,
      action: "Add",
    },
    {
      name: "LogRocket",
      description: "Session replay and frontend monitoring",
      tag: null,
      action: "Add",
    },
  ],
  experimentation: [
    {
      name: "Split.io",
      description: "Feature flags and A/B testing",
      tag: null,
      action: "Add",
    },
  ],
  flags: [
    {
      name: "LaunchDarkly",
      description: "Feature management platform",
      tag: "Template",
      action: "More",
    },
  ],
  logging: [
    {
      name: "Datadog Logs",
      description: "Log management and analysis",
      tag: null,
      action: "Add",
    },
  ],
  messagging: [
    {
      name: "Twilio",
      description: "Cloud communications platform",
      tag: null,
      action: "Add",
    },
  ],
  monitoring: [
    {
      name: "New Relic",
      description: "Application performance monitoring",
      tag: null,
      action: "Add",
    },
  ],
  observability: [
    {
      name: "Grafana",
      description: "Open-source analytics & monitoring solution",
      tag: null,
      action: "Add",
    },
  ],
  productivity: [
    {
      name: "Slack",
      description: "Team communication and alerts",
      tag: null,
      action: "Add",
    },
  ],
}
