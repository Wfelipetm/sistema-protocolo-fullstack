import { Button } from "@/components/ui/button"
import { RotateCcw, Filter } from "lucide-react"

export function ControleDocumentosTable() {
  return (
    <div className="space-y-4">
      {/* Action buttons */}
      <div className="flex space-x-2">
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 h-8 w-8 p-0">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
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
          <div className="text-center text-gray-500 py-16">
            <div className="text-lg">Nenhum documento encontrado</div>
            <div className="text-sm mt-2">Use os filtros para localizar documentos</div>
          </div>
        </div>
      </div>
    </div>
  )
}
