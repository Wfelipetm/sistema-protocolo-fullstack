"use client"

import { useState } from "react"
import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

export default function CadastroPrincipalPage() {
  const [formData, setFormData] = useState({
    unidade: "",
    tipoDocumento: "",
    numeroDocumento: "",
    ano: "",
    dataAbertura: "",
    apensoProcesso: "",
    criadoPor: "",
    codigoAssunto: "",
    assunto: "",
    docNecessario: "",
    origem: "",
    valorRS: "",
    requerenteCPFCNPJ: "",
    codigoRequerente: "",
    codigoNomeRequerente: "",
    sumulaDocumento: "",
    requerenteCPFCNPJInfo: "",
    nomeSecretaria: "",
    setorDestino: "",
    setorRequerente: "",
    ultimaTramitacao: "",
    localAbertura: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleGerarPrimeiraTramitacao = () => {
    console.log("Gerando primeira tramitação...")
  }

  const handleGerarProcessoSerie = () => {
    console.log("Gerando processo em série...")
  }

  const actionButtons = [
    { label: "Etiqueta Protocolo", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Etiqueta Internet", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Guia (Primeiro Tramite)", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Comprovante Abertura", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Comprovante Requerente", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Capa Abertura", color: "bg-blue-600 hover:bg-blue-700" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Cadastro Principal</h1>
          <p className="text-gray-600">Cadastre novos protocolos e documentos no sistema</p>
        </div>

        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-lg">Dados do Protocolo</CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Primeira linha */}
              <div className="space-y-2">
                <Label htmlFor="unidade">Unidade</Label>
                <Input
                  id="unidade"
                  value={formData.unidade}
                  onChange={(e) => handleInputChange("unidade", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tipoDocumento">Tipo de Documento</Label>
                <Input
                  id="tipoDocumento"
                  value={formData.tipoDocumento}
                  onChange={(e) => handleInputChange("tipoDocumento", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="numeroDocumento">Nº do Documento</Label>
                <Input
                  id="numeroDocumento"
                  value={formData.numeroDocumento}
                  onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="ano">Ano</Label>
                <Input
                  id="ano"
                  value={formData.ano}
                  onChange={(e) => handleInputChange("ano", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Segunda linha */}
              <div className="space-y-2">
                <Label htmlFor="dataAbertura">Data de Abertura</Label>
                <Input
                  id="dataAbertura"
                  type="date"
                  value={formData.dataAbertura}
                  onChange={(e) => handleInputChange("dataAbertura", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apensoProcesso">Apenso do Processo</Label>
                <Input
                  id="apensoProcesso"
                  value={formData.apensoProcesso}
                  onChange={(e) => handleInputChange("apensoProcesso", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="criadoPor">Criado Por</Label>
                <Input
                  id="criadoPor"
                  value={formData.criadoPor}
                  onChange={(e) => handleInputChange("criadoPor", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoAssunto">Código do Assunto</Label>
                <Input
                  id="codigoAssunto"
                  value={formData.codigoAssunto}
                  onChange={(e) => handleInputChange("codigoAssunto", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Terceira linha */}
              <div className="space-y-2">
                <Label htmlFor="assunto">Assunto</Label>
                <Input
                  id="assunto"
                  value={formData.assunto}
                  onChange={(e) => handleInputChange("assunto", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="docNecessario">Doc. Necessário</Label>
                <Input
                  id="docNecessario"
                  value={formData.docNecessario}
                  onChange={(e) => handleInputChange("docNecessario", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="origem">Origem</Label>
                <Input
                  id="origem"
                  value={formData.origem}
                  onChange={(e) => handleInputChange("origem", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="valorRS">Valor R$</Label>
                <Input
                  id="valorRS"
                  value={formData.valorRS}
                  onChange={(e) => handleInputChange("valorRS", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Quarta linha */}
              <div className="space-y-2">
                <Label htmlFor="requerenteCPFCNPJ">Requerente por CPF|CNPJ</Label>
                <Input
                  id="requerenteCPFCNPJ"
                  value={formData.requerenteCPFCNPJ}
                  onChange={(e) => handleInputChange("requerenteCPFCNPJ", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoRequerente">Código Requerente</Label>
                <Input
                  id="codigoRequerente"
                  value={formData.codigoRequerente}
                  onChange={(e) => handleInputChange("codigoRequerente", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="codigoNomeRequerente">Código|Nome Requerente</Label>
                <Input
                  id="codigoNomeRequerente"
                  value={formData.codigoNomeRequerente}
                  onChange={(e) => handleInputChange("codigoNomeRequerente", e.target.value)}
                  className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2 row-span-3">
                <Label htmlFor="sumulaDocumento">Sumula do Documento</Label>
                <Textarea
                  id="sumulaDocumento"
                  value={formData.sumulaDocumento}
                  onChange={(e) => handleInputChange("sumulaDocumento", e.target.value)}
                  className="min-h-[120px] transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Seção de informações para primeira tramitação */}
            <div className="mt-8">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
                Informe os dados para a primeira tramitação
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="requerenteCPFCNPJInfo">Requerente pro CPF|CNPJ</Label>
                  <Input
                    id="requerenteCPFCNPJInfo"
                    value={formData.requerenteCPFCNPJInfo}
                    onChange={(e) => handleInputChange("requerenteCPFCNPJInfo", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nomeSecretaria">Nome da Secretaria</Label>
                  <Input
                    id="nomeSecretaria"
                    value={formData.nomeSecretaria}
                    onChange={(e) => handleInputChange("nomeSecretaria", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="setorDestino">Setor de Destino</Label>
                  <Input
                    id="setorDestino"
                    value={formData.setorDestino}
                    onChange={(e) => handleInputChange("setorDestino", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="setorRequerente">Setor de Requerente</Label>
                  <Input
                    id="setorRequerente"
                    value={formData.setorRequerente}
                    onChange={(e) => handleInputChange("setorRequerente", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="ultimaTramitacao">Ultima Tramitação</Label>
                  <Input
                    id="ultimaTramitacao"
                    value={formData.ultimaTramitacao}
                    onChange={(e) => handleInputChange("ultimaTramitacao", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="localAbertura">Local de Abertura</Label>
                  <Input
                    id="localAbertura"
                    value={formData.localAbertura}
                    onChange={(e) => handleInputChange("localAbertura", e.target.value)}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Botões de ação */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Button
                onClick={handleGerarPrimeiraTramitacao}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Gerar Primeira Tramitação
              </Button>
              <Button
                onClick={handleGerarProcessoSerie}
                className="bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
              >
                Gerar Processo em Série
              </Button>
            </div>

            {/* Botões de etiquetas e comprovantes */}
            <div className="mt-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className={`${button.color} text-white border-0 transition-all duration-200 transform hover:scale-[1.02] shadow-lg hover:shadow-xl`}
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
