"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Users, Clock, TrendingUp, Plus, Search } from "lucide-react"

export default function DashboardPage() {
  const router = useRouter()
  const [userEmail, setUserEmail] = useState("")

  useEffect(() => {
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    const email = localStorage.getItem("userEmail")

    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (email) {
      setUserEmail(email)
    }
  }, [router])

  const stats = [
    {
      title: "Protocolos Abertos",
      value: "1,234",
      description: "Este mês",
      icon: FileText,
      color: "bg-blue-500",
    },
    {
      title: "Em Andamento",
      value: "89",
      description: "Aguardando análise",
      icon: Clock,
      color: "bg-yellow-500",
    },
    {
      title: "Finalizados",
      value: "456",
      description: "Este mês",
      icon: Users,
      color: "bg-green-500",
    },
    {
      title: "Crescimento",
      value: "+12%",
      description: "Comparado ao mês anterior",
      icon: TrendingUp,
      color: "bg-purple-500",
    },
  ]

  const recentActivities = [
    { id: 1, action: "Protocolo #2024001 criado", time: "2 min atrás", user: "João Silva" },
    { id: 2, action: "Documento anexado ao protocolo #2024002", time: "5 min atrás", user: "Maria Santos" },
    { id: 3, action: "Protocolo #2024003 finalizado", time: "10 min atrás", user: "Pedro Costa" },
    { id: 4, action: "Nova tramitação iniciada", time: "15 min atrás", user: "Ana Oliveira" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-600">Bem-vindo ao Sistema de Protocolo, {userEmail.split("@")[0]}</p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Novo Protocolo
            </Button>
            <Button variant="outline">
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
              <CardDescription>Últimas movimentações no sistema</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-xs text-gray-500">
                        {activity.user} • {activity.time}
                      </p>
                    </div>
                  </div>
                ))}
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
              >
                <FileText className="h-4 w-4 mr-2" />
                Controle Documento
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Cadastro Principal
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              >
                <Search className="h-4 w-4 mr-2" />
                Localizar Protocolo
              </Button>
              <Button
                variant="outline"
                className="w-full justify-start hover:bg-blue-50 hover:border-blue-300 bg-transparent"
              >
                <Clock className="h-4 w-4 mr-2" />
                Docs. Recebidos
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  )
}
