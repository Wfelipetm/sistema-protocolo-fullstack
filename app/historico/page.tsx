import Layout from "@/components/layout"
import { History } from "lucide-react"

export default function Historico() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-blue-700 rounded-xl p-6 text-white shadow-lg">
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
        <div className="bg-white rounded-xl border border-blue-300 p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-black mb-8 border-b-4 border-black pb-2 inline-block">
            Controle de Documentos
          </h2>

          {/* Lista Apensos */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">Lista Apensos</h3>
            </div>

            <div className="bg-white rounded-xl border border-blue-300 overflow-hidden shadow-sm">
              <div className="bg-blue-700 text-white">
                <div className="grid grid-cols-5 gap-4 p-4 text-sm font-semibold">
                  <div>Nº Documento</div>
                  <div>Tipo de Documento</div>
                  <div>Unidade</div>
                  <div>Assunto</div>
                  <div>Termo</div>
                </div>
              </div>
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
            </div>
          </div>

          {/* Lista Histórico */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-black">Lista Histórico</h3>
            </div>

            <div className="bg-white rounded-xl border border-blue-300 overflow-hidden shadow-sm">
              <div className="bg-blue-700 text-white">
                <div className="grid grid-cols-4 gap-4 p-4 text-sm font-semibold">
                  <div>Nº Processo</div>
                  <div>Data</div>
                  <div>Situação</div>
                  <div>Responsável</div>
                </div>
              </div>
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

