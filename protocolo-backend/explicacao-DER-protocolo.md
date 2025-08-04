
# 📘 Explicação Técnica do DER – Sistema de Protocolo

## 🔧 Objetivo do Sistema
Gerenciar a tramitação de **processos administrativos** entre **setores**, com controle de **requerentes**, **pagamentos**, **documentos**, e **responsáveis internos**.

## 🧱 Entidades Principais e Suas Funções

### 1. UNIDADE
Representa um órgão ou sede física (ex: "Unidade Central"). Uma unidade pode receber muitos processos.

### 2. SECRETARIA
Representa um setor administrativo superior (ex: "Secretaria de Obras"). Uma secretaria possui vários setores.

### 3. SETOR
Departamentos da secretaria. Podem ser origem, destino ou requerente do processo.

### 4. REQUERENTE
Pessoa física ou jurídica que solicita um protocolo. Cada requerente pode abrir vários processos.

### 5. RESPONSÁVEL
Funcionário da prefeitura que tramita processos. Cada responsável atua sobre diversos trâmites.

### 6. PROCESSO
Entidade central do sistema. Relaciona-se com requerente, unidade, secretaria, setores, trâmites, pagamentos e documentos.

### 7. TRÂMITE
Histórico da movimentação do processo entre setores. Vinculado a um responsável.

### 8. PAGAMENTO
Pagamentos vinculados a um processo. Um processo pode ter vários.

### 9. DOCUMENTO_CONTROLE
Documentos anexos e registros enviados com o processo.

## 🔗 Relacionamentos-Chave

| Pai         | Filho               | Tipo |
|-------------|---------------------|------|
| SECRETARIA  | SETOR               | 1:N  |
| SETOR       | RESPONSÁVEL         | 1:N  |
| REQUERENTE  | PROCESSO            | 1:N  |
| UNIDADE     | PROCESSO            | 1:N  |
| PROCESSO    | TRÂMITE             | 1:N  |
| PROCESSO    | PAGAMENTO           | 1:N  |
| PROCESSO    | DOCUMENTO_CONTROLE  | 1:N  |

## 🚀 Backend – Considerações

- Autenticação por responsáveis
- Validação de CPF/CNPJ único
- Campos obrigatórios com FK
- Logs: created_at / updated_at
- Filtros úteis nas rotas

## 🎨 Frontend – Considerações

- Formulários complexos
- Telas para histórico de trâmite
- Painéis para pagamentos e documentos
- Selects dinâmicos para setores, unidades, responsáveis

## 📦 Rotas RESTful Sugeridas

### Processo
GET /processos  
POST /processos  
GET /processos/:id  
PUT /processos/:id  
DELETE /processos/:id

### Trâmite / Pagamento / Documento
GET /processos/:id/tramites  
POST /tramites  
GET /processos/:id/pagamentos  
POST /pagamentos  
GET /processos/:id/documentos  
POST /documentos

### Relacionados
GET /secretarias/:id/setores  
GET /setores/:id/responsaveis  
GET /requerentes/:id/processos
