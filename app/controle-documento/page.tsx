"use client"

import { useEffect, useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { api } from "@/lib/api"
import { DocumentoControle } from "@/types"
import { FileCheck } from "lucide-react" // Adiciona o ícone FileCheck

// Tipos para formulários de DocumentoControle
interface DocumentoControleForm {
  processo_id: number
  enviado_por?: string
  data_envio?: string
  docs_guia?: string
  numero_guia?: string
  apensos?: string
}

// Tipo para Processo
interface Processo {
  id: number
  numero_documento: string
  tipo_documento: string
  ano: number
  data_abertura: string
  apenso_processo?: string
  criado_por?: string
  codigo_assunto?: string
  assunto?: string
  doc_necessario?: string
  origem?: string
  valor_rs?: number
  codigo_requerente?: string
  sumula_documento?: string
  unidade_id?: number
  requerente_id?: number
  secretaria_id?: number
  setor_destino_id?: number
  setor_requerente_id?: number
  local_abertura?: string
  created_at: string
  updated_at: string
}

export default function ControleDocumento() {
  const [documentos, setDocumentos] = useState<DocumentoControle[]>([])
  const [processos, setProcessos] = useState<Processo[]>([])
  const [processosFiltrados, setProcessosFiltrados] = useState<Processo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroProcesso, setFiltroProcesso] = useState("")

  // Funções da API para documentos de controle
  const documentosControleApi = {
    listarTodos: async (): Promise<DocumentoControle[]> => {
      const response = await api.get("/documentos-controle")
      return response.data
    },

    buscarPorId: async (id: number): Promise<DocumentoControle> => {
      const response = await api.get(`/documentos-controle/${id}`)
      return response.data
    },

    criar: async (documento: DocumentoControleForm): Promise<DocumentoControle> => {
      const response = await api.post("/documentos-controle", documento)
      return response.data
    },

    atualizar: async (id: number, documento: DocumentoControleForm): Promise<DocumentoControle> => {
      const response = await api.put(`/documentos-controle/${id}`, documento)
      return response.data
    },

    remover: async (id: number): Promise<void> => {
      await api.delete(`/documentos-controle/${id}`)
    }
  }

  // Funções da API para processos
  const processosApi = {
    listarTodos: async (): Promise<Processo[]> => {
      const response = await api.get("/processos")
      return response.data
    }
  }

  // Carregar documentos e processos ao montar o componente
  useEffect(() => {
    carregarDados()
  }, [])

  // Filtrar processos quando o filtro mudar
  useEffect(() => {
    if (!filtroProcesso) {
      setProcessosFiltrados(processos)
    } else {
      // Buscar processos que correspondem ao filtro
      const processosEncontrados = processos.filter(processo => {
        // Verificar se o numero_documento não está vazio
        const matchNumero = processo.numero_documento && 
          processo.numero_documento.toLowerCase().includes(filtroProcesso.toLowerCase())
        const matchId = processo.id.toString().includes(filtroProcesso)
        
        return matchNumero || matchId
      })
      
      setProcessosFiltrados(processosEncontrados)
    }
  }, [processos, filtroProcesso])

  const carregarDados = async () => {
    try {
      setLoading(true)
      setError(null)
      
      // Carregar documentos e processos em paralelo
      const [dadosDocumentos, dadosProcessos] = await Promise.all([
        documentosControleApi.listarTodos().catch(err => {
          console.error('Erro ao carregar documentos:', err)
          return []
        }),
        processosApi.listarTodos().catch(err => {
          console.error('Erro ao carregar processos:', err)
          return []
        })
      ])
      
      setDocumentos(dadosDocumentos)
      setProcessos(dadosProcessos)
      setProcessosFiltrados(dadosProcessos)
    } catch (err) {
      console.error("Erro ao carregar dados:", err)
      setError("Erro ao carregar dados")
    } finally {
      setLoading(false)
    }
  }

  const carregarDocumentos = async () => {
    try {
      setLoading(true)
      setError(null)
      const dados = await documentosControleApi.listarTodos()
      setDocumentos(dados)
    } catch (err) {
      console.error("Erro ao carregar documentos:", err)
      setError("Erro ao carregar documentos")
    } finally {
      setLoading(false)
    }
  }

  const handleArquivar = async (id: number) => {
    try {
      await documentosControleApi.remover(id)
      // Recarregar apenas os documentos após arquivar
      await carregarDocumentos()
    } catch (err) {
      console.error("Erro ao arquivar documento:", err)
      setError("Erro ao arquivar documento")
    }
  }

  return (
    <Layout>
      <div className="space-y-3">
        {/* Header */}
        <div className="from-sky-600 to-blue-600 bg-gradient-to-r rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FileCheck className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Controle de Documentos */}
        <div className="bg-[#eaf6ff80] rounded-xl border p-6 shadow-sm">
            <h2
            className="text-3xl font-bold text-sky-700 mb-4 pb-2 inline-block border-b-4"
            style={{
              borderImage: "linear-gradient(to right, #0287c7, #0287c7) 1",
              borderBottomWidth: "4px",
              borderBottomStyle: "solid",
              borderBottomColor: "transparent",
            }}
            >
            Controle de Documentos
          </h2>

          {/* Filtro de busca */}
          <div className="mb-4 flex items-center space-x-4">
            <div className="flex-1 max-w-md">
              <label htmlFor="filtro-processo" className="block text-sm font-medium text-gray-700 mb-2">
                Buscar por Número do Documento do Processo
              </label>
              <Input
                id="filtro-processo"
                type="text"
                placeholder="Digite o número do documento"
                value={filtroProcesso}
                onChange={(e) => setFiltroProcesso(e.target.value)}
                className="w-full"
              />
            </div>
            {filtroProcesso && (
              <div className="flex items-center space-x-2 pt-6">
                <span className="text-sm text-gray-600">
                  {processosFiltrados.length} processo(s) encontrado(s)
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFiltroProcesso("")}
                  className="h-8"
                >
                  Limpar
                </Button>
              </div>
            )}
          </div>

          {/* Tabela principal */}
          <div className="bg-white rounded-xl border overflow-hidden mb-3 shadow-md">
            <div className="from-sky-600 to-blue-600 bg-gradient-to-r text-white">
              <div className="grid grid-cols-10 gap-4 p-4 text-sm font-semibold">
                <div>Opções</div>
                <div>Status</div>
                <div>Prioridade</div>
                <div>Nº Documento</div>
                <div>Tipo Documento</div>
                <div>Data Abertura</div>
                <div>Criado Por</div>
                <div>Assunto</div>
                <div>Origem</div>
                <div>Ações</div>
              </div>
            </div>
            
            {loading ? (
              <div className="p-12 text-center text-gray-600">
                <p className="text-lg">Carregando documentos...</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center text-red-600">
                <p className="text-lg">{error}</p>
                <Button 
                  onClick={carregarDocumentos}
                  className="mt-4 bg-blue-700 hover:bg-blue-800"
                >
                  Tentar novamente
                </Button>
              </div>
            ) : processosFiltrados.length === 0 ? (
              <div className="p-12 text-center text-gray-600">
                <p className="text-lg">
                  {filtroProcesso 
                    ? `Nenhum processo encontrado com "${filtroProcesso}"` 
                    : processos.length === 0 
                      ? "Nenhum processo cadastrado" 
                      : "Nenhum processo encontrado"
                  }
                </p>
                {processos.length === 0 && (
                  <p className="text-sm mt-2 text-gray-500">
                    Cadastre processos para começar.
                  </p>
                )}
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {processosFiltrados.map((processo) => (
                  <div key={processo.id} className="grid grid-cols-10 gap-4 p-4 text-sm hover:bg-gray-50">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        title="Visualizar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0"
                        title="Editar"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                      </Button>
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Ativo
                      </span>
                    </div>
                    <div className="text-center">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Normal
                      </span>
                    </div>
                    <div className="font-medium">
                      {processo.numero_documento || '-'}
                    </div>
                    <div>{processo.tipo_documento || '-'}</div>
                    <div>{processo.data_abertura ? new Date(processo.data_abertura).toLocaleDateString('pt-BR') : '-'}</div>
                    <div>{processo.criado_por || '-'}</div>
                    <div className="truncate" title={processo.assunto}>{processo.assunto || '-'}</div>
                    <div>{processo.origem || '-'}</div>
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
                        title="Criar documento de controle"
                      >
                        Controlar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seção Gráficos */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-3xl font-bold text-sky-700 mb-4 pb-2 inline-block border-b-4"
            style={{
              borderImage: "linear-gradient(to right, #0287c7, #0287c7) 1",
              borderBottomWidth: "4px",
              borderBottomStyle: "solid",
              borderBottomColor: "transparent",
              
            }}>
              Gráficos
            </h3>
            <div className="flex space-x-4">
              <Button className="bg-[#103977] hover:bg-[#eaf6ff80] text-white border hover:text-[#103977] hover:border-[#103977] hover:border hover:font-medium px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Arquivar
              </Button>
              <Button className="bg-[#103977] hover:bg-[#eaf6ff80] text-white border hover:text-[#103977] hover:border-[#103977] hover:border hover:font-medium px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Arquivar CI
              </Button>
            </div>
          </div>

          {/* Área dos gráficos */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border p-8 h-80 flex items-center justify-center shadow-md">
              <div className="text-center text-gray-600">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                </div>
                <p className="font-medium">Gráfico 1</p>
              </div>
            </div>
            <div className="bg-white rounded-xl border p-8 h-80 flex items-center justify-center shadow-md">
              <div className="text-center text-gray-600">
                <div className="w-16 h-16 bg-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"
                    />
                  </svg>
                </div>
                <p className="font-medium">Gráfico 2</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

