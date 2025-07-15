import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Search, Filter, Download, Upload, RefreshCcw, Plus, Trash2 } from "lucide-react"

export function DocsRecebidos() {
  return (
    <div className="bg-white border-2 border-blue-300 rounded-lg p-6 mx-4">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">
          Docs. Recebidos
        </h1>
      </div>

      {/* Filtros de busca */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Filtros de Busca</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numero-documento-filtro" className="text-blue-700 text-sm font-medium">
              Número do Documento
            </Label>
            <Input id="numero-documento-filtro" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="data-recebimento" className="text-blue-700 text-sm font-medium">
              Data de Recebimento
            </Label>
            <Input id="data-recebimento" type="date" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="origem-filtro" className="text-blue-700 text-sm font-medium">
              Origem
            </Label>
            <Select>
              <SelectTrigger className="h-9 bg-white border-gray-300">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="protocolo">Protocolo</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="correios">Correios</SelectItem>
                <SelectItem value="balcao">Balcão</SelectItem>
              </SelectContent>
            </Select>
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
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <Filter className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <Download className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-white border-gray-400">
          <Upload className="w-4 h-4" />
        </Button>
      </div>

      {/* Tabela de documentos recebidos */}
      <div className="border rounded-lg overflow-hidden mb-6">
        <div className="bg-blue-600 text-white">
          <div className="grid grid-cols-7 gap-4 p-3 font-semibold text-sm">
            <div>Nº Documento</div>
            <div>Data Recebimento</div>
            <div>Remetente</div>
            <div>Assunto</div>
            <div>Origem</div>
            <div>Status</div>
            <div>Ações</div>
          </div>
        </div>

        <div className="bg-gray-100 min-h-[300px]">
          {/* Exemplo de dados */}
          <div className="grid grid-cols-7 gap-4 p-3 text-sm border-b border-gray-200 hover:bg-gray-50">
            <div>001/2024</div>
            <div>15/01/2024</div>
            <div>João Silva Santos</div>
            <div>Solicitação de Certidão</div>
            <div>Protocolo</div>
            <div>
              <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs">Pendente</span>
            </div>
            <div>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                Ver
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 p-3 text-sm border-b border-gray-200 hover:bg-gray-50">
            <div>002/2024</div>
            <div>16/01/2024</div>
            <div>Maria Oliveira Costa</div>
            <div>Pedido de Licença</div>
            <div>E-mail</div>
            <div>
              <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">Processado</span>
            </div>
            <div>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                Ver
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 p-3 text-sm border-b border-gray-200 hover:bg-gray-50">
            <div>003/2024</div>
            <div>17/01/2024</div>
            <div>Empresa ABC Ltda</div>
            <div>Solicitação de Alvará</div>
            <div>Balcão</div>
            <div>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">Em Análise</span>
            </div>
            <div>
              <Button size="sm" variant="outline" className="h-6 px-2 text-xs bg-transparent">
                Ver
              </Button>
            </div>
          </div>

          <div className="text-center text-gray-500 py-16">
            <div className="text-sm">Mostrando 3 de 3 documentos</div>
          </div>
        </div>
      </div>

      {/* Formulário de registro rápido */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-800 mb-4">Registro Rápido de Documento</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="numero-doc-novo" className="text-blue-700 text-sm font-medium">
              Número do Documento
            </Label>
            <Input id="numero-doc-novo" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="remetente-novo" className="text-blue-700 text-sm font-medium">
              Remetente
            </Label>
            <Input id="remetente-novo" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="assunto-novo" className="text-blue-700 text-sm font-medium">
              Assunto
            </Label>
            <Input id="assunto-novo" className="h-9 bg-white border-gray-300" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="origem-novo" className="text-blue-700 text-sm font-medium">
              Origem
            </Label>
            <Select>
              <SelectTrigger className="h-9 bg-white border-gray-300">
                <SelectValue placeholder="Selecione..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="protocolo">Protocolo</SelectItem>
                <SelectItem value="email">E-mail</SelectItem>
                <SelectItem value="correios">Correios</SelectItem>
                <SelectItem value="balcao">Balcão</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="mt-4">
          <Label htmlFor="observacoes-novo" className="text-blue-700 text-sm font-medium">
            Observações
          </Label>
          <Textarea id="observacoes-novo" className="mt-2 bg-white border-gray-300" rows={3} />
        </div>
        <div className="flex justify-end mt-4">
          <Button className="bg-green-600 hover:bg-green-700 text-white">Registrar Documento</Button>
        </div>
      </div>
    </div>
  )
}
