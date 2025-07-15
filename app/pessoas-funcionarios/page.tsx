import { Sidebar } from "@/components/sidebar"

export default function PessoasFuncionariosPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <div className="text-center py-20">
          <h2 className="text-2xl font-semibold text-gray-600">Selecione uma opção no menu lateral</h2>
        </div>
      </div>
    </div>
  )
}
