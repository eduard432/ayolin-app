import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Toaster } from '@/components/ui/sonner'
import { Analytics } from '@vercel/analytics/next'
import { ThemeProvider } from '@/components/provider/ThemeProvider'
import Providers from './providers'
import { auth } from '@/lib/auth'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Ayolin App',
  description: 'Crea tu propio chatbot',
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {

	const session = await auth()
	const providerKey = session?.user?.id ?? 'guest'

  return (
    <html lang="es-mx">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased bg-black`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers key={providerKey} session={session}>
            <Toaster />
            {children}
            <Analytics />
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  )
}
