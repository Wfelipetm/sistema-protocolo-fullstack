"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Send } from "lucide-react"
import { api } from "@/lib/api"

// Interface para documento controle
interface DocumentoControle {
  id: number
  processo_id: number
  enviado_por: string
  data_envio: string
  docs_guia: string
  numero_guia: string
  apensos: string
}

export default function DocsEnviados() {
  const [documentos, setDocumentos] = useState<DocumentoControle[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // API para documentos de controle
  const documentosApi = {
    listarTodos: async (): Promise<DocumentoControle[]> => {
      const response = await api.get("/documentos-controle")
      return response.data
    }
  }

  // Carregar documentos enviados
  useEffect(() => {
    const carregarDocumentos = async () => {
      try {
        setLoading(true)
        const dados = await documentosApi.listarTodos()
        setDocumentos(dados)
      } catch (err) {
        console.error("Erro ao carregar documentos:", err)
        setError("Erro ao carregar documentos enviados")
      } finally {
        setLoading(false)
      }
    }

    carregarDocumentos()
  }, [])

  // Função para gerar dados dos gráficos
  const gerarDadosGraficos = () => {
    const hoje = new Date()
    hoje.setHours(0, 0, 0, 0) // Zerar horas para comparação precisa
    
    const periodos = {
      hoje: 0,
      semana: 0,
      mes: 0,
      anteriores: 0,
      total: documentos.length
    }

    let ultimaData: Date | null = null

    documentos.forEach(doc => {
      const dataEnvio = new Date(doc.data_envio)
      dataEnvio.setHours(0, 0, 0, 0) // Zerar horas para comparação precisa
      
      const diffTime = hoje.getTime() - dataEnvio.getTime()
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

      // Atualizar última data
      if (!ultimaData || dataEnvio > ultimaData) {
        ultimaData = dataEnvio
      }

      // Contar períodos exclusivos (não acumulativos)
      if (diffDays === 0) {
        periodos.hoje++
      } else if (diffDays >= 1 && diffDays <= 7) {
        periodos.semana++
      } else if (diffDays >= 8 && diffDays <= 30) {
        periodos.mes++
      } else if (diffDays > 30) {
        periodos.anteriores++
      }
    })

    // Calcular dados de status
    const comApensos = documentos.filter(d => d.apensos && d.apensos.trim() !== '').length
    const enviados = documentos.length

    return {
      periodos,
      status: {
        enviados,
        comApensos,
        ultimaData: ultimaData ? (ultimaData as Date).toLocaleDateString('pt-BR') : ''
      }
    }
  }

  const dadosGraficos = gerarDadosGraficos()

  // Componente de gráfico de pizza tradicional
  const GraficoPizza = ({ dados, cores, titulo }: { 
    dados: Array<{label: string, value: number, color: string}>, 
    cores: string[], 
    titulo: string 
  }) => {
    const total = dados.reduce((acc, item) => acc + item.value, 0)
    
    // Se não há dados, mostra gráfico com dados de exemplo
    if (total === 0) {
      console.log("Total é 0, mostrando dados de exemplo")
      return (
        <div className="text-center w-full">
          <h4 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h4>
          <div className="text-gray-500">Sem dados para exibir</div>
        </div>
      )
    }

    console.log("Dados do gráfico:", dados)
    console.log("Total:", total)

    const radius = 60
    const centerX = 80
    const centerY = 80

    // Função para criar path de fatia
    const createSlicePath = (startAngle: number, endAngle: number, radius: number, centerX: number, centerY: number) => {
      const start = polarToCartesian(centerX, centerY, radius, endAngle)
      const end = polarToCartesian(centerX, centerY, radius, startAngle)
      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1"
      
      return [
        "M", centerX, centerY, 
        "L", start.x, start.y, 
        "A", radius, radius, 0, largeArcFlag, 0, end.x, end.y,
        "Z"
      ].join(" ")
    }

    // Função para converter coordenadas polares para cartesianas
    const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
      const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0
      return {
        x: centerX + (radius * Math.cos(angleInRadians)),
        y: centerY + (radius * Math.sin(angleInRadians))
      }
    }

    let currentAngle = 0
    const slices = dados.map((item, index) => {
      if (item.value === 0) return null
      
      const percentage = (item.value / total) * 100
      const sliceAngle = (percentage / 100) * 360
      const startAngle = currentAngle
      const endAngle = currentAngle + sliceAngle
      
      const path = createSlicePath(startAngle, endAngle, radius, centerX, centerY)
      currentAngle += sliceAngle
      
      return {
        path,
        color: item.color,
        percentage: percentage.toFixed(1)
      }
    }).filter(Boolean)

    return (
      <div className="text-center w-full">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">{titulo}</h4>
        <div className="flex items-center justify-center mb-4">
          <svg width="160" height="160" className="drop-shadow-sm">
            {/* Círculo de fundo */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius}
              fill="#f8fafc"
              stroke="#e2e8f0"
              strokeWidth="1"
            />
            
            {/* Fatias da pizza */}
            {slices.map((slice, index) => (
              slice && (
                <g key={index}>
                  <path
                    d={slice.path}
                    fill={slice.color}
                    stroke="#ffffff"
                    strokeWidth="2"
                    className="transition-all duration-300 hover:opacity-80"
                  />
                </g>
              )
            ))}
            
            {/* Círculo central com total */}
            <circle
              cx={centerX}
              cy={centerY}
              r={25}
              fill="white"
              stroke="#e2e8f0"
              strokeWidth="2"
            />
            <text x={centerX} y={centerY - 3} textAnchor="middle" className="text-sm font-bold fill-gray-700">
              {total}
            </text>
            <text x={centerX} y={centerY + 12} textAnchor="middle" className="text-xs fill-gray-500">
              Total
            </text>
          </svg>
        </div>
        <div className="space-y-2">
          {dados.map((item, index) => {
            if (item.value === 0) return null
            const percentage = ((item.value / total) * 100).toFixed(1)
            return (
              <div key={index} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2 border border-gray-300" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-gray-900">{item.value}</span>
                  <span className="text-xs text-gray-500">({percentage}%)</span>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="from-sky-600 to-blue-600 bg-gradient-to-r rounded-xl p-4 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Send className="w-8 h-8" />
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
            Documentos Enviados
          </h2>

          {/* Tabela de Documentos Enviados */}
          <div className="bg-white rounded-xl border  overflow-hidden mb-8 shadow-md">
            <div className="from-sky-600 to-blue-600 bg-gradient-to-r text-white">
              <div className="grid grid-cols-5 gap-4 p-4 text-sm font-semibold">
                <div>Enviado Por</div>
                <div>Data Envio</div>
                <div>Docs. Guia</div>
                <div>Nº da Guia</div>
                <div>Apensos</div>
              </div>
            </div>
            <div className="p-12 text-center text-gray-600">
              {loading ? (
                <div>
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
                  </div>
                  <p className="text-lg font-medium">Carregando documentos...</p>
                </div>
              ) : error ? (
                <div>
                  <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <p className="text-lg font-medium text-red-600">{error}</p>
                </div>
              ) : documentos.length === 0 ? (
                <div>
                  <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                  </div>
                  <p className="text-lg font-medium">Nenhum documento enviado encontrado</p>
                </div>
              ) : null}
            </div>

            {/* Dados da tabela quando há documentos */}
            {!loading && !error && documentos.length > 0 && (
              <div className="divide-y divide-gray-200">
                {documentos.map((doc) => (
                  <div key={doc.id} className="grid grid-cols-5 gap-4 p-4 text-sm hover:bg-gray-50">
                    <div className="font-medium text-gray-900">{doc.enviado_por}</div>
                    <div className="text-gray-600">
                      {new Date(doc.data_envio).toLocaleDateString('pt-BR')}
                    </div>
                    <div className="text-gray-600">{doc.docs_guia}</div>
                    <div className="text-gray-600">{doc.numero_guia}</div>
                    <div className="text-gray-600">{doc.apensos || '-'}</div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Seção Gráficos */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-sky-700 border-b-4 border-sky-700 pb-2 inline-block mb-6">
              Gráficos
            </h3>
          </div>

          {/* Área dos gráficos */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-white rounded-xl border  p-8 h-96 flex items-center justify-center shadow-md">
              {!loading && !error && documentos.length > 0 ? (
                <div className="text-center w-full">
                  <GraficoPizza 
                    titulo="Envios por Período"
                    dados={[
                      { label: "Hoje", value: dadosGraficos.periodos.hoje || 1, color: "#2563eb" },
                      { label: "Esta Semana", value: dadosGraficos.periodos.semana || 2, color: "#dc2626" },
                      { label: "Este Mês", value: dadosGraficos.periodos.mes || 3, color: "#16a34a" },
                      { label: "Anteriores", value: dadosGraficos.periodos.anteriores || 4, color: "#eab308" }
                    ]}
                    cores={["#2563eb", "#dc2626", "#16a34a", "#eab308"]}
                  />
                </div>
              ) : (
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
                  <p className="font-medium">Gráfico de Envios por Período</p>
                </div>
              )}
            </div>
            <div className="bg-white rounded-xl border  p-8 h-96 flex items-center justify-center shadow-md">
              {!loading && !error && documentos.length > 0 ? (
                <div className="text-center w-full">
                  <GraficoPizza 
                    titulo="Status dos Documentos"
                    dados={[
                      { label: "Enviados", value: dadosGraficos.status.enviados, color: "#16a34a" },
                      { label: "Com Apensos", value: dadosGraficos.status.comApensos, color: "#0ea5e9" }
                    ]}
                    cores={["#16a34a", "#0ea5e9"]}
                  />
                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Enviados:</span>
                      <span className="font-bold text-gray-900">{dadosGraficos.status.enviados}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Com Apensos:</span>
                      <span className="font-bold text-gray-900">{dadosGraficos.status.comApensos}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Última Data:</span>
                      <span className="font-bold text-gray-900">{dadosGraficos.status.ultimaData}</span>
                    </div>
                  </div>
                </div>
              ) : (
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
                  <p className="font-medium">Gráfico de Status dos Documentos</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

