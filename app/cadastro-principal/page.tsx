"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { toast } from "sonner"

export default function CadastroPrincipal() {
  const [loading, setLoading] = useState(false)
  const [unidades, setUnidades] = useState<any[]>([])
  const [secretarias, setSecretarias] = useState<any[]>([])
  const [setores, setSetores] = useState<any[]>([])
  const [requerentes, setRequerentes] = useState<any[]>([])

  const [formData, setFormData] = useState({
    numero_documento: '',
    tipo_documento: '',
    ano: new Date().getFullYear(),
    data_abertura: new Date().toISOString().split('T')[0],
    apenso_processo: '',
    criado_por: '',
    codigo_assunto: '',
    assunto: '',
    doc_necessario: '',
    origem: '',
    valor_rs: '',
    codigo_requerente: '',
    sumula_documento: '',
    unidade_id: '',
    secretaria_id: '',
    setor_destino_id: '',
    setor_requerente_id: '',
    local_abertura: '',
    requerente_id: ''
  })

  const [requerenteData, setRequerenteData] = useState({
    nome: '',
    cpf: '',
    cnpj: '',
    email: '',
    telefone: '',
    endereco: '',
    tipo: 'PESSOA_FISICA' as 'PESSOA_FISICA' | 'PESSOA_JURIDICA'
  })

  const [tramiteData, setTramiteData] = useState({
    setor_destino_id: '',
    observacoes: ''
  })

  useEffect(() => {
    fetchInitialData()
  }, [])

  useEffect(() => {
    if (formData.secretaria_id) {
      fetchSetoresBySecretaria(parseInt(formData.secretaria_id))
    }
  }, [formData.secretaria_id])

  const fetchInitialData = async () => {
    try {
      const [unidadesRes, secretariasRes, requerentesRes] = await Promise.all([
        api.get('/unidade'),
        api.get('/secretarias'),
        api.get('/requerentes')
      ])
      
      setUnidades(unidadesRes.data || [])
      setSecretarias(secretariasRes.data || [])
      setRequerentes(requerentesRes.data || [])
    } catch (error) {
      console.error('Erro ao carregar dados:', error)
      toast.error('Erro ao carregar dados iniciais')
    }
  }

  const fetchSetoresBySecretaria = async (secretariaId: number) => {
    try {
      const response = await api.get(`/secretarias/${secretariaId}/setores`)
      setSetores(response.data || [])
    } catch (error) {
      console.error('Erro ao carregar setores:', error)
      toast.error('Erro ao carregar setores')
    }
  }

  const createRequerente = async (data: any) => {
    const response = await api.post('/requerentes', data)
    return response.data
  }

  const createProcesso = async (data: any) => {
    const response = await api.post('/processos', data)
    return response.data
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleRequerenteChange = (field: string, value: string) => {
    setRequerenteData(prev => ({ ...prev, [field]: value }))
  }

  const handleTramiteChange = (field: string, value: string) => {
    setTramiteData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      // Criar requerente se necessário
      let requerenteId = formData.requerente_id
      if (!requerenteId && requerenteData.nome) {
        const novoRequerente = await createRequerente(requerenteData)
        requerenteId = novoRequerente.id.toString()
      }

      // Criar processo
      const processoData = {
        ...formData,
        requerente_id: requerenteId ? parseInt(requerenteId) : undefined,
        unidade_id: formData.unidade_id ? parseInt(formData.unidade_id) : undefined,
        secretaria_id: formData.secretaria_id ? parseInt(formData.secretaria_id) : undefined,
        setor_destino_id: formData.setor_destino_id ? parseInt(formData.setor_destino_id) : undefined,
        setor_requerente_id: formData.setor_requerente_id ? parseInt(formData.setor_requerente_id) : undefined,
        valor_rs: formData.valor_rs ? parseFloat(formData.valor_rs) : undefined,
        ano: parseInt(formData.ano.toString())
      }

      const novoProcesso = await createProcesso(processoData)
      
      toast.success('Processo criado com sucesso!')
      
      // Limpar formulário
      setFormData({
        numero_documento: '',
        tipo_documento: '',
        ano: new Date().getFullYear(),
        data_abertura: new Date().toISOString().split('T')[0],
        apenso_processo: '',
        criado_por: '',
        codigo_assunto: '',
        assunto: '',
        doc_necessario: '',
        origem: '',
        valor_rs: '',
        codigo_requerente: '',
        sumula_documento: '',
        unidade_id: '',
        secretaria_id: '',
        setor_destino_id: '',
        setor_requerente_id: '',
        local_abertura: '',
        requerente_id: ''
      })
      
      setRequerenteData({
        nome: '',
        cpf: '',
        cnpj: '',
        email: '',
        telefone: '',
        endereco: '',
        tipo: 'PESSOA_FISICA'
      })

    } catch (error: any) {
      toast.error(error.message || 'Erro ao criar processo')
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
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </div>
              <div className="flex-1">
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-2 tracking-tight" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Cadastro Principal
                </h1>
                <p className="text-blue-100 text-lg lg:text-xl font-medium opacity-90" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                  Sistema completo para criação e gestão de processos
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulário Moderno */}
        <div className="bg-white/80 backdrop-blur-md rounded-3xl border border-white/40 shadow-2xl p-8 lg:p-12 transform hover:shadow-3xl transition-all duration-500">
          
          <form className="space-y-12" onSubmit={handleSubmit}>
            {/* Seção 1: Dados Básicos */}
            <div className="space-y-8">
              <h2 className="text-3xl font-bold text-blue-900 mb-8 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Dados Básicos do Processo
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group space-y-2">
                  <Label htmlFor="unidade" className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Unidade
                  </Label>
                  <Select value={formData.unidade_id} onValueChange={(value) => handleInputChange('unidade_id', value)}>
                    <SelectTrigger className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      <SelectValue placeholder="Selecione a unidade" className="text-blue-700" />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl border-blue-200 shadow-xl">
                      {unidades.map((unidade) => (
                        <SelectItem key={unidade.id} value={unidade.id.toString()} className="hover:bg-blue-50 transition-colors">
                          {unidade.nome}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="tipo-documento" className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Tipo de Documento
                  </Label>
                  <Input
                    id="tipo-documento"
                    value={formData.tipo_documento}
                    onChange={(e) => handleInputChange('tipo_documento', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="numero-documento" className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Nº do Documento
                  </Label>
                  <Input
                    id="numero-documento"
                    value={formData.numero_documento}
                    onChange={(e) => handleInputChange('numero_documento', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="ano" className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Ano
                  </Label>
                  <Input
                    id="ano"
                    type="number"
                    value={formData.ano}
                    onChange={(e) => handleInputChange('ano', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group space-y-2">
                  <Label htmlFor="data-abertura" className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Data de Abertura
                  </Label>
                  <Input
                    id="data-abertura"
                    type="date"
                    value={formData.data_abertura}
                    onChange={(e) => handleInputChange('data_abertura', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="apenso-processo" className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Apenso do Processo
                  </Label>
                  <Input
                    id="apenso-processo"
                    value={formData.apenso_processo}
                    onChange={(e) => handleInputChange('apenso_processo', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="criado-por" className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Criado Por
                  </Label>
                  <Input
                    id="criado-por"
                    value={formData.criado_por}
                    onChange={(e) => handleInputChange('criado_por', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="codigo-assunto" className="text-sm font-semibold text-blue-800 group-hover:text-blue-900 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Código do Assunto
                  </Label>
                  <Input
                    id="codigo-assunto"
                    value={formData.codigo_assunto}
                    onChange={(e) => handleInputChange('codigo_assunto', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>
              </div>
            </div>

            {/* Seção 2: Detalhes do Processo */}
            <div className="space-y-8">
              <h2 className="text-2xl font-bold text-blue-800 mb-6 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Detalhes e Informações
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-blue-300 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="group space-y-2">
                  <Label htmlFor="assunto" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Assunto
                  </Label>
                  <Input
                    id="assunto"
                    value={formData.assunto}
                    onChange={(e) => handleInputChange('assunto', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="doc-necessario" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Doc. Necessário
                  </Label>
                  <Input
                    id="doc-necessario"
                    value={formData.doc_necessario}
                    onChange={(e) => handleInputChange('doc_necessario', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="origem" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Origem
                  </Label>
                  <Input
                    id="origem"
                    value={formData.origem}
                    onChange={(e) => handleInputChange('origem', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>

                <div className="group space-y-2">
                  <Label htmlFor="valor" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                    Valor R$
                  </Label>
                  <Input
                    id="valor"
                    type="number"
                    step="0.01"
                    value={formData.valor_rs}
                    onChange={(e) => handleInputChange('valor_rs', e.target.value)}
                    className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  />
                </div>
              </div>
            </div>

            {/* Seção 3: Primeira Tramitação */}
            <div className="bg-gradient-to-br from-blue-50/50 to-indigo-50/50 rounded-2xl p-8 border border-blue-100/50 shadow-inner">
              <h2 className="text-2xl font-bold text-blue-800 mb-8 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Dados para Primeira Tramitação
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="group space-y-2">
                    <Label htmlFor="secretaria" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Secretaria
                    </Label>
                    <Select value={formData.secretaria_id} onValueChange={(value) => handleInputChange('secretaria_id', value)}>
                      <SelectTrigger className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        <SelectValue placeholder="Selecione a secretaria" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-blue-200 shadow-xl">
                        {secretarias.map((secretaria) => (
                          <SelectItem key={secretaria.id} value={secretaria.id.toString()} className="hover:bg-blue-50 transition-colors">
                            {secretaria.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="group space-y-2">
                    <Label htmlFor="setor-destino" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Setor de Destino
                    </Label>
                    <Select value={formData.setor_destino_id} onValueChange={(value) => handleInputChange('setor_destino_id', value)}>
                      <SelectTrigger className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        <SelectValue placeholder="Selecione o setor" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-blue-200 shadow-xl">
                        {setores.map((setor) => (
                          <SelectItem key={setor.id} value={setor.id.toString()} className="hover:bg-blue-50 transition-colors">
                            {setor.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="group space-y-2">
                    <Label htmlFor="local-abertura" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Local de Abertura
                    </Label>
                    <Input
                      id="local-abertura"
                      value={formData.local_abertura}
                      onChange={(e) => handleInputChange('local_abertura', e.target.value)}
                      className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="group space-y-2">
                    <Label htmlFor="requerente" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Requerente
                    </Label>
                    <Select value={formData.requerente_id} onValueChange={(value) => handleInputChange('requerente_id', value)}>
                      <SelectTrigger className="h-12 border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                        <SelectValue placeholder="Selecione o requerente" />
                      </SelectTrigger>
                      <SelectContent className="rounded-xl border-blue-200 shadow-xl">
                        {requerentes.map((requerente) => (
                          <SelectItem key={requerente.id} value={requerente.id.toString()} className="hover:bg-blue-50 transition-colors">
                            {requerente.nome}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="group space-y-2">
                    <Label htmlFor="sumula-documento" className="text-sm font-semibold text-blue-700 group-hover:text-blue-800 transition-colors" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                      Súmula do Documento
                    </Label>
                    <Textarea
                      id="sumula-documento"
                      rows={4}
                      value={formData.sumula_documento}
                      onChange={(e) => handleInputChange('sumula_documento', e.target.value)}
                      className="border-2 border-blue-200 rounded-xl focus:border-blue-500 focus:ring-blue-500/20 bg-white/70 backdrop-blur-sm hover:bg-white/90 hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-300 resize-none"
                      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                      placeholder="Descreva brevemente o conteúdo do documento..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Botões de Ação Principais */}
            <div className="flex flex-col lg:flex-row gap-4 lg:justify-end">
              <Button 
                type="submit"
                disabled={loading}
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-10 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0 disabled:opacity-50"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processando...</span>
                    </>
                  ) : (
                    <>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      <span>Criar Processo</span>
                    </>
                  )}
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>

              <Button 
                type="button"
                className="group relative bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white px-10 py-4 font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border-0"
                style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
              >
                <span className="relative z-10 flex items-center space-x-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span>Processo em Série</span>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 to-indigo-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Button>
            </div>

            {/* Seção de Relatórios e Documentos */}
            <div className="bg-gradient-to-br from-slate-50/50 to-blue-50/50 rounded-2xl p-8 border border-slate-200/50 shadow-inner">
              <h3 className="text-xl font-bold text-blue-700 mb-6 relative inline-block" style={{ fontFamily: 'Inter, system-ui, sans-serif' }}>
                Documentos e Relatórios
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-slate-400 rounded-full transform origin-left hover:scale-x-110 transition-transform duration-300"></div>
              </h3>

              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
                {[
                  { icon: "🏷️", text: "Etiqueta Protocolo" },
                  { icon: "🌐", text: "Etiqueta Internet" },
                  { icon: "📋", text: "Guia Trâmite" },
                  { icon: "📄", text: "Comprovante Abertura" },
                  { icon: "👤", text: "Comprovante Requerente" },
                  { icon: "📁", text: "Capa Abertura" }
                ].map((item, index) => (
                  <Button 
                    key={index}
                    type="button"
                    className="group bg-white/70 hover:bg-white border-2 border-blue-200 hover:border-blue-400 text-blue-700 hover:text-blue-800 p-4 rounded-xl shadow-sm hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
                    style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <span className="text-2xl group-hover:scale-110 transition-transform duration-300">{item.icon}</span>
                      <span className="text-xs font-medium text-center leading-tight">{item.text}</span>
                    </div>
                  </Button>
                ))}
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
