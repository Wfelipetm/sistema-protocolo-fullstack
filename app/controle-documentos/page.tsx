import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ControleDocumentosPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center min-h-[60vh]">
        <Link href="/controle-documentos/dashboard">
          <Button size="lg" className="h-32 px-12 text-xl bg-blue-600 hover:bg-blue-700 rounded-2xl">
            Controle de documentos
          </Button>
        </Link>
      </div>
    </div>
  )
}
