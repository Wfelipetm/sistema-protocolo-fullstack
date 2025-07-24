"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { api } from "@/lib/api"

interface DashboardStats {
  totalProcessos: number
  processosEmAndamento: number
  processosFinalizados: number
  processosMes: number
  processosHoje: number
  valorTotalPagamentos: number
  mediaProcessosDia: number
  percentualFinalizados: number
  tramitesRecentes: Array<{
    id: number
    data_tramite: string
    situacao: string
    processo?: {
      numero_documento: string
      assunto?: string
    }
    responsavel?: {
      nome: string
    }
  }>
  processosRecentes: Array<{
    id: number
    numero_documento: string
    ano: number
    assunto: string
    data_abertura: string
    status?: string
    setor?: {
      nome: string
    }
  }>
  estatisticasPorMes: Array<{
    mes: string
    total: number
  }>
}

export default function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)
  const [autoRefresh, setAutoRefresh] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
    
    // Auto-refresh a cada 30 segundos se habilitado
    let interval: NodeJS.Timeout | null = null
    if (autoRefresh) {
      interval = setInterval(() => {
        fetchDashboardStats()
      }, 30000) // 30 segundos
    }
    
    return () => {
      if (interval) {
        clearInterval(interval)
      }
    }
  }, [autoRefresh])

  const fetchDashboardStats = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Buscar dados das diferentes rotas da API
      const [processosRes, tramitesRes, pagamentosRes] = await Promise.all([
        api.get('/processos'),
        api.get('/tramites'),
        api.get('/pagamentos')
      ])
      
      const processos = processosRes.data || []
      const tramites = tramitesRes.data || []
      const pagamentos = pagamentosRes.data || []
      
      // Data atual para cálculos dinâmicos
      const hoje = new Date()
      const inicioMes = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
      const inicioHoje = new Date(hoje.getFullYear(), hoje.getMonth(), hoje.getDate())
      
      // Calcular estatísticas em tempo real
      const totalProcessos = processos.length
      const processosEmAndamento = processos.filter((p: any) => 
        p.status && !['finalizado', 'arquivado', 'concluido'].includes(p.status.toLowerCase())
      ).length
      const processosFinalizados = processos.filter((p: any) => 
        p.status && ['finalizado', 'arquivado', 'concluido'].includes(p.status.toLowerCase())
      ).length
      
      const processosMes = processos.filter((p: any) => 
        new Date(p.data_abertura) >= inicioMes
      ).length
      
      const processosHoje = processos.filter((p: any) => 
        new Date(p.data_abertura) >= inicioHoje
      ).length
      
      const valorTotalPagamentos = pagamentos.reduce((sum: number, p: any) => 
        sum + (parseFloat(p.valor) || 0), 0
      )
      
      // Média dinâmica dos últimos 30 dias
      const trintaDiasAtras = new Date(hoje.getTime() - (30 * 24 * 60 * 60 * 1000))
      const processosUltimos30Dias = processos.filter((p: any) => 
        new Date(p.data_abertura) >= trintaDiasAtras
      ).length
      const mediaProcessosDia = Math.round(processosUltimos30Dias / 30 * 10) / 10
      
      const percentualFinalizados = totalProcessos > 0 
        ? Math.round((processosFinalizados / totalProcessos) * 100)
        : 0
      
      // Dados mais recentes
      const tramitesRecentes = tramites
        .sort((a: any, b: any) => new Date(b.data_tramite).getTime() - new Date(a.data_tramite).getTime())
        .slice(0, 10)
      
      const processosRecentes = processos
        .sort((a: any, b: any) => new Date(b.data_abertura).getTime() - new Date(a.data_abertura).getTime())
        .slice(0, 10)
      
      // Estatísticas mensais dinâmicas
      const estatisticasPorMes = []
      for (let i = 5; i >= 0; i--) {
        const mesData = new Date(hoje.getFullYear(), hoje.getMonth() - i, 1)
        const proximoMes = new Date(hoje.getFullYear(), hoje.getMonth() - i + 1, 1)
        
        const processosDoMes = processos.filter((p: any) => {
          const dataAbertura = new Date(p.data_abertura)
          return dataAbertura >= mesData && dataAbertura < proximoMes
        }).length
        
        estatisticasPorMes.push({
          mes: mesData.toLocaleDateString('pt-BR', { month: 'short', year: '2-digit' }),
          total: processosDoMes
        })
      }
      
      setStats({
        totalProcessos,
        processosEmAndamento,
        processosFinalizados,
        processosMes,
        processosHoje,
        valorTotalPagamentos,
        mediaProcessosDia,
        percentualFinalizados,
        tramitesRecentes,
        processosRecentes,
        estatisticasPorMes
      })
      
      setLastUpdate(new Date())
    } catch (err: any) {
      console.error('Erro ao carregar dashboard:', err)
      setError(err.response?.data?.message || 'Erro ao carregar dados do dashboard')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-8">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-12">
            <div className="flex flex-col items-center justify-center py-16 space-y-6">
              <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
              <p className="text-blue-600 font-bold text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Carregando Dashboard Dinâmico...
              </p>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  if (error) {
    return (
      <Layout>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-8">
          <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-12">
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" />
                </svg>
              </div>
              <h3 className="text-red-600 font-bold text-xl mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Erro ao carregar dados
              </h3>
              <p className="text-red-500 text-sm text-center max-w-md mb-6" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                {error}
              </p>
              <button 
                onClick={fetchDashboardStats}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-2xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 font-semibold"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                Tentar Novamente
              </button>
            </div>
          </div>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-6 space-y-8">
        {/* Header Dinâmico */}
        <div className="relative overflow-hidden bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 rounded-3xl shadow-2xl transform hover:scale-[1.02] transition-all duration-500">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-transparent"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl transform translate-x-32 -translate-y-32"></div>
          
          <div className="relative p-8 lg:p-12">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-sm border border-white/20 shadow-lg transform hover:rotate-6 transition-transform duration-300">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-4 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Dashboard Dinâmico
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl font-medium mb-4" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Sistema de Protocolo em Tempo Real - Prefeitura Municipal de Itaguaí
                </p>
                {lastUpdate && (
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-2 text-blue-200/80 text-sm">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <span style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Última atualização: {lastUpdate.toLocaleTimeString('pt-BR')}
                      </span>
                    </div>
                    <button
                      onClick={() => setAutoRefresh(!autoRefresh)}
                      className={`flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${
                        autoRefresh 
                          ? 'bg-green-500/20 text-green-100 hover:bg-green-500/30' 
                          : 'bg-red-500/20 text-red-100 hover:bg-red-500/30'
                      }`}
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    >
                      <div className={`w-2 h-2 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></div>
                      <span>{autoRefresh ? 'ATIVO' : 'INATIVO'}</span>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Indicadores Rápidos */}
          <div className="relative px-8 lg:px-12 pb-8">
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-white/80 text-xs font-medium mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Total</div>
                <div className="text-white text-2xl font-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {stats?.totalProcessos || 0}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-white/80 text-xs font-medium mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Andamento</div>
                <div className="text-white text-2xl font-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {stats?.processosEmAndamento || 0}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-white/80 text-xs font-medium mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Finalizados</div>
                <div className="text-white text-2xl font-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {stats?.processosFinalizados || 0}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-white/80 text-xs font-medium mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Este Mês</div>
                <div className="text-white text-2xl font-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {stats?.processosMes || 0}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-white/80 text-xs font-medium mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Hoje</div>
                <div className="text-white text-2xl font-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {stats?.processosHoje || 0}
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                <div className="text-white/80 text-xs font-medium mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Média/dia</div>
                <div className="text-white text-2xl font-black" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  {stats?.mediaProcessosDia || 0}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Container Principal */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 lg:p-12">
          
          {/* Cards Dinâmicos */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Estatísticas em Tempo Real
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-blue-800 font-bold text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Total</h3>
                      <p className="text-4xl font-black text-blue-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {stats?.totalProcessos || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-amber-800 font-bold text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Ativo</h3>
                      <p className="text-4xl font-black text-amber-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {stats?.processosEmAndamento || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-green-800 font-bold text-lg" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Concluído</h3>
                      <p className="text-4xl font-black text-green-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {stats?.percentualFinalizados || 0}%
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Atividades Tempo Real */}
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Atividades em Tempo Real
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Tramites */}
              <div className="bg-white rounded-2xl border border-blue-100/50 shadow-xl">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 border-b border-blue-100/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-blue-800 font-bold text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Trâmites</h3>
                    <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
                  {stats?.tramitesRecentes?.length ? (
                    stats.tramitesRecentes.map((tramite) => (
                      <div key={tramite.id} className="flex justify-between p-4 bg-blue-50/50 rounded-xl">
                        <div>
                          <p className="font-semibold text-blue-900 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            {tramite.processo?.numero_documento || 'N/A'}
                          </p>
                          <p className="text-blue-600 text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            {new Date(tramite.data_tramite).toLocaleString('pt-BR')}
                          </p>
                        </div>
                        <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          tramite.situacao === 'FINALIZADO' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                        }`}>
                          {tramite.situacao}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-blue-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Nenhum trâmite recente</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Processos */}
              <div className="bg-white rounded-2xl border border-blue-100/50 shadow-xl">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 border-b border-green-100/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-green-800 font-bold text-xl" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Processos</h3>
                    <div className={`w-3 h-3 rounded-full ${autoRefresh ? 'bg-green-400 animate-pulse' : 'bg-gray-400'}`}></div>
                  </div>
                </div>
                
                <div className="p-6 space-y-4 max-h-80 overflow-y-auto">
                  {stats?.processosRecentes?.length ? (
                    stats.processosRecentes.map((processo) => (
                      <div key={processo.id} className="flex justify-between p-4 bg-green-50/50 rounded-xl">
                        <div>
                          <p className="font-semibold text-green-900 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            {processo.numero_documento}/{processo.ano}
                          </p>
                          <p className="text-green-600 text-xs" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                            {new Date(processo.data_abertura).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <p className="text-green-600" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Nenhum processo recente</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Controles Dinâmicos */}
          <div className="space-y-8 mt-12">
            <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Controles Dinâmicos
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full"></div>
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <button 
                onClick={fetchDashboardStats}
                disabled={loading}
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-2xl shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 disabled:opacity-50"
              >
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Atualizar</h3>
                  <p className="text-blue-100 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Tempo real</p>
                </div>
              </button>

              <div className="bg-gradient-to-r from-emerald-600 to-green-700 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Hoje</h3>
                  <p className="text-green-100 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{stats?.processosHoje || 0} novos</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Performance</h3>
                  <p className="text-purple-100 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{stats?.percentualFinalizados || 0}%</p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-amber-600 to-orange-700 text-white p-6 rounded-2xl shadow-xl">
                <div className="text-center">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8" />
                    </svg>
                  </div>
                  <h3 className="font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>Média</h3>
                  <p className="text-amber-100 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>{stats?.mediaProcessosDia || 0}/dia</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}