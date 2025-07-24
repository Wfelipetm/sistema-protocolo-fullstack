"use client"

import type { ReactNode } from "react"
import {
  FileText,
  Users,
  FileCheck,
  CreditCard,
  Search,
  FileX,
  ChevronLeft,
  ChevronRight,
  Send,
  History,
  LogOut,
  User,
  BarChart3,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import ProtectedRoute from "./ProtectedRoute"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const { user, logout } = useAuth()

  // Efeito para hidratação e carregamento do estado do localStorage
  useEffect(() => {
    setIsClient(true)
    const savedState = localStorage.getItem("sidebar-collapsed")
    if (savedState !== null) {
      setSidebarCollapsed(JSON.parse(savedState))
    }
  }, [])

  const toggleSidebar = () => {
    const newState = !sidebarCollapsed
    setSidebarCollapsed(newState)
    // Salva o estado no localStorage
    localStorage.setItem("sidebar-collapsed", JSON.stringify(newState))
  }

  // Previne hidratação mismatch
  if (!isClient) {
    return null
  }

  const menuItems = [
    { icon: BarChart3, label: "Dashboard", href: "/dashboard" },
    { icon: FileCheck, label: "Controle Documento", href: "/controle-documento" },
    { icon: Users, label: "Cadastro Principal", href: "/cadastro-principal" },
    { icon: FileText, label: "Docs. Recebidos", href: "/docs-recebidos" },
    { icon: CreditCard, label: "Pagamentos", href: "/pagamentos" },
    { icon: Search, label: "Localizar", href: "/localizar" },
    { icon: FileX, label: "Apensos", href: "/apensos" },
    { icon: Send, label: "Docs. Enviados", href: "/docs-enviados" },
    { icon: History, label: "Histórico", href: "/historico" },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-sistema-background-secondary">
        {/* Header - Full Width */}
        <header className="bg-sistema-background-primary border-b border-sistema-border-light px-6 py-4 w-full">
          <div className="flex items-center justify-between">
            {/* Logo e título à esquerda */}
            <div className="flex items-center space-x-4 flex-1">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-sistema-primary rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-sistema-text-white" />
                </div>
                <div>
                  <h1 className="text-sistema-primary font-bold text-lg">Sistema Protocolo</h1>
                  <p className="text-xs text-sistema-text-secondary">Sistema para abertura de protocolo</p>
                </div>
              </div>
            </div>

            {/* Logo centralizada */}
            <div className="flex-1 flex justify-center">
              <img
                src="/prefeitura-logo.png"
                alt="Logo Sistema Protocolo"
                className="h-16 w-auto object-contain"
              />
            </div>

            {/* Área do usuário à direita */}
            <div className="flex items-center space-x-6 flex-1 justify-end">
             
            
              <div className="flex items-center space-x-3">
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="w-12 h-12 bg-sistema-primary rounded-full flex items-center justify-center hover:bg-sistema-primary/90 p-0"
                    >
                      <span className="text-sistema-text-white font-bold text-lg">
                        {user?.nome?.charAt(0) || "U"}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user?.nome}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className="text-red-600 focus:text-red-600">
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area - Sidebar + Main */}
        <div className="flex h-[calc(100vh-88px)]">
          {/* Sidebar */}
          <aside
            className={`bg-sistema-background-sidebar border-r border-sistema-border-light transition-all duration-300 flex flex-col relative group ${
              sidebarCollapsed ? "w-16" : "w-64"
            }`}
          >
            {/* Botão de Toggle Sutil */}
            <button
              onClick={toggleSidebar}
              className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 w-4 h-8 bg-gray-100 hover:bg-gray-200 border-r border-t border-b border-sistema-border-light rounded-r-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center focus:outline-none focus:opacity-100"
              title={sidebarCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-3 h-3 text-gray-500" />
              ) : (
                <ChevronLeft className="w-3 h-3 text-gray-500" />
              )}
            </button>

            {/* Sidebar Content */}
            <nav className="flex-1 p-4">
              <ul className="space-y-1">
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-center space-x-3 px-3 py-3 text-sistema-primary hover:bg-sistema-background-secondary rounded-lg transition-colors group"
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      {!sidebarCollapsed && <span className="text-sm font-medium">{item.label}</span>}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 border-t border-sistema-border-light">
              {!sidebarCollapsed ? (
                <div className="text-xs text-sistema-text-secondary space-y-1">
                  <p>©2025 Sistema Protocolo</p>
                  <p>Desenvolvido por SMCTIC</p>
                  <p>Versão 1.0.0</p>
                </div>
              ) : (
                <div className="flex justify-center">
                  <div className="w-6 h-6 bg-sistema-primary rounded flex items-center justify-center">
                    <span className="text-sistema-text-white text-xs font-bold">S</span>
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
