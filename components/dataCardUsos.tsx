/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { ExternalLink } from 'lucide-react'

const data = [
  { name: 'May 26', value: 0 },
  { name: 'May 30', value: 50 },
  { name: 'Jun 3', value: 0 },
  { name: 'Jun 7', value: 0 },
  { name: 'Jun 11', value: 0 },
  { name: 'Jun 15', value: 0 },
  { name: 'Jun 19', value: 690 },
  { name: 'Jun 23', value: 280 },
]

export default function FastDataCard() {
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold mb-4">Networking</h2>

      <div className="mb-4 bg-slate-100 text-sm text-neutral-700 p-3 rounded-md border border-neutral-200">
        <span className="font-medium">Top paths</span> han sido movidos a <span className="font-semibold">Observabilidad</span> dentro de cada proyecto.
      </div>

      <Card className="p-6 bg-white border border-neutral-200 shadow-sm">
        {/* Título + botón */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
          <div>
            <h3 className="text-lg font-bold">Fast Data Transfer</h3>
            <p className="text-sm text-neutral-600">
              La transferencia de datos entre la red de Edge de tu sitio y los usuarios finales.{' '}
              <a href="#" className="text-blue-600 underline">Aprende más</a>
            </p>
          </div>
          <div className="mt-3 md:mt-0 flex gap-2">
            <Button variant="secondary" className="text-sm flex items-center gap-1">
              <ExternalLink className="w-4 h-4" />
              Abrir en Observabilidad
            </Button>
          </div>
        </div>

        {/* Indicador de uso */}
        <div className="flex items-center gap-2 mb-4 text-sm">
          <div className="w-4 h-4 rounded-full border-2 border-sky-500 animate-spin" />
          <span className="text-neutral-800">1.02 MB / 100 GB</span>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="direction" className="mb-4">
          <TabsList>
            <TabsTrigger value="direction">Dirección</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="regions">Regiones</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Gráfico */}
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <XAxis dataKey="name" stroke="#999" />
              <YAxis stroke="#999" />
              <Tooltip />
              <Bar dataKey="value" fill="#38bdf8" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}
