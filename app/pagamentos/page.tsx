"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"
import { toast } from "sonner"

export default function Pagamentos() {
  const [pagamentos, setPagamentos] = useState<any[]>([])
  const [processos, setProcessos] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    processo_principal_id: '',
    numero_processo_pagamento: '',
    ano_pagamento: new Date().getFullYear(),
    valor: '',
    data_pagamento: new Date().toISOString().split('T')[0],
    identificador: ''
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  const fetchInitialData = async () => {
    try {
      setLoading(true)
      const [pagamentosRes, processosRes] = await Promise.all([
        api.get('/pagamentos'),
        api.get('/processos')
      ])
      
      setPagamentos(pagamentosRes.data || [])
      setProcessos(processosRes.data || [])
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error)
      setError(error.response?.data?.message || 'Erro ao carregar dados')
    } finally {
      setLoading(false)
    }
  }

  const createPagamento = async (data: any) => {
    const response = await api.post('/pagamentos', data)
    await fetchInitialData() // Recarregar dados após criar
    return response.data
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const pagamentoData = {
        ...formData,
        processo_principal_id: formData.processo_principal_id ? parseInt(formData.processo_principal_id) : undefined,
        ano_pagamento: parseInt(formData.ano_pagamento.toString()),
        valor: parseFloat(formData.valor)
      }

      await createPagamento(pagamentoData)
      
      toast.success('Pagamento registrado com sucesso!')
      
      // Limpar formulário
      setFormData({
        processo_principal_id: '',
        numero_processo_pagamento: '',
        ano_pagamento: new Date().getFullYear(),
        valor: '',
        data_pagamento: new Date().toISOString().split('T')[0],
        identificador: ''
      })

    } catch (error: any) {
      toast.error(error.message || 'Erro ao registrar pagamento')
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
                  <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V17C3 18.1 3.9 19 5 19H11V21C11 21.6 11.4 22 12 22S13 21.6 13 21V19H19C20.1 19 21 18.1 21 17V9ZM16 13C16 14.1 15.1 15 14 15S12 14.1 12 13 12.9 11 14 11 16 11.9 16 13Z" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Controle de Pagamentos
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl font-medium opacity-90" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Gerencie processos de pagamento e registros financeiros
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Container Principal */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 lg:p-12 transform hover:shadow-3xl transition-all duration-500">
          
          {/* Seção Formulário */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-8 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
              Registro de Pagamentos
              <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
            </h2>

            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 transform hover:shadow-2xl transition-all duration-300">
              {/* Header do Formulário */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <h3 className="text-xl font-bold flex items-center space-x-3" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Processo Outros (Pagamentos)</span>
                </h3>
              </div>

              {/* Formulário */}
              <form onSubmit={handleSubmit} className="p-8 space-y-8">
                {/* Primeira linha */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-3 group">
                    <Label htmlFor="processo-principal" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Nº Processo e Ano (Principal)
                    </Label>
                    <Input
                      id="processo-principal"
                      value={formData.processo_principal_id}
                      onChange={(e) => handleInputChange('processo_principal_id', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="Digite o número do processo"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="processo-pagamento" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Nº Processo e Ano (Pagamento)
                    </Label>
                    <Input
                      id="processo-pagamento"
                      value={formData.numero_processo_pagamento}
                      onChange={(e) => handleInputChange('numero_processo_pagamento', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="Digite o número do pagamento"
                    />
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="valor" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Valor (R$)
                    </Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      value={formData.valor}
                      onChange={(e) => handleInputChange('valor', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="0,00"
                    />
                  </div>
                </div>

                {/* Segunda linha */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3 group">
                    <Label htmlFor="data-pagamento" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Data de Pagamento
                    </Label>
                    <Input
                      id="data-pagamento"
                      type="date"
                      value={formData.data_pagamento}
                      onChange={(e) => handleInputChange('data_pagamento', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    />
                  </div>
                  <div className="space-y-3 group">
                    <Label htmlFor="identificador" className="text-sm font-bold text-blue-900 group-hover:text-blue-700 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Identificador
                    </Label>
                    <Input
                      id="identificador"
                      value={formData.identificador}
                      onChange={(e) => handleInputChange('identificador', e.target.value)}
                      className="border-2 border-blue-200 focus:border-blue-500 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-blue-800 font-medium transition-all duration-300 hover:border-blue-300 transform hover:scale-[1.02]"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="Digite o identificador"
                    />
                  </div>
                </div>

                {/* Botão de Submit */}
                <div className="flex justify-end pt-6">
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <span className="relative z-10 flex items-center space-x-2">
                      {loading ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                          <span>Cadastrando...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          <span>Cadastrar Pagamento</span>
                        </>
                      )}
                    </span>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Button>
                </div>
              </form>
            </div>
          </div>

          {/* Lista de Pagamentos */}
          {pagamentos.length > 0 && (
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Pagamentos Registrados
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>

              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-blue-100/50 transform hover:shadow-2xl transition-all duration-300">
                {/* Header da Tabela */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
                  <div className="grid grid-cols-5 gap-4 p-6 text-sm font-semibold" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Processo Principal</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Nº Pagamento</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Valor</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Data</span>
                    </div>
                    <div className="flex items-center space-x-2 hover:text-blue-200 transition-colors cursor-pointer">
                      <span>Identificador</span>
                    </div>
                  </div>
                </div>

                {/* Conteúdo da Tabela */}
                <div className="divide-y divide-blue-50">
                  {pagamentos.map((pagamento, index) => (
                    <div key={pagamento.id} className={`p-6 hover:bg-blue-50/50 transform hover:scale-[1.01] transition-all duration-200 ${index % 2 === 0 ? 'bg-white' : 'bg-blue-25/30'}`}>
                      <div className="grid grid-cols-5 gap-4 text-sm" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        <div className="font-semibold text-blue-900">
                          {pagamento.processo?.numero_documento || '-'}
                        </div>
                        <div className="text-blue-700">
                          {pagamento.numero_processo_pagamento || '-'}
                        </div>
                        <div className="text-blue-600 font-bold">
                          R$ {pagamento.valor.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </div>
                        <div className="text-blue-600">
                          {new Date(pagamento.data_pagamento).toLocaleDateString('pt-BR')}
                        </div>
                        <div className="text-blue-500">
                          {pagamento.identificador || '-'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Seção de Estatísticas */}
          <div className="space-y-8 mt-12">
            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center space-y-4 lg:space-y-0">
              <h2 className="text-3xl font-bold text-blue-900 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Resumo Financeiro
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>
            </div>

            {/* Cards de Estatísticas */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Card 1 - Total de Pagamentos */}
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
                        Total de Pagamentos
                      </h3>
                      <p className="text-3xl font-black text-blue-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        {pagamentos.length}
                      </p>
                      <p className="text-blue-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        registros
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 2 - Valor Total */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 relative">
                  <div className="absolute top-0 left-0 w-32 h-32 bg-green-200/20 rounded-full blur-2xl transform -translate-x-16 -translate-y-16"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-green-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Valor Total
                      </h3>
                      <p className="text-3xl font-black text-green-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        R$ {pagamentos.reduce((total, p) => total + p.valor, 0).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                      </p>
                      <p className="text-green-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        em pagamentos
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card 3 - Média */}
              <div className="group bg-white rounded-2xl border border-blue-100/50 shadow-xl hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-500 overflow-hidden">
                <div className="bg-gradient-to-br from-indigo-50 to-purple-50 p-8 relative">
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-indigo-200/20 rounded-full blur-2xl transform translate-x-16 translate-y-16"></div>
                  
                  <div className="relative z-10 space-y-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                      <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-indigo-800 font-bold text-lg mb-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        Valor Médio
                      </h3>
                      <p className="text-3xl font-black text-indigo-900" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        R$ {pagamentos.length > 0 ? (pagamentos.reduce((total, p) => total + p.valor, 0) / pagamentos.length).toLocaleString('pt-BR', { minimumFractionDigits: 2 }) : '0,00'}
                      </p>
                      <p className="text-indigo-600 text-sm mt-1" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        por pagamento
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
