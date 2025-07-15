import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-4xl">
          <Link href="/pessoas-funcionarios">
            <Button size="lg" className="w-full h-32 text-xl bg-blue-600 hover:bg-blue-700">
              Pessoas Funcionários
            </Button>
          </Link>

          <Link href="/controle-documentos">
            <Button size="lg" className="w-full h-32 text-xl bg-blue-600 hover:bg-blue-700">
              Controle de Documentos
            </Button>
          </Link>

          <Link href="/pagamentos">
            <Button size="lg" className="w-full h-32 text-xl bg-blue-600 hover:bg-blue-700">
              Pagamentos
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
