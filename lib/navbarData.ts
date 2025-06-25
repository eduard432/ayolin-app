
export const dashboardFeatures = [
  { name: 'Panorama', href: '/dashboard/overview' },
  { name: 'Integraciones', href: '/dashboard/integraciones' },
  { name: 'Uso', href: '/dashboard/uso' },
  { name: 'Almacenamiento', href: '/dashboard/almacenamiento' },
  { name: 'Soporte', href: '/dashboard/soporte' },
  { name: 'Configuración', href: '/dashboard/settings' },
]

export const getChatbotFeatures = (chatbotId: string) => [
  { name: 'Estadísticas', href: `/dashboard/${chatbotId}/estadisticas` },
  { name: 'Almacenamiento', href: `/dashboard/${chatbotId}/almacenamiento` },
  { name: 'Chats', href: `/dashboard/${chatbotId}/chats` },
  { name: 'Integraciones', href: `/dashboard/${chatbotId}/integraciones` },
  { name: 'Configuración', href: `/dashboard/${chatbotId}/configuracion` },
]
