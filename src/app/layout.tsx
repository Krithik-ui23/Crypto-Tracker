import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"
import Providers from "@/components/Providers"

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Crypto Tracker",
  description: "Track crypto prices, portfolios and watchlists in real time",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geist.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}