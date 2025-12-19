export const dashboardFeatures = [
  { name: 'General', href: '/dashboard/general' },
  { name: 'Configuración', href: '/dashboard/configuracion/cuenta' },
  { name: 'Planes', href: '/dashboard/planes-temp'}, // Ruta temporal
]

export const getChatbotFeatures = (chatbotId: string) => [
  { name: 'Estadísticas', href: `/dashboard/${chatbotId}/estadisticas` },
  { name: 'Chats', href: `/dashboard/${chatbotId}/chats` },
  { name: 'Prueba', href: `/dashboard/${chatbotId}/prueba`},
  { name: 'Integraciones', href: `/dashboard/${chatbotId}/integraciones` },
  { name: 'Editar', href: `/dashboard/${chatbotId}/editar` },
  { name: 'Contenido', href: `/dashboard/${chatbotId}/contenido` },
]

export const getAllowedNavbarRoutes = (chatbotId?: string) => [
  '/dashboard/general',
  '/dashboard/uso',
  '/dashboard/almacenamiento',
  '/dashboard/soporte',
  '/dashboard/configuracion/cuenta',
  '/dashboard/configuracion/pagos',
  '/dashboard/planes',
  '/dashboard/planes-temp',
  chatbotId && `/dashboard/${chatbotId}/editar`,
  chatbotId && `/dashboard/${chatbotId}/estadisticas`,
  chatbotId && `/dashboard/${chatbotId}/almacenamiento`,
  chatbotId && `/dashboard/${chatbotId}/chats`,
  chatbotId && `/dashboard/${chatbotId}/prueba`,
  chatbotId && `/dashboard/${chatbotId}/integraciones`,
  chatbotId && `/dashboard/${chatbotId}/contenido`,
].filter(Boolean)
