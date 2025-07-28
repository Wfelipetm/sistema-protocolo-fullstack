"use client"

import { useState } from "react"
import Layout from "@/components/layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { api } from "@/lib/api"

// Tipo para o formulário de pagamento
interface PagamentoForm {
  processo_principal_id: number | undefined
  numero_processo_pagamento: string
  ano_pagamento: number
  valor: number | undefined
  data_pagamento: string
  identificador: string
}

export default function Pagamentos() {
  const [formData, setFormData] = useState<PagamentoForm>({
    processo_principal_id: undefined,
    numero_processo_pagamento: "",
    ano_pagamento: new Date().getFullYear(),
    valor: undefined,
    data_pagamento: new Date().toISOString().split('T')[0],
    identificador: "",
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  // Função para atualizar os dados do formulário
  const handleInputChange = (field: keyof PagamentoForm, value: string | number | undefined) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  // Função da API para pagamentos
  const pagamentosApi = {
    criar: async (pagamento: PagamentoForm) => {
      const response = await api.post("/pagamentos", pagamento)
      return response.data
    }
  }

  // Função para submeter o formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      setError(null)
      setSuccess(null)

      // Validação básica
      if (!formData.numero_processo_pagamento || !formData.valor || !formData.processo_principal_id) {
        setError("Processo principal, número do processo de pagamento e valor são obrigatórios")
        return
      }

      await pagamentosApi.criar(formData)
      
      setSuccess("Pagamento cadastrado com sucesso!")
      
      // Limpar formulário após sucesso
      setFormData({
        processo_principal_id: undefined,
        numero_processo_pagamento: "",
        ano_pagamento: new Date().getFullYear(),
        valor: undefined,
        data_pagamento: new Date().toISOString().split('T')[0],
        identificador: "",
      })
      
    } catch (err: any) {
      console.error("Erro ao cadastrar pagamento:", err)
      setError("Erro ao cadastrar pagamento. Tente novamente.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Layout>
      <div className="space-y-6">
        {/* Header */}
        <div className="bg-blue-700 rounded-xl p-6 text-white shadow-md">
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

        {/* Controle de Documentos */}
        <div className="bg-[#eaf6ff80] rounded-xl border border-slate-200 p-8 shadow-md">
          <h2 className="text-3xl font-bold text-black mb-8 border-b-4 border-black pb-2 inline-block">
            Controle de Documentos
          </h2>

          {/* Formulário de Pagamentos */}
          <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-md">
            <div className="bg-blue-700 text-white p-4">
              <h3 className="font-semibold text-lg">Processo Outros(Pagamentos)</h3>
            </div>

            <div className="p-8 space-y-6">
              {/* Mensagens de erro e sucesso */}
              {error && (
                <div className="p-3 bg-red-100 border border-red-400 text-red-700 rounded">
                  {error}
                </div>
              )}
              
              {success && (
                <div className="p-3 bg-green-100 border border-green-400 text-green-700 rounded">
                  {success}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="processo-principal" className="text-sm font-semibold text-black">
                      ID Processo Principal *
                    </Label>
                    <Input
                      id="processo-principal"
                      type="number"
                      value={formData.processo_principal_id?.toString() || ""}
                      onChange={(e) => handleInputChange('processo_principal_id', e.target.value ? parseInt(e.target.value) : undefined)}
                      className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                      placeholder="Digite o ID do processo principal"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="processo-pagamento" className="text-sm font-semibold text-black">
                      Nº Processo de Pagamento *
                    </Label>
                    <Input
                      id="processo-pagamento"
                      value={formData.numero_processo_pagamento}
                      onChange={(e) => handleInputChange('numero_processo_pagamento', e.target.value)}
                      className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                      placeholder="Ex: 2025-001"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="valor" className="text-sm font-semibold text-black">
                      Valor *
                    </Label>
                    <Input
                      id="valor"
                      type="number"
                      step="0.01"
                      value={formData.valor?.toString() || ""}
                      onChange={(e) => handleInputChange('valor', e.target.value ? parseFloat(e.target.value) : undefined)}
                      className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                      placeholder="0,00"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-6 mb-6">
                  <div className="space-y-2">
                    <Label htmlFor="ano-pagamento" className="text-sm font-semibold text-black">
                      Ano do Pagamento
                    </Label>
                    <Input
                      id="ano-pagamento"
                      type="number"
                      value={formData.ano_pagamento.toString()}
                      onChange={(e) => handleInputChange('ano_pagamento', parseInt(e.target.value) || new Date().getFullYear())}
                      className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="data-pagamento" className="text-sm font-semibold text-black">
                      Data de Pagamento
                    </Label>
                    <Input
                      id="data-pagamento"
                      type="date"
                      value={formData.data_pagamento}
                      onChange={(e) => handleInputChange('data_pagamento', e.target.value)}
                      className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="identificador" className="text-sm font-semibold text-black">
                      Identificador
                    </Label>
                    <Input
                      id="identificador"
                      value={formData.identificador}
                      onChange={(e) => handleInputChange('identificador', e.target.value)}
                      className="border-blue-400 focus:border-blue-700 focus:ring-blue-700"
                      placeholder="Ex: PG2025001"
                    />
                  </div>
                </div>

                <div className="flex justify-end pt-4">
                  <Button 
                    type="submit"
                    disabled={loading}
                    className="bg-blue-700 hover:bg-blue-800 text-white px-10 py-3 font-semibold rounded-lg shadow-md hover:shadow-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

