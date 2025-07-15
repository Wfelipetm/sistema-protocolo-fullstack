import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { HeaderWrapper } from "@/components/header-wrapper"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Sistema de Gestão - Prefeitura de Itaguaí",
  description: "Sistema de controle de documentos e processos administrativos",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body className={inter.className}>
        <HeaderWrapper />
        <main className="min-h-screen bg-gray-50">{children}</main>
      </body>
    </html>
  )
}
