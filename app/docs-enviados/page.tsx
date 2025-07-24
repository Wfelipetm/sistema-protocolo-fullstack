import Layout from "@/components/layout"

export default function DocsEnviados() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-blue-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
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

          {/* Tabela de Documentos Enviados */}
          <div className="bg-white rounded-xl border border-blue-300 overflow-hidden mb-8 shadow-sm">
            <div className="bg-blue-700 text-white">
              <div className="grid grid-cols-5 gap-4 p-4 text-sm font-semibold">
                <div>Enviado Por</div>
                <div>Data Envio</div>
                <div>Docs. Guia</div>
                <div>Nº da Guia</div>
                <div>Apensos</div>
              </div>
            </div>
            <div className="p-12 text-center text-gray-600">
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
          </div>

          {/* Seção Gráficos */}
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-black border-b-4 border-black pb-2 inline-block mb-6">
              Gráficos
            </h3>
          </div>

          {/* Área dos gráficos */}
          <div className="grid grid-cols-2 gap-8">
            <div className="bg-blue-50 rounded-xl border border-blue-300 p-8 h-80 flex items-center justify-center shadow-sm">
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
            </div>
            <div className="bg-blue-50 rounded-xl border border-blue-300 p-8 h-80 flex items-center justify-center shadow-sm">
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
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

