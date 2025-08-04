# Protocolo Backend

API RESTful para o sistema de protocolo da Prefeitura Municipal de Itaguaí.

## Requisitos
- Node.js >= 18
- PostgreSQL

## Instalação
```bash
# Instale as dependências
npm install
```

## Configuração
- Crie um arquivo `.env` com as variáveis de ambiente necessárias (exemplo: conexão com banco, porta, etc).

## Execução
```bash
# Ambiente de desenvolvimento (com nodemon)
npm run dev

# Ambiente de produção
npm start
```

## Testes
```bash
npm test
```

## Principais scripts
- `npm run dev` — inicia o servidor com nodemon
- `npm start` — inicia o servidor em produção
- `npm test` — executa os testes

## Observações
- O backend utiliza autenticação JWT e integração com AD via LDAP.
- Certifique-se que o banco de dados está rodando e configurado corretamente.
- Para integração com o frontend, habilite CORS conforme necessário.
