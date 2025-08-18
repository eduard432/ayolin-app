import { NextResponse } from 'next/server'
export class ApiResponse {
	static success(data: unknown, message = null, meta = null) {
		return NextResponse.json({
			success: true,
			data,
			message,
			meta,
		})
	}

	static created(data: unknown, message = 'Resource created successfully') {
		return NextResponse.json(
			{
				success: true,
				data,
				message,
			},
			{ status: 201 }
		)
	}

	static updated(data: unknown, message = 'Resource updated successfully') {
		return NextResponse.json({
			success: true,
			data,
			message,
		})
	}

	static deleted(message = 'Resource deleted successfully') {
		return NextResponse.json({
			success: true,
			message,
		})
	}
}
