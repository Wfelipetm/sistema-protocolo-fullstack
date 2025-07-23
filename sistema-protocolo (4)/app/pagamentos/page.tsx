import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Pagamentos() {
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

        {/* Controle de Documentos */}
        <div className="bg-sistema-background-primary rounded-xl border border-sistema-border-light p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-sistema-text-primary mb-8 border-b-4 border-sistema-text-primary pb-2 inline-block">
            Controle de Documentos
          </h2>

          {/* Formulário de Pagamentos */}
          <div className="bg-sistema-background-primary rounded-xl border border-sistema-border-light overflow-hidden shadow-sm">
            <div className="bg-sistema-gradient text-sistema-text-white p-4">
              <h3 className="font-semibold text-lg">Processo Outros(Pagamentos)</h3>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="processo-principal" className="text-sm font-semibold text-sistema-text-primary">
                    Nº Processo e Ano(Principal)
                  </Label>
                  <Input
                    id="processo-principal"
                    className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processo-pagamento" className="text-sm font-semibold text-sistema-text-primary">
                    Nº Processo e Ano(Pagamento)
                  </Label>
                  <Input
                    id="processo-pagamento"
                    className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor" className="text-sm font-semibold text-sistema-text-primary">
                    Valor
                  </Label>
                  <Input
                    id="valor"
                    className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="data-pagamento" className="text-sm font-semibold text-sistema-text-primary">
                    Data de Pagamento
                  </Label>
                  <Input
                    id="data-pagamento"
                    type="date"
                    className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identificador" className="text-sm font-semibold text-sistema-text-primary">
                    Identificador
                  </Label>
                  <Input
                    id="identificador"
                    className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-10 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  Cadastrar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
