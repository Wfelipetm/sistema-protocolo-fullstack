import Layout from "@/components/layout"

export default function Apensos() {
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

        {/* Conteúdo Principal */}
        <div className="bg-sistema-background-primary rounded-xl border border-sistema-border-light p-8 shadow-sm">
          {/* Lista Apensos */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-sistema-text-primary">Lista Apensos</h3>
            </div>

            <div className="bg-sistema-background-primary rounded-xl border border-sistema-border-light overflow-hidden shadow-sm">
              <div className="bg-sistema-gradient text-sistema-text-white">
                <div className="grid grid-cols-5 gap-4 p-4 text-sm font-semibold">
                  <div>Nº Documento</div>
                  <div>Tipo de Documento</div>
                  <div>Unidade</div>
                  <div>Assunto</div>
                  <div>Termo</div>
                </div>
              </div>
              <div className="bg-sistema-background-secondary min-h-[200px]">{/* Área vazia para dados */}</div>
            </div>
          </div>

          {/* Lista Histórico */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-sistema-text-primary">Lista Histórico</h3>
            </div>

            <div className="bg-sistema-background-primary rounded-xl border border-sistema-border-light overflow-hidden shadow-sm">
              <div className="bg-sistema-gradient text-sistema-text-white">
                <div className="grid grid-cols-4 gap-4 p-4 text-sm font-semibold">
                  <div>Nº Processo</div>
                  <div>Data</div>
                  <div>Situação</div>
                  <div>Responsável</div>
                </div>
              </div>
              <div className="bg-sistema-background-secondary min-h-[200px]">{/* Área vazia para dados */}</div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
