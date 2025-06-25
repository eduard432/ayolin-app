
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const files = [
  { name: "Reporte2025.pdf", type: "PDF", size: "1.2 MB", date: "2025-06-20" },
  { name: "imagen_producto.png", type: "Imagen", size: "800 KB", date: "2025-06-18" },
  { name: "presentación.key", type: "Keynote", size: "3.5 MB", date: "2025-06-15" },
]

export default function StoragePage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-6 text-neutral-800 dark:text-white">Almacenamiento</h1>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg">Tus Archivos</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>Tipo</TableHead>
                <TableHead>Tamaño</TableHead>
                <TableHead>Última modificación</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
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
    </div>
  )
}
