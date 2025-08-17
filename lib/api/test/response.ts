class ApiResponse {
  static success(data = null, message = null, meta = null) {
    return NextResponse.json({
      success: true,
      data,
      ...(message && { message }),
      ...(meta && { meta })
    })
  }
  
  static created(data, message = 'Resource created successfully') {
    return NextResponse.json({
      success: true,
      data,
      message
    }, { status: 201 })
  }
  
  static updated(data, message = 'Resource updated successfully') {
    return NextResponse.json({
      success: true,
      data,
      message
    })
  }
  
  static deleted(message = 'Resource deleted successfully') {
    return NextResponse.json({
      success: true,
      message
    })
  }
  
  static paginated(data, pagination) {
    return NextResponse.json({
      success: true,
      data,
      pagination: {
        page: pagination.page,
        limit: pagination.limit,
        total: pagination.total,
        totalPages: Math.ceil(pagination.total / pagination.limit)
      }
    })
  }
}