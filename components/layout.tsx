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
} from "lucide-react"
import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import ProtectedRoute from "./ProtectedRoute"

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isClient, setIsClient] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
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
    { icon: FileCheck, label: "Controle Documento", href: "/controle-documento" },
    { icon: Users, label: "Cadastro Principal", href: "/cadastro-principal" },
    { icon: FileText, label: "Docs. Recebidos", href: "/docs-recebidos" },
    { icon: Send, label: "Docs. Enviados", href: "/docs-enviados" },
    { icon: CreditCard, label: "Pagamentos", href: "/pagamentos" },
    { icon: Search, label: "Localizar", href: "/localizar" },
    { icon: FileX, label: "Apensos", href: "/apensos" },    
    // { icon: History, label: "Histórico", href: "/historico" },
  ]

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50">
        {/* Header - Full Width */}
        <header className="bg-white shadow-lg px-6 py-4 w-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-800 rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-blue-800 font-bold text-lg">Sistema Protocolo</h1>
                  <p className="text-sm text-blue-600">Sistema para abertura de protocolo</p>
                </div>
              </div>
            </div>

            {/* Logo central */}
            <div className="flex-1 flex justify-center">
              <img
                src="/SMCTIC---Azul.png"
                alt="Secretaria de Ciência, Tecnologia, Inovação e Comunicação"
                className="h-16 max-w-[400px] object-contain"
              />
            </div>

            <div className="flex items-center space-x-6">

              {/* <div className="text-right">
                <p className="text-sm font-semibold text-white leading-tight">Prefeitura de</p>
                <p className="text-sm font-semibold text-white leading-tight">Secretaria de</p>
                <p className="text-sm font-semibold text-white leading-tight">Ciência, Tecnologia</p>
                <p className="text-sm font-semibold text-white leading-tight">Inovação e Comunicação</p>
              </div> */}
              <div className="relative">
                <button
                  className="flex items-center space-x-2 focus:outline-none group"
                  type="button"
                  id="user-menu-button"
                  aria-haspopup="true"
                  aria-expanded="false"
                  onClick={() => setShowUserMenu((v) => !v)}
                >
                  <div className="w-12 h-12 bg-blue-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{user?.nome?.charAt(0) || "U"}</span>
                  </div>
                </button>
                {showUserMenu && (
                  <div
                    className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                  >
                    <div className="px-4 py-3 border-b">
                      <p className="text-sm font-semibold text-blue-900">{user?.nome}</p>
                      <p className="text-xs text-blue-700">{user?.email}</p>
                    </div>
                    <div className="py-2">
                      <Button
                        onClick={logout}
                        variant="ghost"
                        size="sm"
                        className="w-full flex items-center justify-start text-blue-700 hover:text-red-600 hover:bg-blue-100"
                        title="Sair do sistema"
                      >
                        <LogOut className="w-4 h-4 mr-2" />
                        Sair
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </header>

        {/* Content Area - Sidebar + Main */}
        <div className="flex h-[calc(100vh-88px)]">
          {/* Sidebar */}
          <aside
            className={`bg-white shadow-lg sha transition-all duration-500 flex flex-col relative group ${sidebarCollapsed ? "w-16" : "w-64"
              }`}
          >
            {/* Botão de Toggle Sutil */}
            <button
              onClick={toggleSidebar}
              className="absolute top-1/2 -right-2 transform -translate-y-1/2 z-10 w-4 h-20 bg-white hover:bg-blue-200 border-r border-t border-b border-white rounded-r-md opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center focus:outline-none focus:opacity-100"
              title={sidebarCollapsed ? "Expandir sidebar" : "Recolher sidebar"}
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-3 h-3 text-blue-600" />
              ) : (
                <ChevronLeft className="w-3 h-3 text-blue-600" />
              )}
            </button>

            {/* Sidebar Content */}
            <nav className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'p-2' : 'p-4'}`}>
              <ul className={`transition-all duration-300 ${sidebarCollapsed ? 'space-y-0.5' : 'space-y-1'}`}>
                {menuItems.map((item, index) => (
                  <li key={index}>
                    <a
                      href={item.href}
                      className={`flex items-center text-blue-700 hover:bg-blue-50 hover:text-blue-800 rounded-lg transition-all duration-300 group ${sidebarCollapsed
                          ? 'space-x-0 px-2 py-3 justify-center h-16'
                          : 'space-x-3 px-3 py-3'
                        }`}
                      title={sidebarCollapsed ? item.label : undefined}
                    >
                      <item.icon className="w-5 h-5 flex-shrink-0" />
                      <span
                        className={`text-sm font-medium transition-all duration-300 ${sidebarCollapsed
                            ? 'opacity-0 scale-95 w-0 overflow-hidden'
                            : 'opacity-100 scale-100 w-auto'
                          }`}
                        style={{
                          transitionDelay: sidebarCollapsed ? '0ms' : '150ms'
                        }}
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>

            {/* Sidebar Footer */}
            <div className="p-4 ">
              <div
                className={`transition-all duration-300 ${sidebarCollapsed
                    ? 'opacity-0 scale-95 overflow-hidden'
                    : 'opacity-100 scale-100'
                  }`}
                style={{
                  transitionDelay: sidebarCollapsed ? '0ms' : '150ms'
                }}
              >
                <div className="text-xs text-end text-blue-700 space-y-1">
                  <p>©{new Date().getFullYear()} Sistema Protocolo</p>
                  <p>Desenvolvido por SMCTIC</p>
                  <p>Versão 1.0.0</p>
                </div>
              </div>
              {/* <div 
                className={`flex justify-center transition-all duration-300 ${
                  sidebarCollapsed 
                    ? 'opacity-100 scale-100' 
                    : 'opacity-0 scale-95 overflow-hidden'
                }`}
                style={{
                  transitionDelay: sidebarCollapsed ? '150ms' : '0ms'
                }}
              >
                <div className="w-6 h-6 bg-blue-700 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">S</span>
                </div>
              </div> */}
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 p-6 overflow-auto">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
