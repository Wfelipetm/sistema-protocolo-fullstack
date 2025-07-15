import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function PagamentosForm() {
  return (
    <div className="mx-4">
      <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1 mb-6">
        Controle de Documentos
      </h1>

      <div className="bg-white border rounded-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white px-6 py-3">
          <h2 className="text-lg font-semibold">Processo Outros(Pagamentos)</h2>
        </div>

        {/* Content */}
        <div className="bg-blue-50 p-6">
          <div className="space-y-4">
            {/* Row 1 */}
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="processo-principal" className="text-blue-700 text-sm">
                  Nº Processo e Ano(Principal)
                </Label>
                <Input id="processo-principal" className="bg-white h-9" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="processo-pagamento" className="text-blue-700 text-sm">
                  Nº Processo e Ano(Pagamento)
                </Label>
                <Input id="processo-pagamento" className="bg-white h-9" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valor" className="text-blue-700 text-sm">
                  Valor
                </Label>
                <Input id="valor" type="number" step="0.01" className="bg-white h-9" />
              </div>
            </div>

            {/* Row 2 */}
            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="data-pagamento" className="text-blue-700 text-sm">
                  Data de Pagamento
                </Label>
                <Input id="data-pagamento" type="date" className="bg-white h-9" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="identificador" className="text-blue-700 text-sm">
                  Identificador
                </Label>
                <Input id="identificador" className="bg-white h-9" />
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end pt-4">
              <Button className="bg-green-600 hover:bg-green-700 text-white px-8 py-2">Cadastra</Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
