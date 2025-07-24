"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { FileText, Eye, EyeOff, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [senha, setSenha] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const { login, isLoading, isAuthenticated, error: authError } = useAuth()
  const router = useRouter()

  // Redirecionar se já estiver autenticado
  useEffect(() => {
    if (isAuthenticated) {
      router.push("/dashboard")
    }
  }, [isAuthenticated, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !senha) {
      return
    }

    await login(email, senha)
  }

  if (isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Redirecionando...</p>
        </div>
      </div>
    )
  }

  // Novo design
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-100 rounded-full opacity-50 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full opacity-30 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-blue-100 to-transparent rounded-full opacity-20 blur-3xl"></div>
      </div>
      <div className="w-full max-w-md space-y-8">
        {/* Card de Login */}
        <div className="w-full max-w-md mx-auto relative z-10 animate-slide-up">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-white/20 p-8 space-y-8">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg relative">
                {/* Substitua House, CircleDollarSign, Shield por os ícones corretos do seu projeto */}
                <FileText className="w-14 h-14 text-white drop-shadow-sm" />
                <div className="absolute top-14 right-3 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center">
                  {/* Ícone secundário */}
                  <Eye className="w-4 h-4 text-white" />
                </div>
              </div>
              <div className="space-y-3">
                <h1 className="text-3xl font-bold text-blue-900 tracking-tight">Sistema de Protocolo</h1>
                <div className="space-y-1">
                  <p className="text-blue-700 font-medium">Prefeitura de Itaguaí</p>
                  <p className="text-sm text-blue-600">Acesse sua conta institucional</p>
                </div>
              </div>
            </div>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {authError && (
                  <Alert variant="destructive">
                    <AlertDescription>{authError}</AlertDescription>
                  </Alert>
                )}
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-sm font-semibold text-blue-900">
                    E-mail institucional
                  </Label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FileText className="h-5 w-5 text-blue-400" />
                    </div>
                    <Input
                      id="email"
                      type="email"
                      placeholder="seu.nome@itaguai.rj.gov.br"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="pl-12 h-14 text-base border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                      required
                    />
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="relative">
                    <Label htmlFor="password" className="text-sm font-semibold text-blue-900">
                      Senha
                    </Label>
                    <div className="absolute mt-4 left-0 pl-4 flex items-center pointer-events-none">
                      <Eye className="h-5 w-5 text-blue-400" />
                    </div>
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      className="pl-12 pr-14 h-14 text-base border-blue-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-200"
                      placeholder="Digite sua senha"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center text-blue-400 hover:text-blue-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                      aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    >
                      {showPassword ? (
                        <EyeOff className="h-5 w-5 mt-7" />
                      ) : (
                        <Eye className="h-5 w-5 mt-7" />
                      )}
                    </button>
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={isLoading || !email || !senha}
                  className="w-full h-14 bg-gradient-to-r from-blue-600 to-blue-700 hover:shadow-lg text-white font-semibold rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center space-x-3">
                      <Loader2 className="animate-spin w-5 h-5" />
                      <span>Entrando...</span>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center space-x-3">
                      <Eye className="w-5 h-5" />
                      <span>Entrar no Sistema</span>
                    </div>
                  )}
                </Button>
              </form>
              <div className="text-center space-y-4 pt-6 border-t border-blue-100 mt-8">
                <div className="flex items-center justify-center space-x-2 text-sm text-blue-600">
                  <Eye className="w-4 h-4 text-green-600" />
                  <span className="font-medium">Conexão segura e criptografada</span>
                </div>
                <div className="text-xs text-blue-500 space-y-1">
                  <p>© 2025 Prefeitura Municipal de Itaguaí</p>
                  <p>Desenvolvido pela Secretaria Municipal de Ciência, Tecnologia e Inovação</p>
                </div>
              </div>
            </CardContent>
          </div>
        </div>
      </div>
    </div>
  )
}

