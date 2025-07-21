"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FolderOpen, Plus, Link } from "lucide-react"

export default function ApensosPage() {
  const apensos = [
    {
      documento: "2024001",
      tipo: "Ofício",
      unidade: "SMCTIC",
      assunto: "Solicitação de equipamentos de informática",
      termo: "30 dias",
      vinculado: "2024005",
    },
    {
      documento: "2024002",
      tipo: "Memorando",
      unidade: "SMAD",
      assunto: "Relatório mensal de atividades",
      termo: "15 dias",
      vinculado: "2024006",
    },
    {
      documento: "2024003",
      tipo: "Requerimento",
      unidade: "SMED",
      assunto: "Projeto de educação digital",
      termo: "45 dias",
      vinculado: "2024007",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Apensos</h1>
          <p className="text-gray-600">Gerencie documentos apensos e suas vinculações</p>
        </div>

        {/* Formulário para criar apenso */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5" />
              Criar Novo Apenso
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="documentoOrigem">Documento Origem</Label>
                <Input id="documentoOrigem" placeholder="Nº do documento principal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentoApenso">Documento Apenso</Label>
                <Input id="documentoApenso" placeholder="Nº do documento a ser apensado" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo</Label>
                <Input id="motivo" placeholder="Motivo do apenso" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Input id="observacoes" placeholder="Observações adicionais" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input id="responsavel" placeholder="Nome do responsável" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Link className="h-4 w-4 mr-2" />
                  Criar Apenso
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de apensos */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <FolderOpen className="h-5 w-5" />
              Lista de Apensos
            </CardTitle>
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
                  <TableHead className="text-white">Vinculado a</TableHead>
                  <TableHead className="text-white">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apensos.map((apenso) => (
                  <TableRow key={apenso.documento} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{apenso.documento}</TableCell>
                    <TableCell>{apenso.tipo}</TableCell>
                    <TableCell>{apenso.unidade}</TableCell>
                    <TableCell className="max-w-xs truncate">{apenso.assunto}</TableCell>
                    <TableCell>{apenso.termo}</TableCell>
                    <TableCell className="font-medium text-blue-600">{apenso.vinculado}</TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          Visualizar
                        </Button>
                        <Button size="sm" variant="outline">
                          Desapensar
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  )
}
