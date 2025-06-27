"use client"

import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { MonitorCog, MoonStar, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

const ToggleTheme = () => {

	const { theme, setTheme } = useTheme()

	return (
		<ToggleGroup
			className="border rounded-full text-xs mt-4 space-x-2"
			type="single"
			onValueChange={(value) => setTheme(value)}
		>
			<ToggleGroupItem className={cn('w-4 h-4 p-3 rounded-full', theme == "system" && "border ")} value="system">
				<MonitorCog />
			</ToggleGroupItem>
			<ToggleGroupItem className={cn('w-4 h-4 p-3 rounded-full', theme == "light" && "border ")} value="light">
				<Sun />
			</ToggleGroupItem>
			<ToggleGroupItem className={cn('w-4 h-4 p-3 rounded-full', theme == "dark" && "border ")} value="dark">
				<MoonStar />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

export default ToggleTheme
