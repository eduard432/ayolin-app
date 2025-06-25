import { cn } from '@/lib/utils'
import React from 'react'
import { Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

interface SearchBarProps {
	className?: string
	placeholder?: string
	value?: string
	onChange?: React.ChangeEventHandler<HTMLInputElement>
}

export const SearchBar = ({ className, placeholder = "Search", value, onChange }: SearchBarProps) => {
	return (
		<div className={cn('w-full relative flex items-center', className)}>
			<Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
			<Input type="text" placeholder={placeholder} value={value} onChange={onChange} className="pl-12 h-full" />
		</div>
	)
}
