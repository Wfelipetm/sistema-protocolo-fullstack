"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"

export default function Localizar() {
  const [processos, setProcessos] = useState<any[]>([])
  const [unidades, setUnidades] = useState<any[]>([])
  const [secretarias, setSecretarias] = useState<any[]>([])
  const [setores, setSetores] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      const [unidadesRes, secretariasRes] = await Promise.all([
        api.get('/unidade'),
        api.get('/secretarias')
      ])
      
      setUnidades(unidadesRes.data || [])
      setSecretarias(secretariasRes.data || [])
    } catch (error) {
      console.error('Erro ao carregar dados iniciais:', error)
    }
  }

  const fetchSetoresBySecretaria = async (secretariaId: number) => {
    try {
      const response = await api.get(`/secretarias/${secretariaId}/setores`)
      setSetores(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar setores:', error)
    }
  }

  const fetchProcessos = async (params: any = {}) => {
    try {
      setLoading(true)
      const response = await api.get('/processos', { params })
      setProcessos(response.data || [])
    } catch (error) {
      console.error('Erro ao buscar processos:', error)
    } finally {
      setLoading(false)
    }
  }

  const [filtros, setFiltros] = useState({
    unidade_id: '',
    secretaria_id: '',
    setor_id: '',
    numero_documento: '',
    ano: '',
    cpf: '',
    cnpj: '',
    nome_requerente: ''
  })

  const handleFiltroChange = (field: string, value: string) => {
    setFiltros(prev => ({ ...prev, [field]: value }))
    
    if (field === 'secretaria_id' && value) {
      fetchSetoresBySecretaria(parseInt(value))
    }
  }

  const handleBuscar = () => {
    const params = Object.fromEntries(
      Object.entries(filtros).filter(([_, value]) => value !== '')
    )
    fetchProcessos(params)
  }

  const handleLimpar = () => {
    setFiltros({
      unidade_id: '',
      secretaria_id: '',
      setor_id: '',
      numero_documento: '',
      ano: '',
      cpf: '',
      cnpj: '',
      nome_requerente: ''
    })
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
                  <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Localizar Processos
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl font-medium opacity-90" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Pesquise e encontre processos no sistema usando filtros avançados
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Container Principal */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 lg:p-12 transform hover:shadow-3xl transition-all duration-500">
          
          {/* Seção Filtros */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Filtros de Busca
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
            </h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 transform hover:shadow-2xl transition-all duration-300">
              {/* Header do Formulário */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <h3 className="text-xl font-bold flex items-center space-x-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span>Parâmetros de Pesquisa</span>
                </h3>
              </div>

              {/* Formulário */}
              <form className="p-8 space-y-8">
                {/* Primeira linha */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3 group">
                    <Label htmlFor="unidade" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Unidade
                    </Label>
                    <Select value={filtros.unidade_id} onValueChange={(value) => handleFiltroChange('unidade_id', value)}>
                      <SelectTrigger className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        <SelectValue placeholder="Selecione a unidade" />
                      </SelectTrigger>
                      <SelectContent>
                        {unidades.map((unidade) => (
                          <SelectItem key={unidade.id} value={unidade.id.toString()}>
                            {unidade.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="secretaria" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Secretaria
                    </Label>
                    <Select value={filtros.secretaria_id} onValueChange={(value) => handleFiltroChange('secretaria_id', value)}>
                      <SelectTrigger className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        <SelectValue placeholder="Selecione a secretaria" />
                      </SelectTrigger>
                      <SelectContent>
                        {secretarias.map((secretaria) => (
                          <SelectItem key={secretaria.id} value={secretaria.id.toString()}>
                            {secretaria.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="numero-documento" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Nº Documento
                    </Label>
                    <Input
                      id="numero-documento"
                      value={filtros.numero_documento}
                      onChange={(e) => handleFiltroChange('numero_documento', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="Digite o número"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="ano" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Ano
                    </Label>
                    <Input
                      id="ano"
                      type="number"
                      value={filtros.ano}
                      onChange={(e) => handleFiltroChange('ano', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="YYYY"
                    />
                  </div>
                </div>

                {/* Segunda linha */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="space-y-3 group">
                    <Label htmlFor="setor" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Setor
                    </Label>
                    <Select value={filtros.setor_id} onValueChange={(value) => handleFiltroChange('setor_id', value)} disabled={!filtros.secretaria_id}>
                      <SelectTrigger className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02] disabled:opacity-50" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        <SelectValue placeholder="Selecione o setor" />
                      </SelectTrigger>
                      <SelectContent>
                        {setores.map((setor) => (
                          <SelectItem key={setor.id} value={setor.id.toString()}>
                            {setor.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="nome-requerente" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Nome Requerente
                    </Label>
                    <Input
                      id="nome-requerente"
                      value={filtros.nome_requerente}
                      onChange={(e) => handleFiltroChange('nome_requerente', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="Digite o nome"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="cpf" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      CPF
                    </Label>
                    <Input
                      id="cpf"
                      value={filtros.cpf}
                      onChange={(e) => handleFiltroChange('cpf', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="000.000.000-00"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="cnpj" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      CNPJ
                    </Label>
                    <Input
                      id="cnpj"
                      value={filtros.cnpj}
                      onChange={(e) => handleFiltroChange('cnpj', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="00.000.000/0000-00"
                    />
                  </div>
                </div>

                {/* Botões de Ação */}
                <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 pt-8">
                  <Button 
                    type="button"
                    onClick={handleBuscar}
                    disabled={loading}
                    className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 disabled:opacity-50"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Buscando...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                          </svg>
                          <span>Buscar Processos</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                  
                  <Button 
                    type="button"
                    onClick={handleLimpar}
                    className="group relative bg-gradient-to-r from-slate-500 to-slate-600 hover:from-slate-600 hover:to-slate-700 text-white px-10 py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                      <span>Limpar Filtros</span>
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-600 to-slate-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Resultados da Busca */}
          {processos.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Resultados da Busca
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 transform hover:shadow-2xl transition-all duration-300">
                {/* Header da Tabela */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="grid grid-cols-6 gap-4 p-6 text-sm font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Nº Documento</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Ano</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Requerente</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Assunto</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Data Abertura</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Status</span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo da Tabela */}
                <div className="divide-y divide-blue-50">
                  {processos.map((processo, index) => (
                    <div key={processo.id} className={`p-6 hover:bg-blue-50/50 transform hover:scale-[1.01] transition-all duration-200 cursor-pointer ${index % 2 === 0 ? 'bg-white' : 'bg-blue-25/30'}`}>
                      <div className="grid grid-cols-6 gap-4 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        <div className="font-semibold text-blue-900">
                          {processo.numero_documento || '-'}
                        </div>
                        <div className="text-blue-700">
                          {processo.ano || '-'}
                        </div>
                        <div className="text-blue-600">
                          {processo.requerente?.nome || '-'}
                        </div>
                        <div className="text-blue-600 truncate">
                          {processo.assunto || '-'}
                        </div>
                        <div className="text-blue-600">
                          {processo.data_abertura ? new Date(processo.data_abertura).toLocaleDateString('pt-BR') : '-'}
                        </div>
                        <div className="text-blue-500">
                          <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                            Ativo
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Estado Vazio */}
          {!loading && processos.length === 0 && (
            <div className="text-center py-16">
              <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6 transform hover:scale-110 transition-transform duration-300">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-blue-800 font-bold text-xl mb-2" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Nenhum processo encontrado
              </h3>
              <p className="text-blue-500 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Use os filtros acima para buscar processos no sistema
              </p>
            </div>
          )}

          {/* Estatísticas de Busca */}
          {processos.length > 0 && (
            <div className="space-y-8 mt-12">
              <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
                <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Estatísticas da Busca
                  <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
                </h2>
              </div>

              {/* Cards de Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Card 1 - Total Encontrados */}
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
                          Total Encontrados
                        </h3>
                        <p className="text-3xl font-black text-blue-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          {processos.length}
                        </p>
                        <p className="text-blue-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          processos
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Filtros Ativos */}
                <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                  <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 relative">
                    <div className="absolute top-0 left-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
                    
                    <div className="relative z-10 space-y-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-indigo-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          Filtros Ativos
                        </h3>
                        <p className="text-3xl font-black text-indigo-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          {Object.values(filtros).filter(value => value !== '').length}
                        </p>
                        <p className="text-indigo-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          aplicados
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Card 3 - Status da Busca */}
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
                          Status
                        </h3>
                        <p className="text-3xl font-black text-green-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          ✓
                        </p>
                        <p className="text-green-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                          busca concluída
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}
