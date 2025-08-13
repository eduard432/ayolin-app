'use client'

import { Calendar } from '@/components/ui/calendar'
import {
	Select,
	SelectTrigger,
	SelectValue,
	SelectContent,
	SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover'
import { Input } from '@/components/ui/input'
import { CalendarIcon, ClockIcon, Search } from 'lucide-react'
import { useState } from 'react'
import { format } from 'date-fns'
import { es } from 'date-fns/locale/es'
import { PayWithStripe } from './ui/StripeButton'

export function FiltrosUso() {
	const [date, setDate] = useState<Date | undefined>(new Date())

	return (
		<div className="w-full flex items-center justify-end gap-3 flex-wrap">
			{/* Rango de tiempo */}
			<Select>
				<SelectTrigger className="w-[200px] h-10 bg-background text-foreground">
					<ClockIcon className="mr-2 h-4 w-4" />
					<SelectValue
						placeholder="Últimos 30 días"
						className="text-foreground"
					/>
				</SelectTrigger>
				<SelectContent>
					<SelectItem value="7">Últimos 7 días</SelectItem>
					<SelectItem value="30">Últimos 30 días</SelectItem>
					<SelectItem value="90">Últimos 90 días</SelectItem>
				</SelectContent>
			</Select>

			{/* Calendario */}
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant="outline"
						className="w-[270px] h-10 justify-start text-left font-normal"
					>
						<CalendarIcon className="mr-2 h-4 w-4" />
						{date ? (
							format(date, 'PPPP', { locale: es })
						) : (
							<span>Seleccionar fecha</span>
						)}
					</Button>
				</PopoverTrigger>
				<PopoverContent className="w-auto p-0">
					<Calendar
						mode="single"
						selected={date}
						onSelect={setDate}
						initialFocus
					/>
				</PopoverContent>
			</Popover>

			{/* Input proyecto */}
			<div className="relative w-[220px] text-foreground bg-background rounded-lg">
				<Search className="absolute left-3 top-2.5 h-4 w-4 text-foreground bg-background" />
				<Input
					type="text"
					placeholder="Todos los proyectos"
					className="pl-9 h-10"
				/>
			</div>

			{/* Botón upgrade */}
			<PayWithStripe className="h-10 px-5 bg-neutral-300 text-black " />
		</div>
	)
}
