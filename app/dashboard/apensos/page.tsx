"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { FolderOpen, Plus, Link } from "lucide-react"
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function ApensosPage() {
  const [apensos, setApensos] = useState<any[]>([]);
  const [form, setForm] = useState({
    documentoOrigem: "",
    documentoApenso: "",
    motivo: "",
    observacoes: "",
    responsavel: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchApensos() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/documentos-controle");
        setApensos(res.data);
      } catch (err) {
        setError("Erro ao buscar apensos");
      } finally {
        setLoading(false);
      }
    }
    fetchApensos();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleCriarApenso = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const payload = {
        processo_id: form.documentoOrigem,
        apensos: form.documentoApenso,
        docs_guia: form.motivo,
        numero_guia: form.observacoes,
        enviado_por: form.responsavel,
        data_envio: new Date().toISOString().slice(0, 10),
      };
      await api.post("/documentos-controle", payload);
      setSuccess("Apenso criado com sucesso!");
      setForm({ documentoOrigem: "", documentoApenso: "", motivo: "", observacoes: "", responsavel: "" });
      // Atualiza lista
      const res = await api.get("/documentos-controle");
      setApensos(res.data);
    } catch (err: any) {
      setError(err.response?.data?.error || "Erro ao criar apenso");
    } finally {
      setLoading(false);
    }
  };

  return (

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
                <Input id="documentoOrigem" value={form.documentoOrigem} onChange={e => handleInputChange("documentoOrigem", e.target.value)} placeholder="Nº do documento principal" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="documentoApenso">Documento Apenso</Label>
                <Input id="documentoApenso" value={form.documentoApenso} onChange={e => handleInputChange("documentoApenso", e.target.value)} placeholder="Nº do documento a ser apensado" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="motivo">Motivo</Label>
                <Input id="motivo" value={form.motivo} onChange={e => handleInputChange("motivo", e.target.value)} placeholder="Motivo do apenso" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="observacoes">Observações</Label>
                <Input id="observacoes" value={form.observacoes} onChange={e => handleInputChange("observacoes", e.target.value)} placeholder="Observações adicionais" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="responsavel">Responsável</Label>
                <Input id="responsavel" value={form.responsavel} onChange={e => handleInputChange("responsavel", e.target.value)} placeholder="Nome do responsável" />
              </div>
              <div className="flex items-end">
                <Button className="bg-blue-600 hover:bg-blue-700" onClick={handleCriarApenso} disabled={loading}>
                  <Link className="h-4 w-4 mr-2" />
                  {loading ? "Criando..." : "Criar Apenso"}
                </Button>
              </div>
            </div>
            {success && <p className="mt-4 text-green-600">{success}</p>}
            {error && <p className="mt-4 text-red-600">{error}</p>}
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
            {loading && <div className="p-6 text-blue-600">Carregando apensos...</div>}
            {error && <div className="p-6 text-red-600">{error}</div>}
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
                {apensos.map((apenso: any) => (
                  <TableRow key={apenso.id ?? apenso.documento} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{apenso.documento ?? apenso.numero_guia ?? "-"}</TableCell>
                    <TableCell>{apenso.tipo ?? "-"}</TableCell>
                    <TableCell>{apenso.unidade ?? "-"}</TableCell>
                    <TableCell className="max-w-xs truncate">{apenso.assunto ?? apenso.docs_guia ?? "-"}</TableCell>
                    <TableCell>{apenso.termo ?? "-"}</TableCell>
                    <TableCell className="font-medium text-blue-600">{apenso.vinculado ?? apenso.apensos ?? "-"}</TableCell>
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

  )
}
