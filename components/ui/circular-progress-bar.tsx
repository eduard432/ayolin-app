'use client'

import { useEffect, useState } from 'react'

interface CircularProgressBarProps {
	value: number
	max?: number
	min?: number
	className?: string
	primaryColor?: string
	secondaryColor?: string
	showValue?: boolean
}

export function CircularProgressBar({
	value,
	max = 100,
	min = 0,
	className,
	primaryColor = '#2563eb', // Tailwind blue-600
	secondaryColor = '#e5e7eb', // Tailwind gray-200
	showValue = false,
}: CircularProgressBarProps) {
	const radius = 45
	const circumference = 2 * Math.PI * radius

	const [roundedOffset, setRoundedOffset] = useState(0)
	const [roundedCircumference, setRoundedCircumference] = useState(0)
	const [percentage, setPercentage] = useState(0)

	useEffect(() => {
		const clamped = Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100))
		const offset = circumference - (clamped / 100) * circumference
		setPercentage(clamped)
		setRoundedCircumference(Number(circumference.toFixed(2)))
		setRoundedOffset(Number(offset.toFixed(2)))
	}, [value, min, max, circumference])

	return (
		<div className={`relative size-40 ${className ?? ''}`}>
			<svg className="size-full" viewBox="0 0 100 100">
				<circle
					className="text-gray-200"
					cx="50"
					cy="50"
					r={radius}
					stroke={secondaryColor}
					strokeWidth="12"
					fill="none"
				/>
				<circle
					className="text-blue-600"
					cx="50"
					cy="50"
					r={radius}
					stroke={primaryColor}
					strokeWidth="12"
					fill="none"
					strokeDasharray={roundedCircumference}
					strokeDashoffset={roundedOffset}
					transform="rotate(-90 50 50)"
				/>
			</svg>
			{showValue && (
				<div className="absolute inset-0 flex items-center justify-center text-2xl font-semibold">
					{Math.round(percentage)}%
				</div>
			)}
		</div>
	)
}
