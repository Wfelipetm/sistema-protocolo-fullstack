"use client"

import { useState, useEffect } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { api } from "@/lib/api"
import { Users } from "lucide-react"

// Tipo para Unidade
interface Unidade {
  id: number
  nome: string
}

// Tipo para Secretaria
interface Secretaria {
  id: number
  nome: string
}

// Tipo para Setor
interface Setor {
  id: number
  nome: string
  codigo: string
  secretaria_id: number
}

// Tipo para o formulário de processo
interface ProcessoForm {
  numero_documento: string
  tipo_documento: string
  ano: number
  data_abertura: string
  apenso_processo?: string
  criado_por?: string
  codigo_assunto?: string
  assunto?: string
  doc_necessario?: string
  origem?: string
  valor_rs?: number
  codigo_requerente?: string
  sumula_documento?: string
  unidade_id?: number
  requerente_id?: number
  secretaria_id?: number
  setor_destino_id?: number
  setor_requerente_id?: number
  local_abertura?: string
}

export default function CadastroPrincipal() {
  const [formData, setFormData] = useState<ProcessoForm>({
    numero_documento: "",
    tipo_documento: "",
    ano: new Date().getFullYear(),
    data_abertura: new Date().toISOString().split('T')[0],
    apenso_processo: "",
    criado_por: "",
    codigo_assunto: "",
    assunto: "",
    doc_necessario: "",
    origem: "",
    valor_rs: undefined,
    codigo_requerente: "",
    sumula_documento: "",
    unidade_id: undefined,
    requerente_id: undefined,
    secretaria_id: undefined,
    setor_destino_id: undefined,
    setor_requerente_id: undefined,
    local_abertura: "",
  })

  const [unidades, setUnidades] = useState<Unidade[]>([])
  const [secretarias, setSecretarias] = useState<Secretaria[]>([])
  const [setores, setSetores] = useState<Setor[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Função para atualizar os dados do formulário
  const handleInputChange = (field: keyof ProcessoForm, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Função da API para processos
  const processosApi = {
    criar: async (processo: ProcessoForm) => {
      const response = await api.post("/processos", processo)
      return response.data
    }
  }

  // Função da API para unidades
  const unidadesApi = {
    listarTodas: async (): Promise<Unidade[]> => {
      // Tentar diferentes endpoints possíveis
      const possiveisEndpoints = ["/unidade"]
      
      for (const endpoint of possiveisEndpoints) {
        try {
          console.log(`Tentando endpoint: ${endpoint}`)
          const response = await api.get(endpoint)
          console.log(`Sucesso com endpoint: ${endpoint}`, response.data)
          return response.data
        } catch (err: any) {
          console.log(`Falhou endpoint: ${endpoint}`, err.response?.status)
          continue
        }
      }
      
      throw new Error("Nenhum endpoint de unidades funcionou")
    }
  }

  // Função da API para secretarias
  const secretariasApi = {
    listarTodas: async (): Promise<Secretaria[]> => {
      // Tentar diferentes endpoints possíveis
      const possiveisEndpoints = ["/secretarias"]
      
      for (const endpoint of possiveisEndpoints) {
        try {
          console.log(`Tentando endpoint: ${endpoint}`)
          const response = await api.get(endpoint)
          console.log(`Sucesso com endpoint: ${endpoint}`, response.data)
          return response.data
        } catch (err: any) {
          console.log(`Falhou endpoint: ${endpoint}`, err.response?.status)
          continue
        }
      }
      
      throw new Error("Nenhum endpoint de secretarias funcionou")
    }
  }

  // Função da API para setores
  const setoresApi = {
    listarTodos: async (): Promise<Setor[]> => {
      // Tentar diferentes endpoints possíveis
      const possiveisEndpoints = ["/setores"]
      
      for (const endpoint of possiveisEndpoints) {
        try {
          console.log(`Tentando endpoint: ${endpoint}`)
          const response = await api.get(endpoint)
          console.log(`Sucesso com endpoint: ${endpoint}`, response.data)
          return response.data
        } catch (err: any) {
          console.log(`Falhou endpoint: ${endpoint}`, err.response?.status)
          continue
        }
      }
      
      throw new Error("Nenhum endpoint de setores funcionou")
    }
  }

  // Carregar unidades e secretarias ao montar o componente
  useEffect(() => {
    const carregarDados = async () => {
      try {
        console.log("Iniciando carregamento de dados...")
        
        // Tentar carregar unidades primeiro
        console.log("Carregando unidades...")
        const dadosUnidades = await unidadesApi.listarTodas()
        console.log("Unidades carregadas:", dadosUnidades)
        setUnidades(dadosUnidades)
        
        // Depois carregar secretarias
        console.log("Carregando secretarias...")
        const dadosSecretarias = await secretariasApi.listarTodas()
        console.log("Secretarias carregadas:", dadosSecretarias)
        setSecretarias(dadosSecretarias)
        
        // Por último carregar setores
        console.log("Carregando setores...")
        const dadosSetores = await setoresApi.listarTodos()
        console.log("Setores carregados:", dadosSetores)
        setSetores(dadosSetores)
        
        console.log("Todos os dados carregados com sucesso!")
      } catch (err: any) {
        console.error("Erro ao carregar dados:", err)
        console.error("Detalhes do erro:", {
          status: err.response?.status,
          statusText: err.response?.statusText,
          url: err.config?.url,
          baseURL: err.config?.baseURL,
          message: err.message
        })
        setError(`Erro ao carregar dados: ${err.response?.status || err.message}`)
      }
    }

    carregarDados()
  }, [])

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      // Validação básica
      if (!formData.numero_documento || !formData.tipo_documento) {
        setError("Número do documento e tipo do documento são obrigatórios")
        return
      }

      await processosApi.criar(formData)
      
      setSuccess("Processo cadastrado com sucesso!")
      
      // Limpar formulário após sucesso
      setFormData({
        numero_documento: "",
        tipo_documento: "",
        ano: new Date().getFullYear(),
        data_abertura: new Date().toISOString().split('T')[0],
        apenso_processo: "",
        criado_por: "",
        codigo_assunto: "",
        assunto: "",
        doc_necessario: "",
        origem: "",
        valor_rs: undefined,
        codigo_requerente: "",
        sumula_documento: "",
        unidade_id: undefined,
        requerente_id: undefined,
        secretaria_id: undefined,
        setor_destino_id: undefined,
        setor_requerente_id: undefined,
        local_abertura: "",
      })
      
    } catch (err) {
      console.error("Erro ao cadastrar processo:", err)
      setError("Erro ao cadastrar processo. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="from-sky-600 to-blue-600 bg-gradient-to-r rounded-xl p-4 text-white shadow-md">
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
        <div className="bg-[#eaf6ff80] rounded-xl border p-6 shadow-md">
          <h2 className="text-2xl font-bold text-sky-700 mb-4 border-b-4 border-sky-700 inline-block pb-1">
            Cadastro Principal
          </h2>

          {/* Mensagens de erro e sucesso */}
          {error && (
            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
              {error}
            </div>
          )}
          
          {success && (
            <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {/* Grid principal */}
            <div className="grid grid-cols-12 gap-4 mb-6">
              {/* Coluna 1 */}
              <div className="col-span-2 space-y-4">
                <SelectGroup 
                  label="Unidade" 
                  id="unidade" 
                  value={formData.unidade_id?.toString() || ""} 
                  onChange={(value) => handleInputChange('unidade_id', value ? parseInt(value) : undefined)}
                  options={unidades.map(unidade => ({ 
                    value: unidade.id.toString(), 
                    label: unidade.nome 
                  }))}
                  placeholder="Selecione uma unidade"
                />
                <InputGroup 
                  label="Data de Abertura" 
                  id="data-abertura" 
                  type="date" 
                  value={formData.data_abertura} 
                  onChange={(value) => handleInputChange('data_abertura', value)} 
                />
                <InputGroup 
                  label="Assunto" 
                  id="assunto" 
                  value={formData.assunto || ""} 
                  onChange={(value) => handleInputChange('assunto', value)} 
                />
                <InputGroup 
                  label="Requerente por CPF|CNPJ" 
                  id="requerente-cpf-cnpj" 
                  value={formData.requerente_id?.toString() || ""} 
                  onChange={(value) => handleInputChange('requerente_id', value ? parseInt(value) : undefined)} 
                />
              </div>
              {/* Coluna 2 */}
              <div className="col-span-2 space-y-4">
                <InputGroup 
                  label="Tipo de Documento" 
                  id="tipo-documento" 
                  value={formData.tipo_documento} 
                  onChange={(value) => handleInputChange('tipo_documento', value)} 
                />
                <InputGroup 
                  label="Apenso do Processo" 
                  id="apenso-processo" 
                  value={formData.apenso_processo || ""} 
                  onChange={(value) => handleInputChange('apenso_processo', value)} 
                />
                <InputGroup 
                  label="Doc. Necessário" 
                  id="doc-necessario" 
                  value={formData.doc_necessario || ""} 
                  onChange={(value) => handleInputChange('doc_necessario', value)} 
                />
                <InputGroup 
                  label="Código Requerente" 
                  id="codigo-requerente" 
                  value={formData.codigo_requerente || ""} 
                  onChange={(value) => handleInputChange('codigo_requerente', value)} 
                />
              </div>
              {/* Coluna 3 */}
              <div className="col-span-2 space-y-4">
                <InputGroup 
                  label="Nº do Documento" 
                  id="numero-documento" 
                  value={formData.numero_documento} 
                  onChange={(value) => handleInputChange('numero_documento', value)} 
                />
                <InputGroup 
                  label="Criado Por" 
                  id="criado-por" 
                  value={formData.criado_por || ""} 
                  onChange={(value) => handleInputChange('criado_por', value)} 
                />
                <InputGroup 
                  label="Origem" 
                  id="origem" 
                  value={formData.origem || ""} 
                  onChange={(value) => handleInputChange('origem', value)} 
                />
                <InputGroup 
                  label="Código|Nome Requerente" 
                  id="codigo-nome-requerente" 
                  value={formData.requerente_id?.toString() || ""} 
                  onChange={(value) => handleInputChange('requerente_id', value ? parseInt(value) : undefined)} 
                />
              </div>
              {/* Coluna 4 - Campos menores */}
              <div className="col-span-2 space-y-4">
                <InputGroup 
                  label="Ano" 
                  id="ano" 
                  type="number"
                  value={formData.ano.toString()} 
                  onChange={(value) => handleInputChange('ano', parseInt(value) || new Date().getFullYear())} 
                />
                <InputGroup 
                  label="Código do Assunto" 
                  id="codigo-assunto" 
                  value={formData.codigo_assunto || ""} 
                  onChange={(value) => handleInputChange('codigo_assunto', value)} 
                />
                <InputGroup 
                  label="Valor R$" 
                  id="valor" 
                  type="number"
                  value={formData.valor_rs?.toString() || ""} 
                  onChange={(value) => handleInputChange('valor_rs', value ? parseFloat(value) : undefined)} 
                />
              </div>
              {/* Coluna 5 - Súmula */}
              <div className="col-span-4 flex flex-col">
                <div className="flex-1">
                  <Label htmlFor="sumula-documento" className="text-sm font-semibold text-black">
                    Súmula do Documento
                  </Label>
                  <Textarea
                    id="sumula-documento"
                    value={formData.sumula_documento || ""}
                    onChange={(e) => handleInputChange('sumula_documento', e.target.value)}
                    className="resize-none border border-blue-300 focus:border-blue-700 focus:ring-blue-700 hover:border-blue-400 transition-colors h-52 mt-1 w-full"
                    placeholder="Digite a súmula do documento..."
                  />
                </div>
                {/* Botões */}
                <div className="flex justify-end gap-2 mt-4">
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-9 py-2 rounded shadow text-sm disabled:opacity-50"
                  >
                    {loading ? "Salvando..." : "Salvar Processo"}
                  </Button>
                  <Button 
                    type="button"
                    className="bg-green-700 hover:bg-green-800 text-white px-9 py-2 rounded shadow text-sm"
                  >
                    Gerar Processo em Série
                  </Button>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-sky-700 mb-4 border-b-4 border-sky-700 inline-block pb-1">
              Informe os dados para a primeira tramitação
            </h3>

            {/* Seção da tramitação */}
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="space-y-4">
                <InputGroup 
                  label="Requerente por CPF|CNPJ" 
                  id="requerente-cpf-cnpj-2" 
                  value={formData.requerente_id?.toString() || ""} 
                  onChange={(value) => handleInputChange('requerente_id', value ? parseInt(value) : undefined)} 
                />
                <SelectGroup 
                  label="Setor de Destino" 
                  id="setor-destino" 
                  value={formData.setor_destino_id?.toString() || ""} 
                  onChange={(value) => handleInputChange('setor_destino_id', value ? parseInt(value) : undefined)}
                  options={setores.map(setor => ({ 
                    value: setor.id.toString(), 
                    label: `${setor.nome} (${setor.codigo})` 
                  }))}
                  placeholder="Selecione um setor"
                />
                <InputGroup 
                  label="Última Tramitação" 
                  id="ultima-tramitacao" 
                />
              </div>
              <div className="space-y-4">
                <SelectGroup 
                  label="Nome da Secretaria" 
                  id="nome-secretaria" 
                  value={formData.secretaria_id?.toString() || ""} 
                  onChange={(value) => handleInputChange('secretaria_id', value ? parseInt(value) : undefined)}
                  options={secretarias.map(secretaria => ({ 
                    value: secretaria.id.toString(), 
                    label: secretaria.nome 
                  }))}
                  placeholder="Selecione uma secretaria"
                />
                <SelectGroup 
                  label="Setor de Requerente" 
                  id="setor-requerente" 
                  value={formData.setor_requerente_id?.toString() || ""} 
                  onChange={(value) => handleInputChange('setor_requerente_id', value ? parseInt(value) : undefined)}
                  options={setores.map(setor => ({ 
                    value: setor.id.toString(), 
                    label: `${setor.nome} (${setor.codigo})` 
                  }))}
                  placeholder="Selecione um setor"
                />
                <InputGroup 
                  label="Local de Abertura" 
                  id="local-abertura" 
                  value={formData.local_abertura || ""} 
                  onChange={(value) => handleInputChange('local_abertura', value)} 
                />
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
                  className="bg-[#103977] hover:bg-[#eaf6ff80] text-white border hover:text-[#103977] hover:border-[#103977] hover:border hover:font-medium px-14 py-2 rounded shadow transition-colors"
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

// Componente reutilizável para Input
const InputGroup = ({
  label,
  id,
  type = "text",
  value,
  onChange,
}: {
  label: string
  id: string
  type?: string
  value?: string
  onChange?: (value: string) => void
}) => (
  <div className="space-y-1">
    <Label htmlFor={id} className="text-sm font-semibold text-black">
      {label}
    </Label>
    <Input
      id={id}
      type={type}
      value={value || ""}
      onChange={(e) => onChange?.(e.target.value)}
      className="border border-blue-300 focus:border-blue-700 focus:ring-blue-700 hover:border-blue-400 transition-colors"
    />
  </div>
)

// Componente reutilizável para Select
const SelectGroup = ({
  label,
  id,
  value,
  onChange,
  options,
  placeholder = "Selecione uma opção"
}: {
  label: string
  id: string
  value?: string
  onChange?: (value: string) => void
  options: { value: string; label: string }[]
  placeholder?: string
}) => (
  <div className="space-y-1">
    <Label htmlFor={id} className="text-sm font-semibold text-black">
      {label}
    </Label>
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="border border-blue-300 focus:border-blue-700 focus:ring-blue-700 hover:border-blue-400 transition-colors">
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
)

