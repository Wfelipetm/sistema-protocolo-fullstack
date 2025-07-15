import { DocsRecebidos } from "@/components/docs-recebidos"

export default function DocsRecebidosPage() {
  return (
    <div className="flex">
      <div className="w-80 bg-blue-600 min-h-screen p-6">
        <div className="space-y-4">
          <a href="/pessoas-funcionarios/cadastro-principal" className="block">
            <div className="w-full text-left py-4 px-6 bg-blue-700 hover:bg-blue-800 text-white border-0 rounded">
              Cadastro Principal
            </div>
          </a>

          <div className="w-full text-left py-4 px-6 bg-blue-800 text-white border-0 rounded">Docs. Recebidos</div>

          <a href="/pessoas-funcionarios/apensos" className="block">
            <div className="w-full text-left py-4 px-6 bg-blue-700 hover:bg-blue-800 text-white border-0 rounded">
              Apensos
            </div>
          </a>

          <a href="/pessoas-funcionarios/localizar" className="block">
            <div className="w-full text-left py-4 px-6 bg-blue-700 hover:bg-blue-800 text-white border-0 rounded">
              Localizar
            </div>
          </a>
        </div>
      </div>
      <div className="flex-1 p-6">
        <DocsRecebidos />
      </div>
    </div>
  )
}
