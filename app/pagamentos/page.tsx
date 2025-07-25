import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { CreditCard } from "lucide-react"

export default function Pagamentos() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-blue-700 rounded-xl p-6 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <CreditCard className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Controle de Documentos */}
        <div className="bg-[#eaf6ff80] rounded-xl border border-slate-200 p-8 shadow-md">
          <h2 className="text-3xl font-bold text-black mb-8 border-b-4 border-black pb-2 inline-block">
            Controle de Documentos
          </h2>

          {/* Formulário de Pagamentos */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md">
            <div className="bg-blue-700 text-white p-4">
              <h3 className="font-semibold text-lg">Processo Outros(Pagamentos)</h3>
            </div>

            <div className="p-8 space-y-6">
              <div className="grid grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="processo-principal" className="text-sm font-semibold text-black">
                    Nº Processo e Ano(Principal)
                  </Label>
                  <Input
                    id="processo-principal"
                    className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="processo-pagamento" className="text-sm font-semibold text-black">
                    Nº Processo e Ano(Pagamento)
                  </Label>
                  <Input
                    id="processo-pagamento"
                    className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="valor" className="text-sm font-semibold text-black">
                    Valor
                  </Label>
                  <Input
                    id="valor"
                    className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="data-pagamento" className="text-sm font-semibold text-black">
                    Data de Pagamento
                  </Label>
                  <Input
                    id="data-pagamento"
                    type="date"
                    className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="identificador" className="text-sm font-semibold text-black">
                    Identificador
                  </Label>
                  <Input
                    id="identificador"
                    className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                  />
                </div>
              </div>

              <div className="flex justify-end pt-4">
                <Button className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
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

