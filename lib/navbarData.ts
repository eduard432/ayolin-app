export const dashboardFeatures = [
  { name: 'General', href: '/dashboard/general' },
  // { name: 'Uso', href: '/dashboard/uso' },
  // { name: 'Almacenamiento', href: '/dashboard/almacenamiento' },
  // { name: 'Soporte', href: '/dashboard/soporte' },
  { name: 'Configuración', href: '/dashboard/configuracion/cuenta' },
  // { name: 'Pro', href: '/dashboard/planes' },
  { name: 'Planes', href: '/dashboard/planes-temp'},
]

export const getChatbotFeatures = (chatbotId: string) => [
  { name: 'Editar', href: `/dashboard/${chatbotId}/editar` },
  { name: 'Estadísticas', href: `/dashboard/${chatbotId}/estadisticas` },
  // { name: 'Almacenamiento', href: `/dashboard/${chatbotId}/almacenamiento` },
  { name: 'Chats', href: `/dashboard/${chatbotId}/chats` },
  { name: 'Prueba', href: `/dashboard/${chatbotId}/prueba`},
  { name: 'Integraciones', href: `/dashboard/${chatbotId}/integraciones` },
  { name: 'Configuración', href: `/dashboard/${chatbotId}/settings` },
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
  chatbotId && `/dashboard/${chatbotId}/settings`,
].filter(Boolean)
