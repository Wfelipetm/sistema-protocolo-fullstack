"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FileX, Plus, Search } from "lucide-react"
import { api } from "@/lib/api"

// Interfaces
interface Processo {
  id: number
  numero_documento: string
  tipo_documento: string
  ano: number
  data_abertura: string
  apenso_processo?: string
  assunto?: string
  unidade_id?: number
}

interface ApensoForm {
  processo_principal_id: number | undefined
  processo_apenso_id: number | undefined
}

export default function Apensos() {
  const [processos, setProcessos] = useState<Processo[]>([])
  const [processosComApenso, setProcessosComApenso] = useState<Processo[]>([])
  const [formData, setFormData] = useState<ApensoForm>({
    processo_principal_id: undefined,
    processo_apenso_id: undefined
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [busca, setBusca] = useState("")

  // Função para atualizar formulário
  const handleInputChange = (field: keyof ApensoForm, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value ? parseInt(value) : undefined
    }))
  }

  // API para processos
  const processosApi = {
    listarTodos: async (): Promise<Processo[]> => {
      const response = await api.get("/processos")
      return response.data
    },
    buscarPorId: async (id: number): Promise<Processo> => {
      const response = await api.get(`/processos/${id}`)
      return response.data
    },
    atualizarApenso: async (id: number, apenso_processo: string) => {
      const processo = await processosApi.buscarPorId(id)
      const response = await api.put(`/processos/${id}`, {
        ...processo,
        apenso_processo
      })
      return response.data
    }
  }

  // Carregar processos
  useEffect(() => {
    const carregarProcessos = async () => {
      try {
        const dados = await processosApi.listarTodos()
        setProcessos(dados)
        
        // Filtrar processos que têm apensos
        const comApenso = dados.filter(p => p.apenso_processo && p.apenso_processo.trim() !== "")
        setProcessosComApenso(comApenso)
      } catch (err) {
        console.error("Erro ao carregar processos:", err)
        setError("Erro ao carregar processos")
      }
    }

    carregarProcessos()
  }, [])

  // Função para criar apenso
  const handleCriarApenso = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      if (!formData.processo_principal_id || !formData.processo_apenso_id) {
        setError("Selecione tanto o processo principal quanto o processo a ser apensado")
        return
      }

      if (formData.processo_principal_id === formData.processo_apenso_id) {
        setError("Um processo não pode ser apensado a si mesmo")
        return
      }

      // Buscar dados do processo apenso
      const processoApenso = await processosApi.buscarPorId(formData.processo_apenso_id)
      
      // Atualizar processo principal com referência ao apenso
      await processosApi.atualizarApenso(
        formData.processo_principal_id,
        processoApenso.numero_documento
      )

      setSuccess("Apenso criado com sucesso!")
      
      // Recarregar dados
      const dados = await processosApi.listarTodos()
      setProcessos(dados)
      const comApenso = dados.filter(p => p.apenso_processo && p.apenso_processo.trim() !== "")
      setProcessosComApenso(comApenso)
      
      // Limpar formulário
      setFormData({
        processo_principal_id: undefined,
        processo_apenso_id: undefined
      })
      
    } catch (err: any) {
      console.error("Erro ao criar apenso:", err)
      setError("Erro ao criar apenso. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }

  // Filtrar processos com apenso pela busca
  const processosFiltrados = processosComApenso.filter(processo =>
    processo.numero_documento.toLowerCase().includes(busca.toLowerCase()) ||
    processo.assunto?.toLowerCase().includes(busca.toLowerCase()) ||
    processo.apenso_processo?.toLowerCase().includes(busca.toLowerCase())
  )
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="from-sky-600 to-blue-600 bg-gradient-to-r rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FileX className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-[#eaf6ff80] rounded-xl border border-slate-200 p-8 shadow-md">
          <h2 className="text-3xl font-bold text-sky-700 mb-8 border-b-4 border-sky-700 pb-2 inline-block">
            Apensos
          </h2>

          {/* Mensagens */}
          {error && (
            <div className="mb-6 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-6 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          {/* Formulário para criar apenso */}
          <div className="bg-white rounded-xl border border-slate-200 p-6 mb-8 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Plus className="w-5 h-5 text-sky-600" />
              <h3 className="text-lg font-semibold text-sky-700">Criar Novo Apenso</h3>
            </div>
            
            <form onSubmit={handleCriarApenso}>
              <div className="grid grid-cols-2 gap-6 mb-4">
                <div className="space-y-2">
                  <Label htmlFor="processo-principal" className="text-sm font-semibold text-black">
                    ID do Processo Principal *
                  </Label>
                  <Input
                    id="processo-principal"
                    type="number"
                    value={formData.processo_principal_id?.toString() || ""}
                    onChange={(e) => handleInputChange('processo_principal_id', e.target.value)}
                    className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                    placeholder="Digite o ID do processo principal"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processo-apenso" className="text-sm font-semibold text-black">
                    ID do Processo a ser Apensado *
                  </Label>
                  <Input
                    id="processo-apenso"
                    type="number"
                    value={formData.processo_apenso_id?.toString() || ""}
                    onChange={(e) => handleInputChange('processo_apenso_id', e.target.value)}
                    className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                    placeholder="Digite o ID do processo a ser apensado"
                  />
                </div>
              </div>
              
              <div className="flex justify-end">
                <Button 
                  type="submit"
                  disabled={loading}
                  className="bg-sky-600 hover:bg-sky-700 text-white disabled:opacity-50"
                >
                  {loading ? "Criando..." : "Criar Apenso"}
                </Button>
              </div>
            </form>
          </div>

          {/* Lista de processos com apensos */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
            <div className="bg-sky-50 p-4 border-b border-slate-200">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-sky-700">
                  Processos com Apensos ({processosComApenso.length})
                </h3>
                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Buscar por número, assunto ou apenso..."
                    value={busca}
                    onChange={(e) => setBusca(e.target.value)}
                    className="w-64 border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  />
                </div>
              </div>
            </div>

            {processosFiltrados.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Processo Principal
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Tipo
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ano
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Apenso
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assunto
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Data Abertura
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {processosFiltrados.map((processo) => (
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
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            {processo.apenso_processo}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                          {processo.assunto || '-'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(processo.data_abertura).toLocaleDateString('pt-BR')}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 text-center">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <FileX className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-600 mb-2">
                  {busca ? "Nenhum processo encontrado" : "Nenhum processo com apenso encontrado"}
                </p>
                <p className="text-sm text-gray-500">
                  {busca ? "Tente ajustar os termos de busca" : "Crie apensos usando o formulário acima"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

