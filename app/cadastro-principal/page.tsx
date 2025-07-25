import Layout from "@/components/layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Users } from "lucide-react";

export default function CadastroPrincipal() {
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-blue-700 rounded-xl p-6 text-white shadow-md">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
              <Users className="w-8 h-8" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">Sistema de protocolo</h1>
              <p className="text-white/90 text-lg">Prefeitura Municipal de Itaguaí - Secretaria de Administração</p>
            </div>
          </div>
        </div>

        {/* Formulário */}
        <div className="bg-[#eaf6ff80] rounded-xl border border-slate-300 p-6 shadow-md">
          <h2 className="text-2xl font-bold text-black mb-4 border-b-4 border-black inline-block pb-1">
            Cadastro Principal
          </h2>

          <form>
            {/* Grid principal */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              {/* Coluna 1 */}
              <div className="col-span-2 space-y-4">
                <InputGroup label="Unidade" id="unidade" />
                <InputGroup label="Data de Abertura" id="data-abertura" type="date" />
                <InputGroup label="Assunto" id="assunto" />
                <InputGroup label="Requerente por CPF|CNPJ" id="requerente-cpf-cnpj" />
              </div>
              {/* Coluna 2 */}
              <div className="col-span-2 space-y-4">
                <InputGroup label="Tipo de Documento" id="tipo-documento" />
                <InputGroup label="Apenso do Processo" id="apenso-processo" />
                <InputGroup label="Doc. Necessário" id="doc-necessario" />
                <InputGroup label="Código Requerente" id="codigo-requerente" />
              </div>
              {/* Coluna 3 */}
              <div className="col-span-2 space-y-4">
                <InputGroup label="Nº do Documento" id="numero-documento" />
                <InputGroup label="Criado Por" id="criado-por" />
                <InputGroup label="Origem" id="origem" />
                <InputGroup label="Código|Nome Requerente" id="codigo-nome-requerente" />
              </div>
              {/* Coluna 4 - Campos menores */}
              <div className="col-span-2 space-y-4">
                <InputGroup label="Ano" id="ano" />
                <InputGroup label="Código do Assunto" id="codigo-assunto" />
                <InputGroup label="Valor R$" id="valor" />
              </div>
              {/* Coluna 5 - Súmula */}
              <div className="col-span-4 flex flex-col">
                <div className="flex-1">
                  <Label htmlFor="sumula-documento" className="text-sm font-semibold text-black">
                    Súmula do Documento
                  </Label>
                  <Textarea
                    id="sumula-documento"
                    className="resize-none border border-blue-300 focus:border-blue-700 focus:ring-blue-700 hover:border-blue-400 transition-colors h-52 mt-1 w-full"
                    placeholder="Digite a súmula do documento..."
                  />
                </div>
                {/* Botões */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white px-9 py-2 rounded shadow text-sm">
                    Gerar Primeira Tramitação
                  </Button>
                  <Button className="bg-blue-700 hover:bg-blue-800 text-white px-9 py-2 rounded shadow text-sm">
                    Gerar Processo em Série
                  </Button>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-black mb-4 border-b-4 border-black inline-block pb-1">
              Informe os dados para a primeira tramitação
            </h3>

            {/* Seção da tramitação */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <InputGroup label="Requerente por CPF|CNPJ" id="requerente-cpf-cnpj-2" />
                <InputGroup label="Setor de Destino" id="setor-destino" />
                <InputGroup label="Última Tramitação" id="ultima-tramitacao" />
              </div>
              <div className="space-y-4">
                <InputGroup label="Nome da Secretaria" id="nome-secretaria" />
                <InputGroup label="Setor de Requerente" id="setor-requerente" />
                <InputGroup label="Local de Abertura" id="local-abertura" />
              </div>
            </div>

            {/* Botões inferiores */}
            <div className="flex flex-wrap gap-2 border-t border-blue-300 pt-6">
              {[
                "Etiqueta Protocolo",
                "Etiqueta Internet",
                "Guia(Primeiro Tramite)",
                "Comprovante Abertura",
                "Comprovante Requerente",
                "Capa Abertura",
              ].map((label, idx) => (
                <Button
                  key={idx}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-6 py-2 rounded shadow transition-colors"
                >
                  {label}
                </Button>
              ))}
            </div>
          </form>
        </div>
      </div>
    </Layout>
  );
}

// Componente reutilizável
const InputGroup = ({
  label,
  id,
  type = "text",
}: {
  label: string;
  id: string;
  type?: string;
}) => (
  <div className="space-y-1">
    <Label htmlFor={id} className="text-sm font-semibold text-black">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      className="border border-blue-300 focus:border-blue-700 focus:ring-blue-700 hover:border-blue-400 transition-colors"
    />
  </div>
);

