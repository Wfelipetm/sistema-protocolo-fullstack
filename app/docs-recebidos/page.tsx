import Layout from "@/components/layout"

export default function DocsRecebidos() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-sistema-gradient rounded-xl p-6 text-sistema-text-white shadow-lg">
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

        {/* Conteúdo */}
        <div className="bg-sistema-background-primary rounded-xl border border-sistema-border-light p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-sistema-text-primary mb-8 border-b-4 border-sistema-text-primary pb-2 inline-block">
            Documentos Recebidos
          </h2>
          <div className="text-center text-sistema-text-secondary py-12">
            <div className="w-24 h-24 bg-sistema-background-secondary rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <p className="text-lg font-medium">Funcionalidade em desenvolvimento</p>
          </div>
        </div>
      </div>
    </Layout>
  )
}
