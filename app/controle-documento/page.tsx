"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { api } from "@/lib/api"

export default function ControleDocumento() {
  const [documentos, setDocumentos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchDocumentos()
  }, [])

  const fetchDocumentos = async () => {
    try {
      setLoading(true)
      const response = await api.get('/documentos-controle')
      setDocumentos(response.data || [])
    } catch (error: any) {
      console.error('Erro ao carregar documentos:', error)
      setError(error.response?.data?.message || 'Erro ao carregar documentos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-8">
        {/* Header Moderno */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500 ease-out">
          {/* Efeito de overlay com padrão */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
          
          <div className="relative p-8 lg:p-12">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg transform hover:rotate-6 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                  <path d="M14 2v6h6" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Controle de Documentos
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl font-medium opacity-90" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Gerencie e monitore todos os documentos do sistema
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Container Principal */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 lg:p-12 transform hover:shadow-3xl transition-all duration-500">
          
          {/* Tabela Moderna */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Lista de Documentos
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
            </h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 transform hover:shadow-2xl transition-all duration-300">
              {/* Header da Tabela */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="grid grid-cols-10 gap-4 p-6 text-sm font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Opções</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Status</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Prioridade</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Nº Documento</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Assinado</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Cliente</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Nº Guia</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Tamanho</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Apensos</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Assunto</span>
                  </div>
                </div>
              </div>

              {/* Conteúdo da Tabela */}
              <div className="p-16 text-center">
                {loading ? (
                  <div className="flex flex-col items-center space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-blue-600 font-medium text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Carregando documentos...
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="text-red-600 font-semibold text-lg mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Erro ao carregar
                    </p>
                    <p className="text-red-500 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {error}
                    </p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="text-blue-800 font-bold text-xl mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Nenhum documento encontrado
                    </h3>
                    <p className="text-blue-500 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Adicione documentos para começar a gerenciar
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seção Gráficos Moderna */}
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Analytics & Relatórios
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>
              
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
                <Button className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                    <span>Arquivar</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
                
                <Button className="group relative bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-8 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <span className="relative z-10 flex items-center space-x-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                    </svg>
                    <span>Arquivar CI</span>
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Button>
              </div>
            </div>

            {/* Cards de Gráficos */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Gráfico 1 */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 h-80 flex flex-col items-center justify-center relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                  
                  <div className="relative z-10 text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <h3 className="text-blue-800 font-bold text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Documentos por Status
                    </h3>
                    <p className="text-blue-600 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Visualize a distribuição de documentos
                    </p>
                  </div>
                </div>
              </div>

              {/* Gráfico 2 */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 h-80 flex flex-col items-center justify-center relative">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
                  
                  <div className="relative z-10 text-center space-y-4">
                    <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
                      </svg>
                    </div>
                    <h3 className="text-indigo-800 font-bold text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Relatório Mensal
                    </h3>
                    <p className="text-indigo-600 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Acompanhe o progresso mensal
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
