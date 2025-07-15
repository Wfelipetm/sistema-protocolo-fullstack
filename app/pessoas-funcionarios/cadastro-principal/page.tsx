import { Sidebar } from "@/components/sidebar"
import { CadastroPrincipalExact } from "@/components/cadastro-principal-exact"

export default function CadastroPrincipalPage() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 p-6">
        <CadastroPrincipalExact />
      </div>
    </div>
  )
}
