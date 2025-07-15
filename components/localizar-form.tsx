import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  ChevronFirst,
  ChevronLeft,
  ChevronRight,
  ChevronLast,
  Filter,
  X,
  RotateCcw,
  Download,
  Upload,
  Calendar,
  Settings,
} from "lucide-react"

export function LocalizarForm() {
  return (
    <div className="bg-white border-2 border-blue-300 rounded-lg p-6 mx-4">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">Localizar</h1>
      </div>

      {/* Toolbar */}
      <div className="flex items-center space-x-1 bg-blue-600 text-white p-2 rounded mb-6">
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <ChevronFirst className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <ChevronLeft className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <ChevronRight className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <ChevronLast className="w-4 h-4" />
        </Button>
        <div className="w-px h-6 bg-white/30 mx-2"></div>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <Filter className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <X className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <RotateCcw className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <Download className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <Upload className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <Calendar className="w-4 h-4" />
        </Button>
        <Button size="sm" variant="ghost" className="text-white hover:bg-blue-700 h-8 w-8 p-0">
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* Filter grid */}
      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Unidade</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="uc001">Unidade Central</SelectItem>
                <SelectItem value="un001">Unidade Norte</SelectItem>
                <SelectItem value="us001">Unidade Sul</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Tipo</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="oficio">Ofício</SelectItem>
                <SelectItem value="memorando">Memorando</SelectItem>
                <SelectItem value="processo">Processo</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Processo</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024001">2024/001</SelectItem>
                <SelectItem value="2024002">2024/002</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Ano</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Grau</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="urgente">Urgente</SelectItem>
                <SelectItem value="normal">Normal</SelectItem>
                <SelectItem value="baixa">Baixa</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Assunto</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="licenca">Licença</SelectItem>
                <SelectItem value="certidao">Certidão</SelectItem>
                <SelectItem value="alvara">Alvará</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Valor</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-100">R$ 0 - 100</SelectItem>
                <SelectItem value="100-500">R$ 100 - 500</SelectItem>
                <SelectItem value="500+">R$ 500+</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Data Abertura</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="hoje">Hoje</SelectItem>
                <SelectItem value="semana">Esta semana</SelectItem>
                <SelectItem value="mes">Este mês</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Requerente</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="carlos">Carlos Eduardo</SelectItem>
                <SelectItem value="ana">Ana Paula</SelectItem>
                <SelectItem value="empresa">Empresa ABC</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Nome do Setor</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="sti">STI</SelectItem>
                <SelectItem value="srh">SRH</SelectItem>
                <SelectItem value="scont">SCONT</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">CNPJ</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12345678000190">12.345.678/0001-90</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">CPF</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="12345678901">123.456.789-01</SelectItem>
                <SelectItem value="23456789012">234.567.890-12</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Origem</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="protocolo">Protocolo</SelectItem>
                <SelectItem value="online">Online</SelectItem>
                <SelectItem value="balcao">Balcão</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Súmula do Processo</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="licenciamento">Licenciamento</SelectItem>
                <SelectItem value="certidoes">Certidões</SelectItem>
                <SelectItem value="alvaras">Alvarás</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-1">
            <Label className="text-blue-700 text-sm">Número Documento</Label>
            <Select>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="001">001/2024</SelectItem>
                <SelectItem value="002">002/2024</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}
