import { Button } from "@/components/ui/button"
import { RotateCcw, ChevronLeft, ChevronRight, ChevronFirst, ChevronLast, Filter } from "lucide-react"

export function ControleDocumentosCompleto() {
  return (
    <div className="bg-white border-2 border-blue-300 rounded-lg p-6 mx-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">
          Controle de Documentos
        </h1>
      </div>

      {/* Botões de navegação */}
      <div className="flex space-x-2 mb-4">
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <ChevronFirst className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 px-3 bg-white border-gray-400 text-sm">
          1
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <ChevronLast className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 h-8 w-8 p-0">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabela completa */}
      <div className="border rounded-lg overflow-hidden mb-8">
        <div className="bg-blue-600 text-white">
          <div className="grid grid-cols-10 gap-2 p-3 font-semibold text-xs">
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

        <div className="bg-blue-100 min-h-[300px] p-4">
          <div className="text-center text-gray-600 py-20">
            <div className="text-lg">Nenhum documento encontrado</div>
            <div className="text-sm mt-2">Use os filtros para localizar documentos</div>
          </div>
        </div>
      </div>

      {/* Seção Gráficos com botões */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">Gráficos</h2>
          <div className="flex space-x-2">
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2">Arquivar</Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-2">Arquivar CI</Button>
          </div>
        </div>

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
