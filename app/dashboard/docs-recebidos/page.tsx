"use client"

import { DashboardLayout } from "@/components/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

export default function DocsRecebidosPage() {
  const documentos = [
    {
      id: "2024001",
      remetente: "SMCTIC",
      assunto: "Solicitação de equipamentos",
      dataRecebimento: "15/01/2024",
      status: "Novo",
      prioridade: "Alta",
    },
    {
      id: "2024002",
      remetente: "SMAD",
      assunto: "Relatório mensal",
      dataRecebimento: "14/01/2024",
      status: "Lido",
      prioridade: "Média",
    },
    {
      id: "2024003",
      remetente: "SMED",
      assunto: "Projeto educacional",
      dataRecebimento: "13/01/2024",
      status: "Respondido",
      prioridade: "Baixa",
    },
  ]

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Documentos Recebidos</h1>
          <p className="text-gray-600">Gerencie documentos recebidos de outras secretarias</p>
        </div>

        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-lg">Lista de Documentos Recebidos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 hover:bg-blue-500">
                  <TableHead className="text-white">Protocolo</TableHead>
                  <TableHead className="text-white">Remetente</TableHead>
                  <TableHead className="text-white">Assunto</TableHead>
                  <TableHead className="text-white">Data Recebimento</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                  <TableHead className="text-white">Prioridade</TableHead>
                  <TableHead className="text-white">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {documentos.map((doc) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{doc.id}</TableCell>
                    <TableCell>{doc.remetente}</TableCell>
                    <TableCell>{doc.assunto}</TableCell>
                    <TableCell>{doc.dataRecebimento}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.status === "Novo" ? "destructive" : doc.status === "Lido" ? "default" : "secondary"
                        }
                      >
                        {doc.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.prioridade === "Alta"
                            ? "destructive"
                            : doc.prioridade === "Média"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {doc.prioridade}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button size="sm" variant="outline">
                          <Download className="h-4 w-4" />
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
