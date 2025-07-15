import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PagamentosFormExact() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">
          Controle de Documentos
        </h1>
      </div>

      <div className="bg-white border rounded-lg overflow-hidden">
        {/* Header azul */}
        <div className="bg-blue-600 text-white px-6 py-4">
          <h2 className="text-lg font-semibold">Processo Outros(Pagamentos)</h2>
        </div>

        {/* Content com fundo azul claro */}
        <div className="bg-blue-100 p-8">
          <div className="space-y-6">
            {/* Primeira linha - 3 colunas */}
            <div className="grid grid-cols-3 gap-8">
              <div className="space-y-2">
                <Label htmlFor="processo-principal" className="text-blue-700 text-sm font-medium">
                  Nº Processo e Ano(Principal)
                </Label>
                <Input id="processo-principal" className="bg-white h-10 border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="processo-pagamento" className="text-blue-700 text-sm font-medium">
                  Nº Processo e Ano(Pagamento)
                </Label>
                <Input id="processo-pagamento" className="bg-white h-10 border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor" className="text-blue-700 text-sm font-medium">
                  Valor
                </Label>
                <Input id="valor" type="number" step="0.01" className="bg-white h-10 border-gray-300" />
              </div>
            </div>

            {/* Segunda linha - 2 colunas + botão */}
            <div className="grid grid-cols-3 gap-8 items-end">
              <div className="space-y-2">
                <Label htmlFor="data-pagamento" className="text-blue-700 text-sm font-medium">
                  Data de Pagamento
                </Label>
                <Input id="data-pagamento" type="date" className="bg-white h-10 border-gray-300" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="identificador" className="text-blue-700 text-sm font-medium">
                  Identificador
                </Label>
                <Input id="identificador" className="bg-white h-10 border-gray-300" />
              </div>

              <div className="flex justify-end">
                <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2 h-10 font-semibold">
                  Cadastra
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
