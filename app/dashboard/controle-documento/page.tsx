"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { api } from "@/lib/api"

type Apenso = {
  documento?: string
  tipo?: string
  unidade?: string
  assunto?: string
  termo?: string
  [key: string]: any
}

type Historico = {
  processo?: string
  data?: string
  situacao?: string
  responsavel?: string
  [key: string]: any
}

export default function ControleDocumentoPage() {
  const [formData, setFormData] = useState({
    processoAno: "",
    processoAnoPagamento: "",
    valor: "",
    dataPagamento: "",
    identificador: "",
  })
  const [apensosList, setApensosList] = useState<Apenso[]>([])
  const [historicoList, setHistoricoList] = useState<Historico[]>([])
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Buscar apensos e histórico
    async function fetchData() {
      setLoading(true)
      try {
        const apensosRes = await api.get("/documentos-controle")
        setApensosList(apensosRes.data)
        const historicoRes = await api.get("/pagamentos")
        setHistoricoList(historicoRes.data)
      } catch (err) {
        setError("Erro ao buscar dados")
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleCadastrar = async () => {
    setLoading(true)
    setError(null)
    setSuccess(null)
    try {
      // Exemplo: processo_principal_id fixo para teste
      const payload = {
        processo_principal_id: 1,
        numero_processo_pagamento: formData.processoAnoPagamento,
        ano_pagamento: new Date(formData.dataPagamento).getFullYear(),
        valor: parseFloat(formData.valor),
        data_pagamento: formData.dataPagamento,
        identificador: formData.identificador,
      }
      await api.post("/pagamentos", payload)
      setSuccess("Pagamento cadastrado com sucesso!")
      setFormData({ processoAno: "", processoAnoPagamento: "", valor: "", dataPagamento: "", identificador: "" })
      // Atualiza histórico
      const historicoRes = await api.get("/pagamentos")
      setHistoricoList(historicoRes.data)
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao cadastrar pagamento")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Controle de Documentos</h1>
        <p className="text-gray-600">Gerencie e acompanhe documentos e processos</p>
      </div>

      <Tabs defaultValue="pagamentos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="pagamentos">Processo Outros (Pagamentos)</TabsTrigger>
          <TabsTrigger value="apensos">Lista Apensos</TabsTrigger>
          <TabsTrigger value="historico">Lista Histórico</TabsTrigger>
        </TabsList>

        <TabsContent value="pagamentos">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">Processo Outros (Pagamentos)</CardTitle>
            </CardHeader>
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="processoAno">Nº Processo e Ano (Principal)</Label>
                  <Input
                    id="processoAno"
                    value={formData.processoAno}
                    onChange={(e) => handleInputChange("processoAno", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="processoAnoPagamento">Nº Processo e Ano (Pagamento)</Label>
                  <Input
                    id="processoAnoPagamento"
                    value={formData.processoAnoPagamento}
                    onChange={(e) => handleInputChange("processoAnoPagamento", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="valor">Valor</Label>
                  <Input
                    id="valor"
                    value={formData.valor}
                    onChange={(e) => handleInputChange("valor", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="dataPagamento">Data de Pagamento</Label>
                  <Input
                    id="dataPagamento"
                    type="date"
                    value={formData.dataPagamento}
                    onChange={(e) => handleInputChange("dataPagamento", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="identificador">Identificador</Label>
                  <Input
                    id="identificador"
                    value={formData.identificador}
                    onChange={(e) => handleInputChange("identificador", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-end">
                  <Button
                    onClick={handleCadastrar}
                    className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl"
                    disabled={loading}
                  >
                    {loading ? "Cadastrando..." : "Cadastrar"}
                  </Button>
                </div>
              </div>

              {success && <p className="mt-4 text-green-600">{success}</p>}
              {error && <p className="mt-4 text-red-600">{error}</p>}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="apensos">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">Lista Apensos</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 hover:bg-blue-500">
                    <TableHead className="text-white">Nº Documento</TableHead>
                    <TableHead className="text-white">Tipo de Documento</TableHead>
                    <TableHead className="text-white">Unidade</TableHead>
                    <TableHead className="text-white">Assunto</TableHead>
                    <TableHead className="text-white">Termo</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {apensosList.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.documento ?? "-"}</TableCell>
                      <TableCell>{item.tipo ?? "-"}</TableCell>
                      <TableCell>{item.unidade ?? "-"}</TableCell>
                      <TableCell>{item.assunto ?? "-"}</TableCell>
                      <TableCell>{item.termo ?? "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="historico">
          <Card>
            <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
              <CardTitle className="text-lg">Lista Histórico</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow className="bg-blue-500 hover:bg-blue-500">
                    <TableHead className="text-white">Nº Processo</TableHead>
                    <TableHead className="text-white">Data</TableHead>
                    <TableHead className="text-white">Situação</TableHead>
                    <TableHead className="text-white">Responsável</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {historicoList.map((item, index) => (
                    <TableRow key={index} className="hover:bg-gray-50">
                      <TableCell className="font-medium">{item.processo ?? "-"}</TableCell>
                      <TableCell>{item.data ?? "-"}</TableCell>
                      <TableCell>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            item.situacao === "Finalizado"
                              ? "bg-green-100 text-green-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {item.situacao ?? "-"}
                        </span>
                      </TableCell>
                      <TableCell>{item.responsavel ?? "-"}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
