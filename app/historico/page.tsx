"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { api } from "@/lib/api"

export default function Historico() {
  const [tramites, setTramites] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetchTramites()
  }, [])

  const fetchTramites = async () => {
    try {
      setLoading(true)
      const response = await api.get('/tramites')
      setTramites(response.data || [])
    } catch (error: any) {
      console.error('Erro ao carregar tramites:', error)
      setError(error.response?.data?.message || 'Erro ao carregar tramites')
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
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Histórico de Tramitações
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl font-medium opacity-90" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Acompanhe o fluxo completo de todos os processos do sistema
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Container Principal */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 lg:p-12 transform hover:shadow-3xl transition-all duration-500">
          
          {/* Cards de Estatísticas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Card 1 - Total de Tramitações */}
            <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-blue-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Total Tramitações
                    </h3>
                    <p className="text-3xl font-black text-blue-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {tramites.length}
                    </p>
                    <p className="text-blue-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      processos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2 - Em Andamento */}
            <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8 relative">
                <div className="absolute top-0 left-0 w-32 h-32 bg-amber-200/20 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-amber-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Em Andamento
                    </h3>
                    <p className="text-3xl font-black text-amber-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {tramites.filter(t => t.situacao === 'EM_ANDAMENTO').length}
                    </p>
                    <p className="text-amber-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      processos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 3 - Finalizados */}
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
                      Finalizados
                    </h3>
                    <p className="text-3xl font-black text-green-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {tramites.filter(t => t.situacao === 'FINALIZADO').length}
                    </p>
                    <p className="text-green-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      processos
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 4 - Hoje */}
            <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
              <div className="bg-gradient-to-br from-purple-50 to-indigo-50 p-8 relative">
                <div className="absolute top-0 right-0 w-32 h-32 bg-purple-200/20 rounded-full blur-2xl transform translate-x-16 -translate-y-16"></div>
                
                <div className="relative z-10 space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m4 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-purple-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Hoje
                    </h3>
                    <p className="text-3xl font-black text-purple-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {tramites.filter(t => {
                        const hoje = new Date().toDateString()
                        const dataTramite = new Date(t.data_tramite).toDateString()
                        return dataTramite === hoje
                      }).length}
                    </p>
                    <p className="text-purple-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      tramitações
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Seção Lista de Histórico */}
          <div className="mb-12">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0 mb-8">
              <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Lista do Histórico
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>
            </div>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 transform hover:shadow-2xl transition-all duration-300">
              {/* Header da Tabela */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                <div className="grid grid-cols-4 gap-4 p-6 text-sm font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Nº Processo</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Data</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a1 1 0 011-1h6a1 1 0 011 1v4m4 0v10a2 2 0 01-2 2H6a2 2 0 01-2-2V7a2 2 0 012-2h12a2 2 0 012 2z" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Situação</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                    <span>Responsável</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Conteúdo da Tabela */}
              <div className="min-h-[400px]">
                {loading ? (
                  <div className="flex flex-col items-center justify-center py-16 space-y-4">
                    <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                    <p className="text-blue-600 font-medium text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Carregando histórico...
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
                      Erro ao carregar histórico
                    </p>
                    <p className="text-red-500 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {error}
                    </p>
                  </div>
                ) : tramites.length > 0 ? (
                  <div className="divide-y divide-blue-50">
                    {tramites.map((tramite, index) => (
                      <div key={tramite.id} className={`p-6 hover:bg-blue-50/50 transform hover:scale-[1.01] transition-all duration-200 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-blue-25/30'}`}>
                        <div className="grid grid-cols-4 gap-4 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          <div className="font-semibold text-blue-900">
                            {tramite.processo?.numero_documento || '-'}
                          </div>
                          <div className="text-blue-700">
                            {new Date(tramite.data_tramite).toLocaleDateString('pt-BR')}
                          </div>
                          <div>
                            <span className={`px-3 py-1 text-xs font-semibold rounded-full transform hover:scale-105 transition-transform duration-200 ${
                              tramite.situacao === 'FINALIZADO' 
                                ? 'bg-gradient-to-r from-green-100 to-emerald-100 text-green-800 border border-green-200' 
                                : tramite.situacao === 'EM_ANDAMENTO'
                                ? 'bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-800 border border-amber-200'
                                : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border border-blue-200'
                            }`} style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                              {tramite.situacao === 'FINALIZADO' ? '✓ Finalizado' : 
                               tramite.situacao === 'EM_ANDAMENTO' ? '⏳ Em Andamento' : tramite.situacao}
                            </span>
                          </div>
                          <div className="text-blue-600 font-medium">
                            {tramite.responsavel?.nome || '-'}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-16">
                    <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
                      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-blue-800 font-bold text-xl mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Nenhum histórico encontrado
                    </h3>
                    <p className="text-blue-500 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      As tramitações aparecerão aqui conforme forem processadas
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Seção de Ações Rápidas */}
          <div className="space-y-8">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Ações Rápidas
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Botão Atualizar */}
              <button 
                onClick={fetchTramites}
                disabled={loading}
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 border-0 disabled:opacity-50"
              >
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    {loading ? (
                      <div className="w-8 h-8 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    ) : (
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    )}
                  </div>
                  <div className="text-center">
                    <h3 className="text-white font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      {loading ? 'Atualizando...' : 'Atualizar Histórico'}
                    </h3>
                    <p className="text-blue-100 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Recarregar tramitações
                    </p>
                  </div>
                </div>
              </button>

              {/* Filtros */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-purple-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Filtros Avançados
                    </h3>
                    <p className="text-purple-600 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Filtrar por período e status
                    </p>
                  </div>
                </div>
              </div>

              {/* Exportar Relatório */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden p-8">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a4 4 0 01-4-4V5a4 4 0 014-4h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a4 4 0 01-4 4z" />
                    </svg>
                  </div>
                  <div className="text-center">
                    <h3 className="text-green-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Exportar Relatório
                    </h3>
                    <p className="text-green-600 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Baixar relatório completo
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
