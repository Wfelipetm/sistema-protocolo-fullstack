# Protocolo Frontend

Interface web do sistema de protocolo da Prefeitura Municipal de Itaguaí.

## Requisitos
- Node.js >= 18
- pnpm ou npm

## Instalação
```bash
# Instale as dependências
pnpm install
# ou
npm install
```

## Configuração
- Crie um arquivo `.env.local` com as variáveis de ambiente necessárias (exemplo: URL da API backend).

## Execução
```bash
# Ambiente de desenvolvimento
pnpm dev
# ou
npm run dev

# Build para produção
pnpm build
# ou
npm run build

# Iniciar produção
pnpm start
# ou
npm start
```

## Observações
- O frontend utiliza Next.js, React, Tailwind CSS e Radix UI.
- Certifique-se que o backend está rodando e acessível via URL configurada.
- Para autenticação, utilize seu usuário AD e senha institucional.
