import { Tool } from 'ai'
import { z } from 'zod'

export interface APIResponse {
	data: Data
	ok: boolean
}

export interface Data {
	word: string
	meanings: Meaning[]
}

export interface Meaning {
	origin: Origin
	senses: Sense[]
}

export interface Origin {
	raw: string
	type: string
	voice: string
	text: string
}

export interface Sense {
	raw: string
	meaning_number: number
	category: string
	usage: string
	description: string
	synonyms: string[] | null
	antonyms: null
}

export const dicc_rae_tool: Tool = {
	description: 'Obten la definición de la rae de una palabra',
	inputSchema: z.object({
		palabra: z.string().describe('Palabra a buscar'),
	}),
	execute: async ({ palabra }: { palabra: string }) => {
		const result = await fetch(`https://rae-api.com/api/words/${palabra}`)
		const { data }: APIResponse = await result.json()
		return {
			origin: data.meanings[0].origin.raw,
			meanings: data.meanings[0].senses.slice(0, 3).map((sense) => sense.raw),
		}
	},
}
