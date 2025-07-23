"use client"

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { api } from "@/lib/api";

export default function PagamentosPage() {
  const [pagamentos, setPagamentos] = useState<any[]>([]);
  const [form, setForm] = useState({
    protocolo: "",
    fornecedor: "",
    valor: "",
    vencimento: "",
    tipo: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPagamentos() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/pagamentos");
        setPagamentos(res.data);
      } catch (err) {
        setError("Erro ao buscar pagamentos");
      } finally {
        setLoading(false);
      }
    }
    fetchPagamentos();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegistrarPagamento = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        numero_processo_pagamento: form.protocolo,
        valor: parseFloat(form.valor.replace(/[^\d,\.]/g, '').replace(',', '.')),
        data_pagamento: form.vencimento,
        tipo: form.tipo,
        fornecedor: form.fornecedor,
        ano_pagamento: new Date(form.vencimento).getFullYear(),
        identificador: form.protocolo,
        processo_principal_id: 1, // Exemplo fixo
      };
      await api.post("/pagamentos", payload);
      setSuccess("Pagamento registrado com sucesso!");
      setForm({ protocolo: "", fornecedor: "", valor: "", vencimento: "", tipo: "" });
      // Atualiza lista
      const res = await api.get("/pagamentos");
      setPagamentos(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao registrar pagamento");
    } finally {
      setLoading(false);
    }
  };

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
              <Input id="protocolo" value={form.protocolo} onChange={e => handleInputChange("protocolo", e.target.value)} placeholder="2024XXX" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="fornecedor">Fornecedor</Label>
              <Input id="fornecedor" value={form.fornecedor} onChange={e => handleInputChange("fornecedor", e.target.value)} placeholder="Nome do fornecedor" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="valor">Valor</Label>
              <Input id="valor" value={form.valor} onChange={e => handleInputChange("valor", e.target.value)} placeholder="R$ 0,00" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="vencimento">Data Vencimento</Label>
              <Input id="vencimento" type="date" value={form.vencimento} onChange={e => handleInputChange("vencimento", e.target.value)} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="tipo">Tipo</Label>
              <Input id="tipo" value={form.tipo} onChange={e => handleInputChange("tipo", e.target.value)} placeholder="Categoria do pagamento" />
            </div>
            <div className="flex items-end">
              <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleRegistrarPagamento} disabled={loading}>
                {loading ? "Registrando..." : "Registrar Pagamento"}
              </Button>
            </div>
          </div>
          {success && <p className="mt-4 text-green-600">{success}</p>}
          {error && <p className="mt-4 text-red-600">{error}</p>}
        </CardContent>
      </Card>

      {/* Lista de pagamentos */}
      <Card>
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <CardTitle className="text-lg">Lista de Pagamentos</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          {loading && <div className="p-6 text-blue-600">Carregando pagamentos...</div>}
          {error && <div className="p-6 text-red-600">{error}</div>}
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
              {pagamentos.map((pagamento: any) => (
                <TableRow key={pagamento.id ?? pagamento.protocolo} className="hover:bg-gray-50">
                  <TableCell className="font-medium">{pagamento.numero_processo_pagamento ?? pagamento.protocolo ?? "-"}</TableCell>
                  <TableCell>{pagamento.fornecedor ?? "-"}</TableCell>
                  <TableCell className="font-semibold text-green-600">{pagamento.valor ? `R$ ${pagamento.valor}` : "-"}</TableCell>
                  <TableCell>{pagamento.data_pagamento ?? pagamento.vencimento ?? "-"}</TableCell>
                  <TableCell>{pagamento.tipo ?? "-"}</TableCell>
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
                      {pagamento.status ?? "-"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
