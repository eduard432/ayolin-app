import { User } from '@prisma/client'
import { useQuery } from '@tanstack/react-query'

export const getUser = async (userId: string) => {
	const res = await fetch(`/api/v1/user/${userId}`)
	const data: { user: User } = await res.json()

	return data.user
}

export const useGetUser = (userId: string) => {
	return useQuery({
		queryKey: ['user', userId],
		queryFn: () => getUser(userId),
		enabled: !!userId,
		refetchOnWindowFocus: false,
	})
}
