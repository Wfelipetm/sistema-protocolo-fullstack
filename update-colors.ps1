# Script para atualizar cores do sistema para azul padrão
$files = Get-ChildItem -Path "app" -Recurse -Name "*.tsx" | Where-Object { $_ -notlike "*\login\*" -and $_ -notlike "*\cadastro-principal\*" -and $_ -notlike "*\dashboard\*" -and $_ -notlike "*\docs-recebidos\*" -and $_ -notlike "*\controle-documento\*" }

foreach ($file in $files) {
    $fullPath = Join-Path "app" $file
    Write-Host "Atualizando: $fullPath"
    
    $content = Get-Content $fullPath -Raw
    
    # Substituições de cores
    $content = $content -replace 'bg-sistema-gradient', 'bg-blue-700'
    $content = $content -replace 'text-sistema-text-white', 'text-white'
    $content = $content -replace 'bg-sistema-background-primary', 'bg-white'
    $content = $content -replace 'bg-sistema-background-secondary', 'bg-blue-50'
    $content = $content -replace 'border-sistema-border-light', 'border-blue-300'
    $content = $content -replace 'border-sistema-border-medium', 'border-blue-400'
    $content = $content -replace 'text-sistema-text-primary', 'text-black'
    $content = $content -replace 'text-sistema-text-secondary', 'text-gray-600'
    $content = $content -replace 'border-sistema-text-primary', 'border-black'
    $content = $content -replace 'text-sistema-primary', 'text-blue-700'
    $content = $content -replace 'bg-sistema-primary', 'bg-blue-700'
    $content = $content -replace 'bg-sistema-secondary', 'bg-blue-800'
    $content = $content -replace 'hover:bg-sistema-secondary', 'hover:bg-blue-800'
    $content = $content -replace 'hover:text-sistema-primary', 'hover:text-blue-800'
    
    Set-Content $fullPath $content
}

Write-Host "Atualização concluída!"
