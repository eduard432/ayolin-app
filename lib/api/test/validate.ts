type Source = 'body' | 'query' | 'params'

// Funciones de validación con Zod (tus funciones originales)
function validate<T extends ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw result.error
  }
  return result.data
}

function validateWithSource<T extends ZodTypeAny>(
  schema: T, 
  data: unknown, 
  source: Source
): z.infer<T> {
  const result = schema.safeParse(data)
  if (!result.success) {
    throw new ZodValidationError(result.error, source)
  }
  return result.data
}

class ApiValidator {
  static requireAuth(request) {
    if (!request.auth) {
      throw new AuthenticationError()
    }
    return request.auth
  }
  
  static requireRole(request, roles = []) {
    const auth = ApiValidator.requireAuth(request)
    
    if (!roles.includes(auth.role)) {
      throw new AuthenticationError('Insufficient permissions')
    }
    
    return auth
  }
  
  // Integración con Zod - métodos principales
  static validateBody<T extends ZodTypeAny>(request: Request, schema: T): Promise<z.infer<T>> {
    return request.json().then(body => validateWithSource(schema, body, 'body'))
  }
  
  static validateQuery<T extends ZodTypeAny>(request: Request, schema: T): z.infer<T> {
    const { searchParams } = new URL(request.url)
    const query = Object.fromEntries(searchParams.entries())
    return validateWithSource(schema, query, 'query')
  }
  
  static validateParams<T extends ZodTypeAny>(params: any, schema: T): z.infer<T> {
    return validateWithSource(schema, params, 'params')
  }
  
  // Método genérico para cualquier validación Zod
  static validate<T extends ZodTypeAny>(schema: T, data: unknown): z.infer<T> {
    return validate(schema, data)
  }
  
  static validateWithSource<T extends ZodTypeAny>(
    schema: T, 
    data: unknown, 
    source: Source
  ): z.infer<T> {
    return validateWithSource(schema, data, source)
  }
  
  // Helpers específicos para casos comunes
  static validatePagination(request: Request) {
    const paginationSchema = z.object({
      page: z.string().transform(val => parseInt(val) || 1),
      limit: z.string().transform(val => Math.min(parseInt(val) || 10, 100)), // máximo 100
      sort: z.string().optional(),
      order: z.enum(['asc', 'desc']).default('desc')
    })
    
    return ApiValidator.validateQuery(request, paginationSchema)
  }
  
  static validateId(id: string | undefined) {
    const idSchema = z.string().uuid('Invalid ID format')
    if (!id) {
      throw new ValidationError('ID is required')
    }
    return validate(idSchema, id)
  }
}