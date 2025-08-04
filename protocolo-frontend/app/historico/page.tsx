"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { History } from "lucide-react"
import { api } from "@/lib/api"

// Interfaces
interface DocumentoControle {
  id: number
  processo_id: number
  enviado_por: string
  data_envio: string
  docs_guia: string
  numero_guia: string
  apensos: string
}

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
  status?: string
}

export default function Historico() {
  const [documentos, setDocumentos] = useState<DocumentoControle[]>([])
  const [processos, setProcessos] = useState<Processo[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // APIs
  const documentosApi = {
    listarTodos: async (): Promise<DocumentoControle[]> => {
      const response = await api.get("/documentos-controle")
      return response.data
    }
  }

  const processosApi = {
    listarTodos: async (): Promise<Processo[]> => {
      const response = await api.get("/processos")
      return response.data
    }
  }

  // Carregar dados
  useEffect(() => {
    const carregarDados = async () => {
      try {
        setLoading(true)
        const [dadosDocumentos, dadosProcessos] = await Promise.all([
          documentosApi.listarTodos(),
          processosApi.listarTodos()
        ])
        setDocumentos(dadosDocumentos)
        setProcessos(dadosProcessos)
      } catch (err) {
        console.error("Erro ao carregar dados:", err)
        setError("Erro ao carregar dados do histórico")
      } finally {
        setLoading(false)
      }
    }

    carregarDados()
  }, [])

  // Função para buscar dados do processo por ID
  const buscarProcessoPorId = (id: number) => {
    return processos.find(p => p.id === id)
  }

  // Filtrar processos que têm apensos
  const processosComApenso = processos.filter(p => p.apenso_processo && p.apenso_processo.trim() !== "")
  
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="from-sky-600 to-blue-600 bg-gradient-to-r rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <History className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Controle de Documentos */}
        <div className="bg-[#eaf6ff80] rounded-xl border p-8 shadow-md">
          <h2 className="text-3xl font-bold text-sky-700 mb-8 border-b-4 border-sky-700 pb-2 inline-block">
            Histórico
          </h2>

          {/* Lista Apensos */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-sky-700">Lista Apensos</h3>
            </div>

            <div className="bg-white rounded-xl border  overflow-hidden shadow-md">
              <div className="from-sky-600 to-blue-600 bg-gradient-to-r text-white">
                <div className="grid grid-cols-5 gap-4 p-4 text-sm font-semibold">
                  <div>Nº Documento</div>
                  <div>Tipo de Documento</div>
                  <div>Unidade</div>
                  <div>Assunto</div>
                  <div>Termo</div>
                </div>
              </div>
              
              {loading ? (
                <div className="p-12 text-center text-gray-600">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                  </div>
                  <p className="text-lg font-medium">Carregando apensos...</p>
                </div>
              ) : error ? (
                <div className="p-12 text-center text-gray-600">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-red-600">{error}</p>
                </div>
              ) : processosComApenso.length === 0 ? (
                <div className="p-12 text-center text-gray-600">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Nenhum apenso encontrado</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {processosComApenso.map((processo) => (
                    <div key={processo.id} className="grid grid-cols-5 gap-4 p-4 text-sm hover:bg-gray-50">
                      <div className="font-medium text-gray-900">
                        {processo.numero_documento}
                      </div>
                      <div className="text-gray-600">
                        {processo.tipo_documento || 'N/A'}
                      </div>
                      <div className="text-gray-600">
                        {processo.origem || 'N/A'}
                      </div>
                      <div className="text-gray-600">
                        {processo.assunto || 'N/A'}
                      </div>
                      <div className="text-gray-600">
                        {processo.sumula_documento || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lista Histórico */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-sky-700">Lista Histórico</h3>
            </div>

            <div className="bg-white rounded-xl border overflow-hidden shadow-md">
              <div className="from-sky-600 to-blue-600 bg-gradient-to-r text-white">
                <div className="grid grid-cols-6 gap-4 p-4 text-sm font-semibold">
                  <div>Nº Documento</div>
                  <div>Origem</div>
                  <div>Assunto</div>
                  <div>Data Abertura</div>
                  <div>Status</div>
                  <div>Criado Por</div>
                </div>
              </div>
              
              {loading ? (
                <div className="p-12 text-center text-gray-600">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                  </div>
                  <p className="text-lg font-medium">Carregando histórico...</p>
                </div>
              ) : error ? (
                <div className="p-12 text-center text-gray-600">
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-red-600">{error}</p>
                </div>
              ) : processos.length === 0 ? (
                <div className="p-12 text-center text-gray-600">
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Nenhum histórico encontrado</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-200">
                  {processos.map((processo) => (
                    <div key={processo.id} className="grid grid-cols-6 gap-4 p-4 text-sm hover:bg-gray-50">
                      <div className="font-medium text-gray-900">
                        {processo.numero_documento}
                      </div>
                      <div className="text-gray-600">
                        {processo.origem || 'N/A'}
                      </div>
                      <div className="text-gray-600">
                        {processo.assunto || 'N/A'}
                      </div>
                      <div className="text-gray-600">
                        {processo.data_abertura ? new Date(processo.data_abertura).toLocaleDateString('pt-BR') : 'N/A'}
                      </div>
                      <div className="text-gray-600">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          processo.status === 'ATIVO' ? 'bg-green-100 text-green-800' :
                          processo.status === 'PENDENTE' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {processo.status || 'N/A'}
                        </span>
                      </div>
                      <div className="text-gray-600">
                        {processo.criado_por || 'N/A'}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

