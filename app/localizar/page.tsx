"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Search } from "lucide-react"
import { api } from "@/lib/api"

// Interfaces
interface Processo {
  id: number
  numero_documento: string
  tipo_documento: string
  ano: number
  data_abertura: string
  assunto?: string
  valor_rs?: number
  origem?: string
  sumula_documento?: string
  unidade_id?: number
  requerente_id?: number
  secretaria_id?: number
  setor_destino_id?: number
}

interface FiltrosBusca {
  unidade_id?: number
  tipo_documento?: string
  numero_documento?: string
  ano?: number
  assunto?: string
  valor_rs?: number
  data_abertura?: string
  requerente_id?: number
  origem?: string
  sumula_documento?: string
}

export default function Localizar() {
  const [filtros, setFiltros] = useState<FiltrosBusca>({})
  const [processos, setProcessos] = useState<Processo[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [buscaRealizada, setBuscaRealizada] = useState(false)

  // Função para atualizar filtros
  const handleInputChange = (field: keyof FiltrosBusca, value: string) => {
    setFiltros(prev => ({
      ...prev,
      [field]: value || undefined
    }))
  }

  // API para buscar processos
  const processosApi = {
    buscar: async (filtros: FiltrosBusca): Promise<Processo[]> => {
      const response = await api.get("/processos")
      let processos = response.data

      // Aplicar filtros localmente (você pode implementar filtros na API também)
      if (filtros.unidade_id) {
        processos = processos.filter((p: Processo) => p.unidade_id === filtros.unidade_id)
      }
      if (filtros.tipo_documento) {
        processos = processos.filter((p: Processo) => 
          p.tipo_documento?.toLowerCase().includes(filtros.tipo_documento!.toLowerCase())
        )
      }
      if (filtros.numero_documento) {
        processos = processos.filter((p: Processo) => 
          p.numero_documento?.toLowerCase().includes(filtros.numero_documento!.toLowerCase())
        )
      }
      if (filtros.ano) {
        processos = processos.filter((p: Processo) => p.ano === filtros.ano)
      }
      if (filtros.assunto) {
        processos = processos.filter((p: Processo) => 
          p.assunto?.toLowerCase().includes(filtros.assunto!.toLowerCase())
        )
      }
      if (filtros.valor_rs) {
        processos = processos.filter((p: Processo) => p.valor_rs === filtros.valor_rs)
      }
      if (filtros.data_abertura) {
        processos = processos.filter((p: Processo) => p.data_abertura === filtros.data_abertura)
      }
      if (filtros.origem) {
        processos = processos.filter((p: Processo) => 
          p.origem?.toLowerCase().includes(filtros.origem!.toLowerCase())
        )
      }
      if (filtros.sumula_documento) {
        processos = processos.filter((p: Processo) => 
          p.sumula_documento?.toLowerCase().includes(filtros.sumula_documento!.toLowerCase())
        )
      }

      return processos
    }
  }

  // Função de busca
  const handleBuscar = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const resultados = await processosApi.buscar(filtros)
      setProcessos(resultados)
      setBuscaRealizada(true)
      
    } catch (err: any) {
      console.error("Erro ao buscar processos:", err)
      setError("Erro ao buscar processos. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Limpar filtros
  const handleLimpar = () => {
    setFiltros({})
    setProcessos([])
    setBuscaRealizada(false)
    setError(null)
  }
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="from-sky-600 to-blue-600 bg-gradient-to-r rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Search className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Formulário de Localização */}
        <div className="bg-[#eaf6ff80]  rounded-xl border border-slate-200 p-8 shadow-md">
          <h2 className="text-3xl font-bold text-sky-700 border-sky-700 mb-8 border-b-4 pb-2 inline-block">
            Localizar
          </h2>

          <form onSubmit={(e) => { e.preventDefault(); handleBuscar(); }}>
            {/* Primeira linha */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="unidade" className="text-sm font-semibold text-black">
                  Unidade
                </Label>
                <Input
                  id="unidade"
                  type="number"
                  value={filtros.unidade_id?.toString() || ""}
                  onChange={(e) => handleInputChange('unidade_id', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="ID da unidade"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo" className="text-sm font-semibold text-black">
                  Tipo
                </Label>
                <Input
                  id="tipo"
                  value={filtros.tipo_documento || ""}
                  onChange={(e) => handleInputChange('tipo_documento', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Tipo do documento"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processo" className="text-sm font-semibold text-black">
                  Processo
                </Label>
                <Input
                  id="processo"
                  value={filtros.numero_documento || ""}
                  onChange={(e) => handleInputChange('numero_documento', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Número do processo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ano" className="text-sm font-semibold text-black">
                  Ano
                </Label>
                <Input
                  id="ano"
                  type="number"
                  value={filtros.ano?.toString() || ""}
                  onChange={(e) => handleInputChange('ano', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Ano do processo"
                />
              </div>
            </div>

            {/* Segunda linha */}
            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="grau" className="text-sm font-semibold text-black">
                  Grau
                </Label>
                <Input
                  id="grau"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Campo não mapeado"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assunto" className="text-sm font-semibold text-black">
                  Assunto
                </Label>
                <Input
                  id="assunto"
                  value={filtros.assunto || ""}
                  onChange={(e) => handleInputChange('assunto', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Assunto do processo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor" className="text-sm font-semibold text-black">
                  Valor
                </Label>
                <Input
                  id="valor"
                  type="number"
                  step="0.01"
                  value={filtros.valor_rs?.toString() || ""}
                  onChange={(e) => handleInputChange('valor_rs', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Valor em R$"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-abertura" className="text-sm font-semibold text-black">
                  Data Abertura
                </Label>
                <Input
                  id="data-abertura"
                  type="date"
                  value={filtros.data_abertura || ""}
                  onChange={(e) => handleInputChange('data_abertura', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
            </div>

            {/* Terceira linha */}
            <div className="grid grid-cols-4 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="requerente" className="text-sm font-semibold text-black">
                  Requerente
                </Label>
                <Input
                  id="requerente"
                  type="number"
                  value={filtros.requerente_id?.toString() || ""}
                  onChange={(e) => handleInputChange('requerente_id', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="ID do requerente"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome-setor" className="text-sm font-semibold text-black">
                  Nome do Setor
                </Label>
                <Input
                  id="nome-setor"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Campo não mapeado"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-sm font-semibold text-black">
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Campo não mapeado"
                  disabled
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm font-semibold text-black">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Campo não mapeado"
                  disabled
                />
              </div>
            </div>

            {/* Quarta linha */}
            <div className="grid grid-cols-3 gap-6 mt-6">
              <div className="space-y-2">
                <Label htmlFor="origem" className="text-sm font-semibold text-black">
                  Origem
                </Label>
                <Input
                  id="origem"
                  value={filtros.origem || ""}
                  onChange={(e) => handleInputChange('origem', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Origem do processo"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sumula-processo" className="text-sm font-semibold text-black">
                  Sumula do Processo
                </Label>
                <Input
                  id="sumula-processo"
                  value={filtros.sumula_documento || ""}
                  onChange={(e) => handleInputChange('sumula_documento', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Súmula do documento"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero-documento" className="text-sm font-semibold text-black">
                  Número do Documento
                </Label>
                <Input
                  id="numero-documento"
                  value={filtros.numero_documento || ""}
                  onChange={(e) => handleInputChange('numero_documento', e.target.value)}
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  placeholder="Número do documento"
                />
              </div>
            </div>

            {/* Botões */}
            <div className="flex justify-end gap-4 mt-8">
              <Button 
                type="button"
                onClick={handleLimpar}
                variant="outline"
                className="border-blue-400 text-blue-700 hover:bg-blue-50"
              >
                Limpar
              </Button>
              <Button 
                type="submit"
                disabled={loading}
                className="bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50"
              >
                {loading ? "Buscando..." : "Buscar"}
              </Button>
            </div>
          </form>

          {/* Mensagens */}
          {error && (
            <div className="mt-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}

          {/* Resultados */}
          {buscaRealizada && (
            <div className="mt-8">
              <h3 className="text-xl font-bold text-sky-700 mb-4">
                Resultados da Busca ({processos.length} encontrado(s))
              </h3>
              
              {processos.length > 0 ? (
                <div className="bg-white rounded-lg border border-slate-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-sky-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-sky-900 uppercase tracking-wider">
                            ID
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-sky-900 uppercase tracking-wider">
                            Número
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-sky-900 uppercase tracking-wider">
                            Tipo
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-sky-900 uppercase tracking-wider">
                            Ano
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-sky-900 uppercase tracking-wider">
                            Data Abertura
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-sky-900 uppercase tracking-wider">
                            Assunto
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-sky-900 uppercase tracking-wider">
                            Valor
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {processos.map((processo) => (
                          <tr key={processo.id} className="hover:bg-gray-50">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {processo.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {processo.numero_documento}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {processo.tipo_documento}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {processo.ano}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {new Date(processo.data_abertura).toLocaleDateString('pt-BR')}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {processo.assunto || '-'}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {processo.valor_rs ? `R$ ${processo.valor_rs.toFixed(2)}` : '-'}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ) : (
                <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
                  <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-500">Nenhum processo encontrado com os critérios especificados.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

