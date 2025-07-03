
export const dashboardFeatures = [
  { name: 'General', href: '/dashboard/general' },
  { name: 'Uso', href: '/dashboard/uso' },
  { name: 'Almacenamiento', href: '/dashboard/almacenamiento' },
  { name: 'Soporte', href: '/dashboard/soporte' },
  { name: 'Configuración', href: '/dashboard/configuracion' },
  { name: 'Pro', href: '/dashboard/planes' },
]

export const getChatbotFeatures = (chatbotId: string) => [
  { name: 'Estadísticas', href: `/dashboard/${chatbotId}/estadisticas` },
  { name: 'Almacenamiento', href: `/dashboard/${chatbotId}/almacenamiento` },
  { name: 'Chats', href: `/dashboard/${chatbotId}/chats` },
  { name: 'Prueba', href: `/dashboard/${chatbotId}/prueba`},
  { name: 'Integraciones', href: `/dashboard/${chatbotId}/integraciones` },
  { name: 'Configuración', href: `/dashboard/${chatbotId}/settings` },
]
