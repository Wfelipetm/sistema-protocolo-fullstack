import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Download, RefreshCcw, Plus, Trash2, Link, Unlink } from "lucide-react"

export function ApensosPage() {
  return (
    <div className="bg-white border-2 border-blue-300 rounded-lg p-6 mx-4">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">Apensos</h1>
      </div>

      {/* Seção de criação de apenso */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Criar Novo Apenso</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="processo-principal" className="text-blue-700 text-sm font-medium">
              Processo Principal
            </Label>
            <Input id="processo-principal" placeholder="Ex: 001/2024" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="processo-apenso" className="text-blue-700 text-sm font-medium">
              Processo a ser Apensado
            </Label>
            <Input id="processo-apenso" placeholder="Ex: 002/2024" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tipo-apenso" className="text-blue-700 text-sm font-medium">
              Tipo de Apenso
            </Label>
            <Select>
              <SelectTrigger className="h-9 bg-white border-gray-300">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="anexacao">Anexação</SelectItem>
                <SelectItem value="apensacao">Apensação</SelectItem>
                <SelectItem value="juntada">Juntada</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="data-apenso" className="text-blue-700 text-sm font-medium">
              Data do Apenso
            </Label>
            <Input id="data-apenso" type="date" className="h-9 bg-white border-gray-300" />
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="motivo-apenso" className="text-blue-700 text-sm font-medium">
            Motivo do Apenso
          </Label>
          <Textarea
            id="motivo-apenso"
            className="mt-2 bg-white border-gray-300"
            rows={3}
            placeholder="Descreva o motivo do apenso..."
          />
        </div>
        <div className="flex justify-end mt-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white">
            <Link className="w-4 h-4 mr-2" />
            Criar Apenso
          </Button>
        </div>
      </div>

      {/* Filtros de busca */}
      <div className="bg-gray-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Filtros de Busca</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numero-processo-filtro" className="text-blue-700 text-sm font-medium">
              Número do Processo
            </Label>
            <Input id="numero-processo-filtro" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data-inicio" className="text-blue-700 text-sm font-medium">
              Data Início
            </Label>
            <Input id="data-inicio" type="date" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data-fim" className="text-blue-700 text-sm font-medium">
              Data Fim
            </Label>
            <Input id="data-fim" type="date" className="h-9 bg-white border-gray-300" />
          </div>
        </div>
        <div className="flex space-x-2 mt-4">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            <Search className="w-4 h-4 mr-2" />
            Buscar
          </Button>
          <Button variant="outline" className="border-blue-600 text-blue-600 bg-transparent">
            <RefreshCcw className="w-4 h-4 mr-2" />
            Limpar
          </Button>
        </div>
      </div>

      {/* Botões de ação */}
      <div className="flex space-x-2 mb-4">
        <Button size="sm" className="bg-green-600 text-white hover:bg-green-700 h-8 w-8 p-0">
          <Plus className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-red-600 text-white hover:bg-red-700 h-8 w-8 p-0">
          <Trash2 className="w-4 h-4" />
        </Button>
        <Button size="sm" className="bg-orange-600 text-white hover:bg-orange-700 h-8 w-8 p-0">
          <Unlink className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <Filter className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <Download className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabela de apensos */}
      <div className="border rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white">
          <div className="grid grid-cols-8 gap-4 p-3 font-semibold text-sm">
            <div>Processo Principal</div>
            <div>Processo Apensado</div>
            <div>Tipo</div>
            <div>Data Apenso</div>
            <div>Responsável</div>
            <div>Status</div>
            <div>Motivo</div>
            <div>Ações</div>
          </div>
        </div>

        <div className="bg-gray-100 min-h-[300px]">
          {/* Exemplo de dados */}
          <div className="grid grid-cols-8 gap-4 p-3 text-sm border-b border-gray-200 hover:bg-gray-50">
            <div>001/2024</div>
            <div>005/2024</div>
            <div>Anexação</div>
            <div>15/01/2024</div>
            <div>João Silva</div>
            <div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Ativo</span>
            </div>
            <div className="truncate">Documentos relacionados</div>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                Ver
              </Button>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs text-red-600 bg-transparent">
                Desapensar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4 p-3 text-sm border-b border-gray-200 hover:bg-gray-50">
            <div>002/2024</div>
            <div>006/2024</div>
            <div>Apensação</div>
            <div>16/01/2024</div>
            <div>Maria Costa</div>
            <div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Ativo</span>
            </div>
            <div className="truncate">Mesmo requerente</div>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                Ver
              </Button>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs text-red-600 bg-transparent">
                Desapensar
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-8 gap-4 p-3 text-sm border-b border-gray-200 hover:bg-gray-50">
            <div>003/2024</div>
            <div>007/2024</div>
            <div>Juntada</div>
            <div>17/01/2024</div>
            <div>Pedro Lima</div>
            <div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pendente</span>
            </div>
            <div className="truncate">Análise conjunta necessária</div>
            <div className="flex space-x-1">
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                Ver
              </Button>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs text-red-600 bg-transparent">
                Desapensar
              </Button>
            </div>
          </div>

          <div className="text-center text-gray-500 py-16">
            <div className="text-sm">Mostrando 3 de 3 apensos</div>
          </div>
        </div>
      </div>
    </div>
  )
}
