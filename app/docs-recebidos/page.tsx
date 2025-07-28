"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { FileText, Search, Filter } from "lucide-react"
import { api } from "@/lib/api"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Interfaces
interface DocumentoRecebido {
  id: number
  numero_documento: string
  tipo_documento: string
  origem: string
  assunto?: string
  data_abertura: string
  criado_por?: string
  sumula_documento?: string
}

interface Unidade {
  id: number
  nome: string
}

interface Secretaria {
  id: number
  nome: string
}

export default function DocsRecebidos() {
  const [documentos, setDocumentos] = useState<DocumentoRecebido[]>([])
  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [secretarias, setSecretarias] = useState<Secretaria[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filtroOrigem, setFiltroOrigem] = useState<string>("")

  useEffect(() => {
    carregarDados()
  }, [])

  const carregarDados = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const [processosRes, unidadesRes, secretariasRes] = await Promise.all([
        api.get('/processos'),
        api.get('/unidades'),
        api.get('/secretarias')
      ])

      setDocumentos(processosRes.data || [])
      setUnidades(unidadesRes.data || [])
      setSecretarias(secretariasRes.data || [])
    } catch (err) {
      console.error('Erro ao carregar dados:', err)
      setError('Erro ao carregar documentos recebidos')
    } finally {
      setLoading(false)
    }
  }

  // Filtrar documentos
  const documentosFiltrados = documentos.filter(doc => {
    const filtroOrigemMatch = !filtroOrigem || doc.origem?.toLowerCase().includes(filtroOrigem.toLowerCase())
    return filtroOrigemMatch
  })

  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="from-sky-600 to-blue-600 bg-gradient-to-r rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <FileText className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-[#eaf6ff80] rounded-xl border p-8 shadow-md">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-sky-700 border-b-4 border-[#0287c7] pb-2 inline-block">
              Documentos Recebidos
            </h2>
            <div className="text-sm text-gray-600">
              Total: {documentosFiltrados.length} documentos
            </div>
          </div>

          {/* Filtros */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Filtrar por Origem</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Digite a origem..."
                  value={filtroOrigem}
                  onChange={(e) => setFiltroOrigem(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex items-end">
              <button
                onClick={() => {
                  setFiltroOrigem("")
                }}
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center space-x-2"
              >
                <Filter className="w-4 h-4" />
                <span>Limpar Filtros</span>
              </button>
            </div>
          </div>

          {/* Tabela de Documentos */}
          <div className="bg-white rounded-xl border overflow-hidden shadow-md">
            <div className="from-sky-600 to-blue-600 bg-gradient-to-r text-white">
              <div className="grid grid-cols-6 gap-4 p-4 text-sm font-semibold">
                <div>Nº Documento</div>
                <div>Tipo</div>
                <div>Origem</div>
                <div>Assunto</div>
                <div>Data Recebimento</div>
                <div>Responsável</div>
              </div>
            </div>
            
            {loading ? (
              <div className="p-12 text-center text-gray-600">
                <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                </div>
                <p className="text-lg font-medium">Carregando documentos...</p>
              </div>
            ) : error ? (
              <div className="p-12 text-center text-gray-600">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-lg font-medium text-red-600">{error}</p>
                <button
                  onClick={carregarDados}
                  className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg hover:bg-sky-700 transition-colors"
                >
                  Tentar Novamente
                </button>
              </div>
            ) : documentosFiltrados.length === 0 ? (
              <div className="p-12 text-center text-gray-600">
                <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
                  <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <p className="text-lg font-medium">
                  {filtroOrigem ? 'Nenhum documento encontrado com os filtros aplicados' : 'Nenhum documento recebido encontrado'}
                </p>
              </div>
            ) : (
              <div className="divide-y divide-gray-200">
                {documentosFiltrados.map((documento) => (
                  <div key={documento.id} className="grid grid-cols-6 gap-4 p-4 text-sm hover:bg-gray-50">
                    <div className="font-medium text-gray-900">
                      {documento.numero_documento}
                    </div>
                    <div className="text-gray-600">
                      {documento.tipo_documento || 'N/A'}
                    </div>
                    <div className="text-gray-600">
                      {documento.origem || 'N/A'}
                    </div>
                    <div className="text-gray-600 truncate" title={documento.assunto}>
                      {documento.assunto || documento.sumula_documento || 'N/A'}
                    </div>
                    <div className="text-gray-600">
                      {documento.data_abertura ? new Date(documento.data_abertura).toLocaleDateString('pt-BR') : 'N/A'}
                    </div>
                    <div className="text-gray-600">
                      {documento.criado_por || 'N/A'}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

