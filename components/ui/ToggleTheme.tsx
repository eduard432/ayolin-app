'use client'

import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import {
  IconDeviceDesktopCog, 
  IconMoonStars,        
  IconSun               
} from '@tabler/icons-react'
import { cn } from '@/lib/utils'
import { useTheme } from 'next-themes'

const ToggleTheme = () => {
	const { theme, setTheme } = useTheme()

	return (
		<ToggleGroup
			className="border rounded-full text-xs space-x-2 bg-background text-foreground border-border"
			type="single"
			onValueChange={(value: string) => setTheme(value)}
		>
			<ToggleGroupItem
				className={cn('w-4 h-4 p-3', theme == 'system' && '')}
				value="system"
			>
				<IconDeviceDesktopCog />
			</ToggleGroupItem>
			<ToggleGroupItem
				className={cn('w-4 h-4 p-3', theme == 'light' && '')}
				value="light"
			>
				<IconMoonStars />
			</ToggleGroupItem>
			<ToggleGroupItem
				className={cn('w-4 h-4 p-3', theme == 'dark' && '')}
				value="dark"
			>
				<IconSun />
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

export default ToggleTheme
