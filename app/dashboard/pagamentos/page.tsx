"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { DollarSign } from "lucide-react"

export default function PagamentosPage() {
  const pagamentos = [
    {
      protocolo: "2024001",
      fornecedor: "Tech Solutions Ltda",
      valor: "R$ 15.000,00",
      vencimento: "20/01/2024",
      status: "Pendente",
      tipo: "Equipamentos",
    },
    {
      protocolo: "2024002",
      fornecedor: "Papelaria Central",
      valor: "R$ 2.500,00",
      vencimento: "18/01/2024",
      status: "Pago",
      tipo: "Material de Escritório",
    },
    {
      protocolo: "2024003",
      fornecedor: "Construtora ABC",
      valor: "R$ 50.000,00",
      vencimento: "25/01/2024",
      status: "Em Análise",
      tipo: "Obras",
    },
  ]

  return (

      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Pagamentos</h1>
          <p className="text-gray-600">Controle de pagamentos e despesas</p>
        </div>

        {/* Formulário de novo pagamento */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-lg flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Registrar Novo Pagamento
            </CardTitle>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-2">
                <Label htmlFor="protocolo">Nº Protocolo</Label>
                <Input id="protocolo" placeholder="2024XXX" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="fornecedor">Fornecedor</Label>
                <Input id="fornecedor" placeholder="Nome do fornecedor" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="valor">Valor</Label>
                <Input id="valor" placeholder="R$ 0,00" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="vencimento">Data Vencimento</Label>
                <Input id="vencimento" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tipo">Tipo</Label>
                <Input id="tipo" placeholder="Categoria do pagamento" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-600 hover:bg-blue-700">Registrar Pagamento</Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Lista de pagamentos */}
        <Card>
          <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
            <CardTitle className="text-lg">Lista de Pagamentos</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow className="bg-blue-500 hover:bg-blue-500">
                  <TableHead className="text-white">Protocolo</TableHead>
                  <TableHead className="text-white">Fornecedor</TableHead>
                  <TableHead className="text-white">Valor</TableHead>
                  <TableHead className="text-white">Vencimento</TableHead>
                  <TableHead className="text-white">Tipo</TableHead>
                  <TableHead className="text-white">Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pagamentos.map((pagamento) => (
                  <TableRow key={pagamento.protocolo} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{pagamento.protocolo}</TableCell>
                    <TableCell>{pagamento.fornecedor}</TableCell>
                    <TableCell className="font-semibold text-green-600">{pagamento.valor}</TableCell>
                    <TableCell>{pagamento.vencimento}</TableCell>
                    <TableCell>{pagamento.tipo}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          pagamento.status === "Pago"
                            ? "default"
                            : pagamento.status === "Pendente"
                              ? "destructive"
                              : "secondary"
                        }
                      >
                        {pagamento.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

  )
}
