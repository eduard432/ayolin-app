import {Tool} from 'ai'
import { dicc_rae_tool } from './dic_rae'

export const AI_TOOL_INDEX: Record<string, Tool > = {
    dic_rae: dicc_rae_tool
}