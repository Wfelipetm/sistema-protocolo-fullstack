import { Button } from "@/components/ui/button"
import { Trash2, Plus, RotateCcw } from "lucide-react"

export function ListasControleDocumentos() {
  return (
    <div className="bg-white border-2 border-blue-300 rounded-lg p-6 mx-4">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">
          Controle de Documentos
        </h1>
      </div>

      {/* Botões de ação */}
      <div className="flex space-x-2 mb-6">
        <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 h-8 w-8 p-0">
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 h-8 w-8 p-0">
          <Plus className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Lista Apensos */}
      <div className="space-y-3 mb-8">
        <div className="flex justify-end">
          <h2 className="text-lg font-bold text-blue-800">Lista Apensos</h2>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white">
            <div className="grid grid-cols-5 gap-4 p-3 font-semibold text-sm">
              <div>Nº Documento</div>
              <div>Tipo de Documento</div>
              <div>Unidade</div>
              <div>Assunto</div>
              <div>Termo</div>
            </div>
          </div>

          <div className="bg-gray-200 min-h-[150px] p-4">
            <div className="text-center text-gray-600 py-12">
              <div className="text-sm">Nenhum apenso encontrado</div>
            </div>
          </div>
        </div>
      </div>

      {/* Lista Histórico */}
      <div className="space-y-3">
        <div className="flex justify-end">
          <h2 className="text-lg font-bold text-blue-800">Lista Histórico</h2>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <div className="bg-blue-600 text-white">
            <div className="grid grid-cols-4 gap-4 p-3 font-semibold text-sm">
              <div>Nº Processo</div>
              <div>Data</div>
              <div>Situação</div>
              <div>Responsável</div>
            </div>
          </div>

          <div className="bg-gray-200 min-h-[150px] p-4">
            <div className="text-center text-gray-600 py-12">
              <div className="text-sm">Nenhum histórico encontrado</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
