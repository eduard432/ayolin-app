
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const files = [
  { name: "Reporte2025.pdf", type: "PDF", size: "1.2 MB", date: "2025-06-20" },
  { name: "Factura_Junio.pdf", type: "PDF", size: "800 KB", date: "2025-06-18" },
  { name: "Manual_Usuario.pdf", type: "PDF", size: "3.5 MB", date: "2025-06-15" },
  { name: "Contrato_Legal.pdf", type: "PDF", size: "2.1 MB", date: "2025-06-12" },
  { name: "Resumen_Proyecto.pdf", type: "PDF", size: "1.8 MB", date: "2025-06-10" },
]

const chats = [
  { name: "ChatUno", type: "OpenIA", size: "1.2 GB", date: "2025-06-20" },
  { name: "ChatDos", type: "OpenIA", size: "800 MB", date: "2025-06-18" },
  { name: "ChatTres", type: "Gemini", size: "3.5 GB", date: "2025-06-15" },
]

export default function StoragePage() {
  return (
    <div className="min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-white">Almacenamiento</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl ">Tus Archivos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-black">Nombre</TableHead>
                <TableHead className="font-black">Tipo</TableHead>
                <TableHead className="font-black">Tamaño</TableHead>
                <TableHead className="font-black">Última modificación</TableHead>
                <TableHead className="text-right font-black">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {files.map((file, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="secondary" size="sm">Ver</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="shadow-lg mt-8">
        <CardHeader>
          <CardTitle className="text-2xl">Tus Chats</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-black">Nombre</TableHead>
                <TableHead className="font-black">Tipo</TableHead>
                <TableHead className="font-black">Tamaño</TableHead>
                <TableHead className="font-black">Última modificación</TableHead>
                <TableHead className="text-right font-black">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {chats.map((file, idx) => (
                <TableRow key={idx}>
                  <TableCell className="font-medium">{file.name}</TableCell>
                  <TableCell>{file.type}</TableCell>
                  <TableCell>{file.size}</TableCell>
                  <TableCell>{file.date}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="secondary" size="sm">Ver</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

    </div>
  )
}
