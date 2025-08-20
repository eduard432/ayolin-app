'use client'

import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { MonitorCog, MoonStar, Sun } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

const ToggleTheme = () => {
	const { theme, setTheme } = useTheme()

	return (
		<ToggleGroup
			className="border rounded-full text-xs space-x-2 bg-background text-foreground border-border"
			type="single"
			onValueChange={(value) => setTheme(value)}
		>
			<ToggleGroupItem
				className={cn('w-4 h-4 p-3', theme == 'system' && '')}
				value="system"
			>
				<MonitorCog />
			</ToggleGroupItem>
			<ToggleGroupItem
				className={cn('w-4 h-4 p-3', theme == 'light' && '')}
				value="light"
			>
				<Sun />
			</ToggleGroupItem>
			<ToggleGroupItem
				className={cn('w-4 h-4 p-3', theme == 'dark' && '')}
				value="dark"
			>
				<MoonStar />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

export default ToggleTheme
