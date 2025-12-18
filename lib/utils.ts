import { Message } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import type { UIDataTypes, UIMessage, UIMessagePart, UITools } from "ai"
import { formatISO } from "date-fns"
import { z, type ZodObject, type ZodTypeAny } from "zod"

// Junta clases condicionadas y resuelve conflictos de Tailwind en un solo helper
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Normaliza mensajes de DB al formato de UI, asegurando roles válidos y fechas ISO
export function convertToUIMessages(messages: Message[]): UIMessage[] {
  return messages.map((message) => {
    const role = ["user", "assistant", "system"].includes(message.role)
      ? (message.role as "user" | "assistant" | "system")
      : "user"

    return {
      id: message.id,
      role,
      parts: message.parts as UIMessagePart<UIDataTypes, UITools>[],
      metadata: {
        createdAt: formatISO(message.createdAt),
      },
    }
  })
}

export const toSnakeCase = (text: string) =>
  text.replaceAll(" ", "_").toLowerCase()

export const toTitleCase = (text: string) =>
  text.replaceAll("_", " ")

// Estructura base de un campo dinámico que luego se usará para generar un schema
export const fieldSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(3),
  type: z.enum(["string", "number", "boolean"]),
  required: z.boolean(),
})

// Construye un schema de Zod a partir de la definición de campos y marca opcionales
export function fieldsToZod(
  fields: z.infer<typeof fieldSchema>[]
): ZodObject<Record<string, ZodTypeAny>> {
  const schemaFields: Record<string, z.ZodTypeAny> = {}

  for (const field of fields) {
    let base: z.ZodTypeAny

    switch (field.type) {
      case "string":
        base = z.string()
        break
      case "boolean":
        base = z.boolean()
        break
      case "number":
        base = z.coerce.number()
        break
      default:
        base = z.any()
        break
    }

    schemaFields[field.name] = field.required
      ? base
      : base.optional()
  }

  return z.object(schemaFields)
}

// Pequeño helper para pausar ejecución sin bloquear el event loop
export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms))
