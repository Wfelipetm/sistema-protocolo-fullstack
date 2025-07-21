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
    { label: "Guia(Primeiro Tramite)", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Comprovante Abertura", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Comprovante Requerente", color: "bg-blue-600 hover:bg-blue-700" },
    { label: "Capa Abertura", color: "bg-blue-600 hover:bg-blue-700" },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Título da página */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 border-b-4 border-black pb-2 inline-block">
            Cadastro Principal
          </h1>
        </div>

        {/* Formulário Principal - sem card wrapper */}
        <div className="bg-white rounded-lg p-6">
          {/* Primeira seção - Dados principais */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {/* Linha 1 */}
            <div className="space-y-2">
              <Label htmlFor="unidade" className="text-sm font-medium text-gray-700">
                Unidade
              </Label>
              <Input
                id="unidade"
                value={formData.unidade}
                onChange={(e) => handleInputChange("unidade", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tipoDocumento" className="text-sm font-medium text-gray-700">
                Tipo de Documento
              </Label>
              <Input
                id="tipoDocumento"
                value={formData.tipoDocumento}
                onChange={(e) => handleInputChange("tipoDocumento", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="numeroDocumento" className="text-sm font-medium text-gray-700">
                Nº do Documento
              </Label>
              <Input
                id="numeroDocumento"
                value={formData.numeroDocumento}
                onChange={(e) => handleInputChange("numeroDocumento", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ano" className="text-sm font-medium text-gray-700">
                Ano
              </Label>
              <Input
                id="ano"
                value={formData.ano}
                onChange={(e) => handleInputChange("ano", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            {/* Linha 2 */}
            <div className="space-y-2">
              <Label htmlFor="dataAbertura" className="text-sm font-medium text-gray-700">
                Data de Abertura
              </Label>
              <Input
                id="dataAbertura"
                type="date"
                value={formData.dataAbertura}
                onChange={(e) => handleInputChange("dataAbertura", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="apensoProcesso" className="text-sm font-medium text-gray-700">
                Apenso do Processo
              </Label>
              <Input
                id="apensoProcesso"
                value={formData.apensoProcesso}
                onChange={(e) => handleInputChange("apensoProcesso", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="criadoPor" className="text-sm font-medium text-gray-700">
                Criado Por
              </Label>
              <Input
                id="criadoPor"
                value={formData.criadoPor}
                onChange={(e) => handleInputChange("criadoPor", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigoAssunto" className="text-sm font-medium text-gray-700">
                Código do Assunto
              </Label>
              <Input
                id="codigoAssunto"
                value={formData.codigoAssunto}
                onChange={(e) => handleInputChange("codigoAssunto", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            {/* Linha 3 */}
            <div className="space-y-2">
              <Label htmlFor="assunto" className="text-sm font-medium text-gray-700">
                Assunto
              </Label>
              <Input
                id="assunto"
                value={formData.assunto}
                onChange={(e) => handleInputChange("assunto", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="docNecessario" className="text-sm font-medium text-gray-700">
                Doc. Necessário
              </Label>
              <Input
                id="docNecessario"
                value={formData.docNecessario}
                onChange={(e) => handleInputChange("docNecessario", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="origem" className="text-sm font-medium text-gray-700">
                Origem
              </Label>
              <Input
                id="origem"
                value={formData.origem}
                onChange={(e) => handleInputChange("origem", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="valorRS" className="text-sm font-medium text-gray-700">
                Valor R$
              </Label>
              <Input
                id="valorRS"
                value={formData.valorRS}
                onChange={(e) => handleInputChange("valorRS", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            {/* Linha 4 */}
            <div className="space-y-2">
              <Label htmlFor="requerenteCPFCNPJ" className="text-sm font-medium text-gray-700">
                Requerente por CPF|CNPJ
              </Label>
              <Input
                id="requerenteCPFCNPJ"
                value={formData.requerenteCPFCNPJ}
                onChange={(e) => handleInputChange("requerenteCPFCNPJ", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigoRequerente" className="text-sm font-medium text-gray-700">
                Código Requerente
              </Label>
              <Input
                id="codigoRequerente"
                value={formData.codigoRequerente}
                onChange={(e) => handleInputChange("codigoRequerente", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="codigoNomeRequerente" className="text-sm font-medium text-gray-700">
                Código|Nome Requerente
              </Label>
              <Input
                id="codigoNomeRequerente"
                value={formData.codigoNomeRequerente}
                onChange={(e) => handleInputChange("codigoNomeRequerente", e.target.value)}
                className="h-9 border-gray-300"
              />
            </div>

            {/* Sumula do Documento - posicionada como na imagem */}
            <div className="space-y-2">
              <Label htmlFor="sumulaDocumento" className="text-sm font-medium text-gray-700">
                Sumula do Documento
              </Label>
              <Textarea
                id="sumulaDocumento"
                value={formData.sumulaDocumento}
                onChange={(e) => handleInputChange("sumulaDocumento", e.target.value)}
                className="min-h-[80px] border-gray-300"
                rows={3}
              />
            </div>
          </div>

          {/* Segunda seção - Primeira tramitação */}
          <div className="mt-8">
            <h2 className="text-lg font-bold text-gray-900 border-b-4 border-black pb-2 mb-6 inline-block">
              Informe os dados para a primeira tramitação
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {/* Primeira linha da seção tramitação */}
              <div className="space-y-2">
                <Label htmlFor="requerenteCPFCNPJInfo" className="text-sm font-medium text-gray-700">
                  Requerente pro CPF|CNPJ
                </Label>
                <Input
                  id="requerenteCPFCNPJInfo"
                  value={formData.requerenteCPFCNPJInfo}
                  onChange={(e) => handleInputChange("requerenteCPFCNPJInfo", e.target.value)}
                  className="h-9 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="nomeSecretaria" className="text-sm font-medium text-gray-700">
                  Nome da Secretaria
                </Label>
                <Input
                  id="nomeSecretaria"
                  value={formData.nomeSecretaria}
                  onChange={(e) => handleInputChange("nomeSecretaria", e.target.value)}
                  className="h-9 border-gray-300"
                />
              </div>

              {/* Botões posicionados como na imagem */}
              <div className="flex flex-col gap-2 lg:row-span-2">
                <Button 
                  onClick={handleGerarPrimeiraTramitacao}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
                >
                  Gerar Primeira Tramitação
                </Button>
                <Button 
                  onClick={handleGerarProcessoSerie}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
                >
                  Gerar Processo em Série
                </Button>
              </div>

              {/* Segunda linha da seção tramitação */}
              <div className="space-y-2">
                <Label htmlFor="setorDestino" className="text-sm font-medium text-gray-700">
                  Setor de Destino
                </Label>
                <Input
                  id="setorDestino"
                  value={formData.setorDestino}
                  onChange={(e) => handleInputChange("setorDestino", e.target.value)}
                  className="h-9 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="setorRequerente" className="text-sm font-medium text-gray-700">
                  Setor de Requerente
                </Label>
                <Input
                  id="setorRequerente"
                  value={formData.setorRequerente}
                  onChange={(e) => handleInputChange("setorRequerente", e.target.value)}
                  className="h-9 border-gray-300"
                />
              </div>

              {/* Terceira linha da seção tramitação */}
              <div className="space-y-2">
                <Label htmlFor="ultimaTramitacao" className="text-sm font-medium text-gray-700">
                  Ultima Tramitação
                </Label>
                <Input
                  id="ultimaTramitacao"
                  value={formData.ultimaTramitacao}
                  onChange={(e) => handleInputChange("ultimaTramitacao", e.target.value)}
                  className="h-9 border-gray-300"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="localAbertura" className="text-sm font-medium text-gray-700">
                  Local de Abertura
                </Label>
                <Input
                  id="localAbertura"
                  value={formData.localAbertura}
                  onChange={(e) => handleInputChange("localAbertura", e.target.value)}
                  className="h-9 border-gray-300"
                />
              </div>
            </div>

            {/* Botões de etiquetas e comprovantes */}
            <div className="mt-6 flex flex-wrap gap-2">
              {actionButtons.map((button, index) => (
                <Button
                  key={index}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm"
                >
                  {button.label}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}
