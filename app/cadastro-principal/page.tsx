import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CadastroPrincipal() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header com gradiente */}
        <div className="bg-sistema-gradient rounded-xl p-6 text-sistema-text-white shadow-lg">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6z" />
                <polyline points="14,2 14,8 20,8" />
                <line x1="16" y1="13" x2="8" y2="13" />
                <line x1="16" y1="17" x2="8" y2="17" />
                <polyline points="10,9 9,9 8,9" />
              </svg>
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-sistema-background-primary rounded-xl border border-sistema-border-light p-8 shadow-sm">
          <h2 className="text-3xl font-bold text-sistema-text-primary mb-8 border-b-4 border-sistema-text-primary pb-2 inline-block">
            Cadastro Principal
          </h2>

          <form className="space-y-8">
            {/* Primeira linha */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="unidade" className="text-sm font-semibold text-sistema-text-primary">
                  Unidade
                </Label>
                <Input
                  id="unidade"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo-documento" className="text-sm font-semibold text-sistema-text-primary">
                  Tipo de Documento
                </Label>
                <Input
                  id="tipo-documento"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="numero-documento" className="text-sm font-semibold text-sistema-text-primary">
                  Nº do Documento
                </Label>
                <Input
                  id="numero-documento"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="ano" className="text-sm font-semibold text-sistema-text-primary">
                  Ano
                </Label>
                <Input
                  id="ano"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
            </div>

            {/* Segunda linha */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="data-abertura" className="text-sm font-semibold text-sistema-text-primary">
                  Data de Abertura
                </Label>
                <Input
                  id="data-abertura"
                  type="date"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="apenso-processo" className="text-sm font-semibold text-sistema-text-primary">
                  Apenso do Processo
                </Label>
                <Input
                  id="apenso-processo"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="criado-por" className="text-sm font-semibold text-sistema-text-primary">
                  Criado Por
                </Label>
                <Input
                  id="criado-por"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo-assunto" className="text-sm font-semibold text-sistema-text-primary">
                  Código do Assunto
                </Label>
                <Input
                  id="codigo-assunto"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
            </div>

            {/* Terceira linha */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="assunto" className="text-sm font-semibold text-sistema-text-primary">
                  Assunto
                </Label>
                <Input
                  id="assunto"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="doc-necessario" className="text-sm font-semibold text-sistema-text-primary">
                  Doc. Necessário
                </Label>
                <Input
                  id="doc-necessario"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="origem" className="text-sm font-semibold text-sistema-text-primary">
                  Origem
                </Label>
                <Input
                  id="origem"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor" className="text-sm font-semibold text-sistema-text-primary">
                  Valor R$
                </Label>
                <Input
                  id="valor"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
            </div>

            {/* Quarta linha */}
            <div className="grid grid-cols-4 gap-6">
              <div className="space-y-2">
                <Label htmlFor="requerente-cpf-cnpj" className="text-sm font-semibold text-sistema-text-primary">
                  Requerente por CPF|CNPJ
                </Label>
                <Input
                  id="requerente-cpf-cnpj"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo-requerente" className="text-sm font-semibold text-sistema-text-primary">
                  Código Requerente
                </Label>
                <Input
                  id="codigo-requerente"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="codigo-nome-requerente" className="text-sm font-semibold text-sistema-text-primary">
                  Código|Nome Requerente
                </Label>
                <Input
                  id="codigo-nome-requerente"
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="sumula-documento" className="text-sm font-semibold text-sistema-text-primary">
                  Sumula do Documento
                </Label>
                <Textarea
                  id="sumula-documento"
                  rows={4}
                  className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary resize-none"
                />
              </div>
            </div>

            {/* Seção Informe os dados */}
            <div className="mt-12">
              <h3 className="text-2xl font-bold text-sistema-text-primary mb-6 border-b-4 border-sistema-text-primary pb-2 inline-block">
                Informe os dados para a primeira tramitação
              </h3>

              <div className="grid grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="requerente-cpf-cnpj-2" className="text-sm font-semibold text-sistema-text-primary">
                      Requerente pro CPF|CNPJ
                    </Label>
                    <Input
                      id="requerente-cpf-cnpj-2"
                      className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setor-destino" className="text-sm font-semibold text-sistema-text-primary">
                      Setor de Destino
                    </Label>
                    <Input
                      id="setor-destino"
                      className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="ultima-tramitacao" className="text-sm font-semibold text-sistema-text-primary">
                      Ultima Tramitação
                    </Label>
                    <Input
                      id="ultima-tramitacao"
                      className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="nome-secretaria" className="text-sm font-semibold text-sistema-text-primary">
                      Nome da Secretaria
                    </Label>
                    <Input
                      id="nome-secretaria"
                      className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="setor-requerente" className="text-sm font-semibold text-sistema-text-primary">
                      Setor de Requerente
                    </Label>
                    <Input
                      id="setor-requerente"
                      className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="local-abertura" className="text-sm font-semibold text-sistema-text-primary">
                      Local de Abertura
                    </Label>
                    <Input
                      id="local-abertura"
                      className="border-sistema-border-medium focus:border-sistema-primary focus:ring-sistema-primary"
                    />
                  </div>
                </div>
              </div>

              {/* Botões de ação principais */}
              <div className="flex justify-end space-x-4 mt-8">
                <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-8 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  Gerar Primeira Tramitação
                </Button>
                <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-8 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200">
                  Gerar Processo em Serie
                </Button>
              </div>
            </div>

            {/* Botões inferiores */}
            <div className="flex flex-wrap gap-3 mt-12 pt-8 border-t border-sistema-border-light">
              <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-6 py-2 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                Etiqueta Protocolo
              </Button>
              <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-6 py-2 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                Etiqueta Internet
              </Button>
              <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-6 py-2 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                Guia(Primeiro Tramite)
              </Button>
              <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-6 py-2 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                Comprovante Abertura
              </Button>
              <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-6 py-2 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                Comprovante Requerente
              </Button>
              <Button className="bg-sistema-primary hover:bg-sistema-secondary text-sistema-text-white px-6 py-2 font-medium rounded-lg shadow-sm hover:shadow-md transition-all duration-200">
                Capa Abertura
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Layout>
  )
}
