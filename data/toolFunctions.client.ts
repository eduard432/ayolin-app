import { ToolFunction } from "@prisma/client"
import { useQuery } from "@tanstack/react-query"


export const getToolFunctions = async () => {
    const res = await fetch('/api/v1/tools')
    const data: { toolFunctions: ToolFunction[] } = await res.json()
    
    return data.toolFunctions
}

export const useToolFunctions = () => {
    return useQuery({
        queryKey: ['tools', 'allTools'],
        queryFn: () => getToolFunctions(),
        refetchOnWindowFocus: false
    })
}