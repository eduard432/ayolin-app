"use client"

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React, { useState } from 'react'

const QueryProvider = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	const [client] = useState(() => new QueryClient())
	return <QueryClientProvider client={client}>{children}</QueryClientProvider>
}

export default QueryProvider
