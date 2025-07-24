import Layout from "@/components/layout"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function Localizar() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-blue-700 rounded-xl p-6 text-white shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Formulário de Localização */}
        <div className="bg-white rounded-xl border border-blue-300 p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-black mb-8 border-b-4 border-black pb-2 inline-block">
            Localizar
          </h2>

          <form className="space-y-8">
            {/* Primeira linha */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="unidade" className="text-sm font-semibold text-black">
                  Unidade
                </Label>
                <Input
                  id="unidade"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo" className="text-sm font-semibold text-black">
                  Tipo
                </Label>
                <Input
                  id="tipo"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="processo" className="text-sm font-semibold text-black">
                  Processo
                </Label>
                <Input
                  id="processo"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ano" className="text-sm font-semibold text-black">
                  Ano
                </Label>
                <Input
                  id="ano"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
            </div>

            {/* Segunda linha */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="grau" className="text-sm font-semibold text-black">
                  Grau
                </Label>
                <Input
                  id="grau"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="assunto" className="text-sm font-semibold text-black">
                  Assunto
                </Label>
                <Input
                  id="assunto"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor" className="text-sm font-semibold text-black">
                  Valor
                </Label>
                <Input
                  id="valor"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="data-abertura" className="text-sm font-semibold text-black">
                  Data Abertura
                </Label>
                <Input
                  id="data-abertura"
                  type="date"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
            </div>

            {/* Terceira linha */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="requerente" className="text-sm font-semibold text-black">
                  Requerente
                </Label>
                <Input
                  id="requerente"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="nome-setor" className="text-sm font-semibold text-black">
                  Nome do Setor
                </Label>
                <Input
                  id="nome-setor"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cnpj" className="text-sm font-semibold text-black">
                  CNPJ
                </Label>
                <Input
                  id="cnpj"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="cpf" className="text-sm font-semibold text-black">
                  CPF
                </Label>
                <Input
                  id="cpf"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
            </div>

            {/* Quarta linha */}
            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="origem" className="text-sm font-semibold text-black">
                  Origem
                </Label>
                <Input
                  id="origem"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sumula-processo" className="text-sm font-semibold text-black">
                  Sumula do Processo
                </Label>
                <Input
                  id="sumula-processo"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero-documento" className="text-sm font-semibold text-black">
                  Número do Documento
                </Label>
                <Input
                  id="numero-documento"
                  className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}

