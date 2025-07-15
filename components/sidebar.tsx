"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-80 bg-blue-600 min-h-screen p-6">
      <div className="space-y-4">
        <Link href="/pessoas-funcionarios/cadastro-principal">
          <Button
            variant="secondary"
            className={`w-full justify-start text-left h-auto py-4 px-6 text-white border-0 ${
              pathname === "/pessoas-funcionarios/cadastro-principal" ? "bg-blue-800" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            Cadastro Principal
          </Button>
        </Link>

        <Link href="/pessoas-funcionarios/docs-recebidos">
          <Button
            variant="secondary"
            className={`w-full justify-start text-left h-auto py-4 px-6 text-white border-0 ${
              pathname === "/pessoas-funcionarios/docs-recebidos" ? "bg-blue-800" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            Docs. Recebidos
          </Button>
        </Link>

        <Link href="/pessoas-funcionarios/apensos">
          <Button
            variant="secondary"
            className={`w-full justify-start text-left h-auto py-4 px-6 text-white border-0 ${
              pathname === "/pessoas-funcionarios/apensos" ? "bg-blue-800" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            Apensos
          </Button>
        </Link>

        <Link href="/pessoas-funcionarios/localizar">
          <Button
            variant="secondary"
            className={`w-full justify-start text-left h-auto py-4 px-6 text-white border-0 ${
              pathname === "/pessoas-funcionarios/localizar" ? "bg-blue-800" : "bg-blue-700 hover:bg-blue-800"
            }`}
          >
            Localizar
          </Button>
        </Link>
      </div>
    </div>
  )
}
