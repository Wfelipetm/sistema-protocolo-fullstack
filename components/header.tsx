"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export function Header() {
  const pathname = usePathname()

  const getActiveTab = () => {
    if (pathname.startsWith("/pessoas-funcionarios")) return "pessoas"
    if (pathname.startsWith("/controle-documentos")) return "controle"
    if (pathname.startsWith("/pagamentos")) return "pagamentos"
    return "pessoas"
  }

  const activeTab = getActiveTab()

  return (
    <header className="bg-gray-200 border-b border-gray-300">
      {/* Top header */}
      <div className="px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left side - Logo and Secretaria */}
          <div className="flex items-center space-x-6">
            {/* Logo Itaguaí */}
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">I</span>
              </div>
              <div className="text-blue-800">
                <div className="text-sm font-medium">Prefeitura de</div>
                <div className="text-xl font-bold">Itaguaí</div>
              </div>
            </div>

            {/* Divider */}
            <div className="h-10 w-px bg-gray-400"></div>

            {/* Secretaria text */}
            <div className="text-sm text-gray-700 leading-tight">
              <div>Secretaria de</div>
              <div>Ciência, Tecnologia</div>
              <div>Inovação e Comunicação</div>
            </div>
          </div>

          {/* Right side - Matues */}
          <div className="flex items-center space-x-3">
            <span className="text-xl font-bold text-blue-800">Matues</span>
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-lg">M</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation tabs */}
      <div className="bg-blue-600">
        <div className="flex">
          <Link
            href="/pessoas-funcionarios"
            className={`flex-1 text-center py-4 px-6 text-white font-semibold transition-colors ${
              activeTab === "pessoas" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            Pessoas Funcionários
          </Link>
          <Link
            href="/controle-documentos"
            className={`flex-1 text-center py-4 px-6 text-white font-semibold transition-colors ${
              activeTab === "controle" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            Controle de Documentos
          </Link>
          <Link
            href="/pagamentos"
            className={`flex-1 text-center py-4 px-6 text-white font-semibold transition-colors ${
              activeTab === "pagamentos" ? "bg-blue-700" : "hover:bg-blue-700"
            }`}
          >
            Pagamentos
          </Link>
        </div>
      </div>
    </header>
  )
}
