"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Search } from "lucide-react"
import { api } from "@/lib/api"

export default function LocalizarPage() {
  const [searchData, setSearchData] = useState({
    unidade: "",
    tipo: "",
    processo: "",
    ano: "",
    grau: "",
    assunto: "",
    valor: "",
    dataAbertura: "",
    requerente: "",
    nomeSetor: "",
    cnpj: "",
    cpf: "",
    origem: "",
    sumulaProcesso: "",
    numeroDocumento: "",
  })

  const [resultados, setResultados] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (field: string, value: string) => {
    setSearchData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSearch = async () => {
    setLoading(true)
    setError(null)
    setResultados([])
    try {
      // Monta query string dinâmica
      const params = Object.entries(searchData)
        .filter(([_, v]) => v)
        .map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`)
        .join("&")
      const res = await api.get(`/processos${params ? "?" + params : ""}`)
      setResultados(res.data)
    } catch (err: any) {
      setError("Erro ao buscar protocolos")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Localizar</h1>
        <p className="text-gray-600">Busque protocolos e documentos no sistema</p>
      </div>

      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-lg flex items-center gap-2">
            <Search className="h-5 w-5" />
            Filtros de Busca
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primeira linha */}
            <div className="space-y-2">
              <Label htmlFor="unidade">Unidade</Label>
              <Input
                id="unidade"
                value={searchData.unidade}
                onChange={(e) => handleInputChange("unidade", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Digite a unidade"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Input
                id="tipo"
                value={searchData.tipo}
                onChange={(e) => handleInputChange("tipo", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Digite o tipo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="processo">Processo</Label>
              <Input
                id="processo"
                value={searchData.processo}
                onChange={(e) => handleInputChange("processo", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Número do processo"
              />
            </div>

            {/* Segunda linha */}
            <div className="space-y-2">
              <Label htmlFor="ano">Ano</Label>
              <Input
                id="ano"
                value={searchData.ano}
                onChange={(e) => handleInputChange("ano", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Ano do processo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="grau">Grau</Label>
              <Input
                id="grau"
                value={searchData.grau}
                onChange={(e) => handleInputChange("grau", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Grau do processo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="assunto">Assunto</Label>
              <Input
                id="assunto"
                value={searchData.assunto}
                onChange={(e) => handleInputChange("assunto", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Assunto do documento"
              />
            </div>

            {/* Terceira linha */}
            <div className="space-y-2">
              <Label htmlFor="valor">Valor</Label>
              <Input
                id="valor"
                value={searchData.valor}
                onChange={(e) => handleInputChange("valor", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Valor em R$"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="dataAbertura">Data Abertura</Label>
              <Input
                id="dataAbertura"
                type="date"
                value={searchData.dataAbertura}
                onChange={(e) => handleInputChange("dataAbertura", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="requerente">Requerente</Label>
              <Input
                id="requerente"
                value={searchData.requerente}
                onChange={(e) => handleInputChange("requerente", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do requerente"
              />
            </div>

            {/* Quarta linha */}
            <div className="space-y-2">
              <Label htmlFor="nomeSetor">Nome do Setor</Label>
              <Input
                id="nomeSetor"
                value={searchData.nomeSetor}
                onChange={(e) => handleInputChange("nomeSetor", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Nome do setor"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cnpj">CNPJ</Label>
              <Input
                id="cnpj"
                value={searchData.cnpj}
                onChange={(e) => handleInputChange("cnpj", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="00.000.000/0000-00"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="cpf">CPF</Label>
              <Input
                id="cpf"
                value={searchData.cpf}
                onChange={(e) => handleInputChange("cpf", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="000.000.000-00"
              />
            </div>

            {/* Quinta linha */}
            <div className="space-y-2">
              <Label htmlFor="origem">Origem</Label>
              <Input
                id="origem"
                value={searchData.origem}
                onChange={(e) => handleInputChange("origem", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Origem do documento"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sumulaProcesso">Sumula do Processo</Label>
              <Input
                id="sumulaProcesso"
                value={searchData.sumulaProcesso}
                onChange={(e) => handleInputChange("sumulaProcesso", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Sumula do processo"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroDocumento">Número do Documento</Label>
              <Input
                id="numeroDocumento"
                value={searchData.numeroDocumento}
                onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
                className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                placeholder="Número do documento"
              />
            </div>
          </div>

          <div className="mt-8 flex justify-center">
            <Button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl px-8"
            >
              <Search className="h-4 w-4 mr-2" />
              Buscar Protocolos
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Área de resultados (placeholder) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Resultados da Busca</CardTitle>
        </CardHeader>
        <CardContent>
          {loading && <div className="py-6 text-blue-600">Buscando...</div>}
          {error && <div className="py-6 text-red-600">{error}</div>}
          {!loading && !error && resultados.length === 0 && (
            <div className="text-center py-12 text-gray-500">
              <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Utilize os filtros acima para buscar protocolos e documentos</p>
            </div>
          )}
          {!loading && !error && resultados.length > 0 && (
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-blue-500 text-white">
                    <th className="px-4 py-2">Protocolo</th>
                    <th className="px-4 py-2">Tipo</th>
                    <th className="px-4 py-2">Ano</th>
                    <th className="px-4 py-2">Assunto</th>
                    <th className="px-4 py-2">Origem</th>
                    <th className="px-4 py-2">Valor</th>
                    <th className="px-4 py-2">Abertura</th>
                  </tr>
                </thead>
                <tbody>
                  {resultados.map((item: any) => (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="px-4 py-2 font-medium">{item.numero_documento ?? "-"}</td>
                      <td className="px-4 py-2">{item.tipo_documento ?? "-"}</td>
                      <td className="px-4 py-2">{item.ano ?? "-"}</td>
                      <td className="px-4 py-2">{item.assunto ?? "-"}</td>
                      <td className="px-4 py-2">{item.origem ?? "-"}</td>
                      <td className="px-4 py-2">{item.valor_rs ? `R$ ${item.valor_rs}` : "-"}</td>
                      <td className="px-4 py-2">{item.data_abertura ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
