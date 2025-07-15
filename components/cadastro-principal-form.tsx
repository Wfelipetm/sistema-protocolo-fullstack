import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export function CadastroPrincipalForm() {
  return (
    <div className="bg-white border-2 border-blue-300 rounded-lg p-6 mx-4">
      {/* Title */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1">
          Cadastro Principal
        </h1>
      </div>

      {/* Main form grid */}
      <div className="space-y-4">
        {/* Row 1 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label htmlFor="unidade" className="text-blue-700 text-sm">
              Unidade
            </Label>
            <Input id="unidade" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="tipo-documento" className="text-blue-700 text-sm">
              Tipo de Documento
            </Label>
            <Input id="tipo-documento" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="numero-documento" className="text-blue-700 text-sm">
              Nº do Documento
            </Label>
            <Input id="numero-documento" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="ano" className="text-blue-700 text-sm">
              Ano
            </Label>
            <Input id="ano" className="h-9" />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label htmlFor="data-abertura" className="text-blue-700 text-sm">
              Data de Abertura
            </Label>
            <Input id="data-abertura" type="date" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="apenso-processo" className="text-blue-700 text-sm">
              Apenso do Processo
            </Label>
            <Input id="apenso-processo" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="criado-por" className="text-blue-700 text-sm">
              Criado por
            </Label>
            <Input id="criado-por" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="codigo-assunto" className="text-blue-700 text-sm">
              Código Assunto
            </Label>
            <Input id="codigo-assunto" className="h-9" />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label htmlFor="assunto" className="text-blue-700 text-sm">
              Assunto
            </Label>
            <Input id="assunto" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="doc-necessario" className="text-blue-700 text-sm">
              Doc. Necessário
            </Label>
            <Input id="doc-necessario" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="origem" className="text-blue-700 text-sm">
              Origem
            </Label>
            <Input id="origem" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="valor-rs" className="text-blue-700 text-sm">
              Valor R$
            </Label>
            <Input id="valor-rs" type="number" step="0.01" className="h-9" />
          </div>
        </div>

        {/* Row 4 */}
        <div className="grid grid-cols-4 gap-4">
          <div className="space-y-1">
            <Label htmlFor="requerente-cpf-cnpj" className="text-blue-700 text-sm">
              Requerente por CPF/CNPJ
            </Label>
            <Input id="requerente-cpf-cnpj" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="codigo-requerente" className="text-blue-700 text-sm">
              Código Requerente
            </Label>
            <Input id="codigo-requerente" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="codigo-nome-requerente" className="text-blue-700 text-sm">
              Código Nome Requerente
            </Label>
            <Input id="codigo-nome-requerente" className="h-9" />
          </div>
          <div className="space-y-1">
            <Label htmlFor="sumula-documento" className="text-blue-700 text-sm">
              Súmula do Documento
            </Label>
            <Textarea id="sumula-documento" className="min-h-[80px] resize-none" />
          </div>
        </div>
      </div>

      {/* Segunda seção */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-blue-800 border-b-2 border-blue-800 inline-block pb-1 mb-4">
          Informe os dados para primeira tramitação
        </h2>

        <div className="space-y-4">
          {/* Row 1 */}
          <div className="grid grid-cols-4 gap-4">
            <div className="space-y-1">
              <Label htmlFor="requerente-tramite" className="text-blue-700 text-sm">
                Requerente por CPF/CNPJ
              </Label>
              <Input id="requerente-tramite" className="h-9" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="nome-secretaria" className="text-blue-700 text-sm">
                Nome da Secretaria
              </Label>
              <Input id="nome-secretaria" className="h-9" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="setor-destino" className="text-blue-700 text-sm">
                Setor de Destino
              </Label>
              <Input id="setor-destino" className="h-9" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="setor-requerente" className="text-blue-700 text-sm">
                Setor de Requerente
              </Label>
              <Input id="setor-requerente" className="h-9" />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <Label htmlFor="ultima-tramitacao" className="text-blue-700 text-sm">
                Última Tramitação
              </Label>
              <Input id="ultima-tramitacao" className="h-9" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="local-abertura" className="text-blue-700 text-sm">
                Local de Abertura
              </Label>
              <Input id="local-abertura" className="h-9" />
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap gap-3">
        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2">Gerar Primeira Tramitação</Button>
        <Button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2">Gerar Processo em Série</Button>
        <Button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 text-sm">Etiqueta Protocolo</Button>
        <Button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 text-sm">Etiqueta Internet</Button>
        <Button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 text-sm">Guia (Primeiro Tramite)</Button>
        <Button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 text-sm">Comprovante Abertura</Button>
        <Button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 text-sm">Comprovante Requerente</Button>
        <Button className="bg-blue-800 hover:bg-blue-900 text-white px-4 py-2 text-sm">Capa Abertura</Button>
      </div>
    </div>
  )
}
