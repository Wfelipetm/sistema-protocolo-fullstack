import { Button } from "@/components/ui/button"
import { RotateCcw, Filter } from "lucide-react"

export function ControleDocumentosExact() {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">
          Controle de Documentos
        </h1>
      </div>

      {/* Botões de ação */}
      <div className="flex space-x-2 mb-4">
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 h-8 w-8 p-0">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabela principal */}
      <div className="border rounded-lg overflow-hidden mb-8">
        <div className="bg-blue-600 text-white">
          <div className="grid grid-cols-5 gap-4 p-4 font-semibold text-sm">
            <div>Enviado Por</div>
            <div>Data Envio</div>
            <div>Docs. Guia</div>
            <div>Nº da Guia</div>
            <div>Apensos</div>
          </div>
        </div>

        <div className="bg-blue-100 min-h-[300px] p-4">
          <div className="text-center text-gray-600 py-20">
            <div className="text-lg">Nenhum documento encontrado</div>
            <div className="text-sm mt-2">Use os filtros para localizar documentos</div>
          </div>
        </div>
      </div>

      {/* Seção Gráficos */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">Gráficos</h2>

        <div className="grid grid-cols-2 gap-6">
          <div className="border-2 border-gray-400 rounded-lg bg-blue-100 min-h-[300px] flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-lg font-semibold">Gráfico 1</div>
              <div className="text-sm mt-2">Dados não disponíveis</div>
            </div>
          </div>

          <div className="border-2 border-gray-400 rounded-lg bg-blue-100 min-h-[300px] flex items-center justify-center">
            <div className="text-center text-gray-600">
              <div className="text-lg font-semibold">Gráfico 2</div>
              <div className="text-sm mt-2">Dados não disponíveis</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
