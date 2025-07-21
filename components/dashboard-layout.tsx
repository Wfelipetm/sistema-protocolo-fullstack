"use client"

import type React from "react"

import { useState } from "react"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
  SidebarRail,
} from "@/components/ui/sidebar"
import { FileText, Plus, FileSearch, CreditCard, Search, FolderOpen, LogOut, User, Settings } from "lucide-react"
import Link from "next/link"

interface DashboardLayoutProps {
  children: React.ReactNode
}

const menuItems = [
  {
    title: "Controle Documento",
    url: "/dashboard/controle-documento",
    icon: FileText,
  },
  {
    title: "Cadastro Principal",
    url: "/dashboard/cadastro-principal",
    icon: Plus,
  },
  {
    title: "Docs. Recebidos",
    url: "/dashboard/docs-recebidos",
    icon: FileSearch,
  },
  {
    title: "Pagamentos",
    url: "/dashboard/pagamentos",
    icon: CreditCard,
  },
  {
    title: "Localizar",
    url: "/dashboard/localizar",
    icon: Search,
  },
  {
    title: "Apensos",
    url: "/dashboard/apensos",
    icon: FolderOpen,
  },
]

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const [userEmail, setUserEmail] = useState("usuario.sistema@itaguai.rj.gov.br")

  // Removida a verificação de autenticação

  const handleLogout = () => {
    // Removida a limpeza do localStorage
    router.push("/login")
  }

  const getUserInitials = (email: string) => {
    if (!email) return "U"
    const name = email.split("@")[0]
    const parts = name.split(".")
    if (parts.length >= 2) {
      return (parts[0][0] + parts[1][0]).toUpperCase()
    }
    return name.substring(0, 2).toUpperCase()
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gray-50">
        <Sidebar className="border-r border-gray-200">
          <SidebarHeader className="border-b border-gray-200 bg-white">
            <div className="flex items-center gap-3 px-4 py-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-gray-900 text-sm">Sistema Protocolo</h2>
                <p className="text-xs text-gray-600">Sistema para abertura de protocolo</p>
              </div>
            </div>
          </SidebarHeader>

          <SidebarContent className="bg-white">
            <SidebarMenu className="px-2 py-4">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.url}
                    className="hover:bg-blue-50 hover:text-blue-700 data-[active=true]:bg-blue-100 data-[active=true]:text-blue-700 data-[active=true]:border-r-2 data-[active=true]:border-blue-600"
                  >
                    <Link href={item.url} className="flex items-center gap-3 px-3 py-2">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarContent>

          <SidebarFooter className="border-t border-gray-200 bg-white p-4">
            <div className="text-center text-xs text-gray-500">
              <p>© 2025 Sistema Protocolo</p>
              <p>Desenvolvido por SMCTIC</p>
              <p>Versão 1.0.0</p>
            </div>
          </SidebarFooter>

          {/* Adicionar o SidebarRail para permitir fechar/abrir */}
          <SidebarRail />
        </Sidebar>

        <SidebarInset className="flex-1">
          {/* Header */}
          <header className="bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg">
            <div className="flex items-center justify-between px-6 py-4">
              <div className="flex items-center gap-4">
                <SidebarTrigger className="text-white hover:bg-blue-700" />
                <div className="flex items-center gap-3">
                  <FileText className="h-6 w-6" />
                  <div>
                    <h1 className="font-semibold text-lg">Sistema de protocolo</h1>
                    <p className="text-sm text-blue-100">
                      Prefeitura Municipal de Itaguaí - Secretaria de Administração
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="hidden md:flex items-center gap-2 text-sm">
                  <span>Prefeitura de</span>
                  <span className="font-semibold">Itaguaí</span>
                  <span>Secretaria de Ciência, Tecnologia, Inovação e Comunicação</span>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="text-white hover:bg-blue-700 p-2">
                      <Avatar className="h-8 w-8 bg-blue-700">
                        <AvatarFallback className="bg-blue-700 text-white text-sm">
                          {getUserInitials(userEmail)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <div className="px-2 py-1.5">
                      <p className="text-sm font-medium">{userEmail.split("@")[0].replace(".", " ")}</p>
                      <p className="text-xs text-gray-500">{userEmail}</p>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="h-4 w-4 mr-2" />
                      Perfil
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="h-4 w-4 mr-2" />
                      Configurações
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair do Sistema
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          {/* Main Content */}
          <main className="flex-1 p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
