export const integrationsData: {
  [key: string]: {
    name: string,
    description: string,
    tag: string | null,
    action: string
  }[]
} = {
  analitica: [
    {
      name: "Plausible",
      description: "Analítica web enfocada en la privacidad",
      tag: null,
      action: "Agregar",
    },
    {
      name: "PostHog",
      description: "Analítica de producto que puedes auto-hospedar",
      tag: "Plantilla",
      action: "Más",
    },
  ],
  autenticacion: [
    {
      name: "Auth0",
      description: "Autenticación y autorización como servicio",
      tag: "Plantilla",
      action: "Más",
    },
    {
      name: "Clerk",
      description: "Gestión de usuarios para aplicaciones web modernas",
      tag: null,
      action: "Agregar",
    },
  ],
  cms: [
    {
      name: "Contentful",
      description: "CMS sin cabeza para contenido estructurado",
      tag: "Plantilla",
      action: "Más",
    },
    {
      name: "Sanity",
      description: "Plataforma de contenido componible",
      tag: null,
      action: "Agregar",
    },
  ],
  comercio: [
    {
      name: "BigCommerce",
      description: "Lleva tu negocio en línea con Vercel",
      tag: "Plantilla",
      action: "Más",
    },
    {
      name: "Saleor",
      description: "API de comercio rápida, abierta y basada en estándares",
      tag: "Plantilla",
      action: "Más",
    },
    {
      name: "Salesforce Commerce Cloud",
      description: "Plataforma de comercio centrada en el cliente",
      tag: "Plantilla",
      action: "Más",
    },
    {
      name: "Shopify",
      description: "Tiendas sin cabeza y componibles",
      tag: null,
      action: "Más",
    },
    {
      name: "Sitecore OrderCloud",
      description: "Comercio B2X con enfoque API-first",
      tag: null,
      action: "Agregar",
    },
  ],
  herramientas: [
    {
      name: "Sentry",
      description: "Seguimiento de errores y monitoreo de rendimiento",
      tag: null,
      action: "Agregar",
    },
    {
      name: "LogRocket",
      description: "Reproducción de sesiones y monitoreo del frontend",
      tag: null,
      action: "Agregar",
    },
  ],
  experimentacion: [
    {
      name: "Split.io",
      description: "Feature flags y pruebas A/B",
      tag: null,
      action: "Agregar",
    },
  ],
  funciones: [
    {
      name: "LaunchDarkly",
      description: "Plataforma de gestión de funcionalidades",
      tag: "Plantilla",
      action: "Más",
    },
  ],
  registros: [
    {
      name: "Datadog Logs",
      description: "Gestión y análisis de registros",
      tag: null,
      action: "Agregar",
    },
  ],
  mensajeria: [
    {
      name: "Twilio",
      description: "Plataforma de comunicaciones en la nube",
      tag: null,
      action: "Agregar",
    },
  ],
  monitoreo: [
    {
      name: "New Relic",
      description: "Monitoreo del rendimiento de aplicaciones",
      tag: null,
      action: "Agregar",
    },
  ],
  observabilidad: [
    {
      name: "Grafana",
      description: "Solución de analítica y monitoreo de código abierto",
      tag: null,
      action: "Agregar",
    },
  ],
  productividad: [
    {
      name: "Slack",
      description: "Comunicación en equipo y alertas",
      tag: null,
      action: "Agregar",
    },
  ],
}
