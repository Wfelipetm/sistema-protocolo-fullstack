import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { FileCheck } from "lucide-react"

export default function ControleDocumento() {
  return (
    <Layout>
      <div className="space-y-3">
        {/* Header */}
        <div className="bg-blue-700 rounded-xl p-4 text-white shadow-md">
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
        <div className="bg-[#eaf6ff80] rounded-xl border border-slate-300 p-6 shadow-sm">
          <h2 className="text-3xl font-bold text-black mb-4 border-b-4 border-blue-200 pb-2 inline-block">
            Controle de Documentos
          </h2>

          {/* Tabela principal */}
          <div className="bg-white rounded-xl border overflow-hidden mb-3 shadow-md">
            <div className="bg-blue-700 text-white">
              <div className="grid grid-cols-10 gap-4 p-4 text-sm font-semibold">
                <div>Opções</div>
                <div>Status.Doc</div>
                <div>Prioridade</div>
                <div>Nº Documento</div>
                <div>Assinado?</div>
                <div>Cliente</div>
                <div>Nº Guia</div>
                <div>MBytes</div>
                <div>Apensos</div>
                <div>Assunto</div>
              </div>
            </div>
            <div className="p-12 text-center text-gray-600">
              <p className="text-lg">Nenhum documento encontrado</p>
            </div>
          </div>

          {/* Seção Gráficos */}
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-2xl font-bold text-black border-b-4 border-black pb-2 inline-block">
              Gráficos
            </h3>
            <div className="flex space-x-4">
              <Button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                Arquivar
              </Button>
              <Button className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
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

