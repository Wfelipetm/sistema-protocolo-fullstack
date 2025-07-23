"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Clock, TrendingUp, Plus, Search, Loader2 } from "lucide-react"

export default function DashboardPage() {
  const { user, isAuthenticated, isLoading } = useAuth()
  const router = useRouter()

  // Redirecionar se não estiver autenticado
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login")
    }
  }, [isAuthenticated, isLoading, router])

  // Estatísticas básicas
  const stats = [
    {
      title: "Protocolos",
      value: "0",
      description: "Total de processos",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Em Andamento",
      value: "0",
      description: "Processos ativos",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Finalizados",
      value: "0",
      description: "Processos concluídos",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Sistema",
      value: "Online",
      description: "Status do sistema",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ]

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // O useEffect irá redirecionar
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Bem-vindo ao Sistema de Protocolo, {user?.nome || user?.email || "Usuário"}</p>
        </div>
        <div className="flex gap-2">
          <Button 
            className="bg-blue-600 hover:bg-blue-700"
            onClick={() => router.push("/dashboard/cadastro-principal")}
          >
            <Plus className="h-4 w-4 mr-2" />
            Novo Protocolo
          </Button>
          <Button 
            variant="outline"
            onClick={() => router.push("/dashboard/localizar")}
          >
            <Search className="h-4 w-4 mr-2" />
            Localizar
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-200 transform hover:scale-[1.02]">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{stat.title}</CardTitle>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                <stat.icon className="h-4 w-4 text-white" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <p className="text-xs text-gray-500 mt-1">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activities */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-lg">Atividades Recentes</CardTitle>
            <CardDescription>Últimos protocolos registrados no sistema</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Nenhum protocolo encontrado</p>
              <p className="text-xs">Conecte-se à API para ver os dados</p>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Ações Rápidas</CardTitle>
            <CardDescription>Acesso rápido às principais funcionalidades</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="outline"
              className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              onClick={() => router.push("/dashboard/controle-documento")}
            >
              <FileText className="h-4 w-4 mr-2" />
              Controle Documento
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              onClick={() => router.push("/dashboard/cadastro-principal")}
            >
              <Plus className="h-4 w-4 mr-2" />
              Cadastro Principal
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              onClick={() => router.push("/dashboard/localizar")}
            >
              <Search className="h-4 w-4 mr-2" />
              Localizar Protocolo
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              onClick={() => router.push("/dashboard/docs-recebidos")}
            >
              <Clock className="h-4 w-4 mr-2" />
              Docs. Recebidos
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
