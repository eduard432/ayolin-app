class ApiError extends Error {
  constructor(message, statusCode = 500, code = null) {
    super(message)
    
    // Establecer el nombre de la clase
    this.name = this.constructor.name
    
    // Propiedades personalizadas para APIs
    this.statusCode = statusCode
    this.code = code
    this.timestamp = new Date().toISOString()
    
    // Mantener stack trace limpio (solo en V8/Node.js)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
  
  // Método helper para convertir a objeto plano
  toJSON() {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      code: this.code,
      timestamp: this.timestamp,
      ...(this.errors && { errors: this.errors })
    }
  }
}

class AuthenticationError extends ApiError {
  constructor(message = 'Not authenticated') {
    super(message, 401, 'AUTH_REQUIRED')
  }
}

class ValidationError extends ApiError {
  constructor(message = 'Validation failed', errors = []) {
    super(message, 400, 'VALIDATION_FAILED')
    this.errors = errors
  }
}

class NotFoundError extends ApiError {
  constructor(message = 'Resource not found') {
    super(message, 404, 'NOT_FOUND')
  }
}

// Nueva clase específica para errores de Zod
class ZodValidationError extends ValidationError {
  constructor(zodError, source = null) {
    const message = source 
      ? `Validation failed in ${source}`
      : 'Validation failed'
    
    // Transformar errores de Zod a formato más friendly
    const errors = zodError.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message,
      code: issue.code,
      ...(source && { source })
    }))
    
    super(message, errors)
    this.zodError = zodError
    this.source = source
  }
}

// 2. Manejador de errores centralizado con soporte para Zod
class ApiErrorHandler {
  static handle(error) {
    // Log del error para debugging
    console.error('API Error:', error)
    
    // Manejo específico para errores de Zod
    if (error instanceof ZodError) {
      return ApiErrorHandler.handleZodError(error)
    }
    
    if (error instanceof ZodValidationError) {
      return NextResponse.json(
        { 
          success: false,
          message: error.message,
          code: error.code,
          errors: error.errors,
          ...(error.source && { source: error.source })
        },
        { status: error.statusCode }
      )
    }
    
    if (error instanceof ApiError) {
      return NextResponse.json(
        { 
          success: false,
          message: error.message,
          code: error.code,
          ...(error.errors && { errors: error.errors })
        },
        { status: error.statusCode }
      )
    }
    
    // Error no controlado
    return NextResponse.json(
      { 
        success: false,
        message: 'Internal server error',
        code: 'INTERNAL_ERROR'
      },
      { status: 500 }
    )
  }
  
  // Manejo específico para errores de Zod sin wrapper
  static handleZodError(zodError, source = null) {
    const errors = zodError.issues.map(issue => ({
      field: issue.path.join('.'),
      message: issue.message,
      code: issue.code,
      ...(source && { source })
    }))
    
    return NextResponse.json(
      { 
        success: false,
        message: source ? `Validation failed in ${source}` : 'Validation failed',
        code: 'VALIDATION_FAILED',
        errors,
        ...(source && { source })
      },
      { status: 400 }
    )
  }
  
  // Método para wrapping de rutas
  static withErrorHandling(handler) {
    return async (request, context) => {
      try {
        return await handler(request, context)
      } catch (error) {
        return ApiErrorHandler.handle(error)
      }
    }
  }
  
  // Alias más corto para usar en las rutas
  static wrap = ApiErrorHandler.withErrorHandling
}