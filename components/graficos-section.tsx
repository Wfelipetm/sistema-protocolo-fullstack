export function GraficosSection() {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold text-blue-800">Gráficos</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="border-2 border-gray-300 rounded-lg bg-blue-50 min-h-[300px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-semibold">Gráfico 1</div>
            <div className="text-sm">Dados não disponíveis</div>
          </div>
        </div>

        <div className="border-2 border-gray-300 rounded-lg bg-blue-50 min-h-[300px] flex items-center justify-center">
          <div className="text-center text-gray-500">
            <div className="text-lg font-semibold">Gráfico 2</div>
            <div className="text-sm">Dados não disponíveis</div>
          </div>
        </div>
      </div>
    </div>
  )
}
