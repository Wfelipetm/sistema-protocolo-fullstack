"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { api } from "@/lib/api"

export default function DocsRecebidos() {
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
      // Filtrar documentos recebidos se necessário
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
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Documentos Recebidos
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl font-medium opacity-90" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Gerencie todos os documentos recebidos pelo sistema
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Container Principal */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 lg:p-12 transform hover:shadow-3xl transition-all duration-500">
          
          {/* Título da Seção */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Lista de Documentos Recebidos
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
            </h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 transform hover:shadow-2xl transition-all duration-300">
              {/* Header da Tabela */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="grid grid-cols-5 gap-4 p-6 text-sm font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Processo</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Data Recebimento</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Docs. Guia</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Nº da Guia</span>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Apensos</span>
                  </div>
                </div>
              </div>

              {/* Conteúdo da Tabela */}
              <div className="min-h-[400px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-blue-600 font-medium text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Carregando documentos...
                    </p>
                  </div>
                ) : error ? (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z" />
                      </svg>
                    </div>
                    <p className="text-red-600 font-semibold text-lg mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Erro ao carregar documentos
                    </p>
                    <p className="text-red-500 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {error}
                    </p>
                  </div>
                ) : documentos.length > 0 ? (
                  <div className="divide-y divide-blue-50">
                    {documentos.map((doc, index) => (
                      <div key={doc.id} className={`p-6 hover:bg-blue-50/50 transform hover:scale-[1.01] transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-25/30'}`}>
                        <div className="grid grid-cols-5 gap-4 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          <div className="font-semibold text-blue-900">
                            {doc.processo?.numero_documento || '-'}
                          </div>
                          <div className="text-blue-700">
                            {doc.data_envio ? new Date(doc.data_envio).toLocaleDateString('pt-BR') : '-'}
                          </div>
                          <div className="text-blue-600">
                            {doc.docs_guia || '-'}
                          </div>
                          <div className="text-blue-600">
                            {doc.numero_guia || '-'}
                          </div>
                          <div className="text-blue-500">
                            {doc.apensos || '-'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 6L9 17l-5-5" />
                      </svg>
                    </div>
                    <h3 className="text-blue-800 font-bold text-xl mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Nenhum documento recebido encontrado
                    </h3>
                    <p className="text-blue-500 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Aguardando novos documentos
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Estatísticas */}
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Estatísticas de Recebimento
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 - Total Recebidos */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 relative">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-blue-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Total Recebidos
                      </h3>
                      <p className="text-3xl font-black text-blue-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {documentos.length}
                      </p>
                      <p className="text-blue-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        documentos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Recebidos Hoje */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 relative">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-indigo-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Hoje
                      </h3>
                      <p className="text-3xl font-black text-indigo-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {documentos.filter(doc => {
                          const hoje = new Date().toDateString()
                          const dataDoc = doc.data_envio ? new Date(doc.data_envio).toDateString() : null
                          return dataDoc === hoje
                        }).length}
                      </p>
                      <p className="text-indigo-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        recebidos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Status */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 relative">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-green-200/20 rounded-full blur-2xl transform translate-x-16 translate-y-16"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-green-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Status Ativo
                      </h3>
                      <p className="text-3xl font-black text-green-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        100%
                      </p>
                      <p className="text-green-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        sistema operacional
                      </p>
                    </div>
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
