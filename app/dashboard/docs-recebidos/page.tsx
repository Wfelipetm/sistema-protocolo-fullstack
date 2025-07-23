"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"
import { useEffect, useState } from "react";
import { api } from "@/lib/api";

export default function DocsRecebidosPage() {
  const [documentos, setDocumentos] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDocs() {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get("/documentos-controle");
        setDocumentos(res.data);
      } catch (err: any) {
        setError("Erro ao buscar documentos recebidos");
      } finally {
        setLoading(false);
      }
    }
    fetchDocs();
  }, []);

  return (

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
            {loading && <div className="p-6 text-blue-600">Carregando documentos...</div>}
            {error && <div className="p-6 text-red-600">{error}</div>}
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
                {documentos.map((doc: any) => (
                  <TableRow key={doc.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">{doc.id ?? "-"}</TableCell>
                    <TableCell>{doc.remetente ?? doc.enviado_por ?? "-"}</TableCell>
                    <TableCell>{doc.assunto ?? doc.docs_guia ?? "-"}</TableCell>
                    <TableCell>{doc.dataRecebimento ?? doc.data_envio ?? "-"}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          doc.status === "Novo"
                            ? "destructive"
                            : doc.status === "Lido"
                              ? "default"
                              : "secondary"
                        }
                      >
                        {doc.status ?? "-"}
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
                        {doc.prioridade ?? "-"}
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

  )
}
