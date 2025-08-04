// Tipos para autenticação
export interface User {
    id: number
    nome: string
    email: string
    papel: 'admin' | 'gestor' | 'quiosque' | 'master'
}

export interface LoginRequest {
    email: string
    senha: string
}

export interface LoginResponse {
    user: User
    token: string
}

export interface RegisterRequest {
    nome: string
    email: string
    senha: string
    papel: 'admin' | 'gestor' | 'quiosque' | 'master'
}

// Tipos das entidades do banco
export interface Unidade {
    id: number
    nome: string
    codigo?: string
    endereco?: string
    telefone?: string
    email?: string
    created_at: string
    updated_at: string
}

export interface Secretaria {
    id: number
    nome: string
    codigo?: string
    descricao?: string
    created_at: string
    updated_at: string
}

export interface Setor {
    id: number
    nome: string
    codigo?: string
    secretaria_id?: number
    secretaria?: Secretaria
    created_at: string
    updated_at: string
}

export interface Requerente {
    id: number
    nome: string
    cpf?: string
    cnpj?: string
    email?: string
    telefone?: string
    endereco?: string
    tipo: 'PESSOA_FISICA' | 'PESSOA_JURIDICA'
    created_at: string
    updated_at: string
}

export interface Responsavel {
    id: number
    nome: string
    cpf?: string
    email?: string
    telefone?: string
    cargo?: string
    setor_id?: number
    setor?: Setor
    created_at: string
    updated_at: string
}

export interface Processo {
    id: number
    numero_documento: string
    tipo_documento: string
    ano: number
    data_abertura: string
    apenso_processo?: string
    criado_por?: string
    codigo_assunto?: string
    assunto: string
    doc_necessario?: string
    origem?: string
    valor_rs?: number
    codigo_requerente?: string
    sumula_documento?: string
    unidade_id?: number
    requerente_id?: number
    secretaria_id?: number
    setor_destino_id?: number
    setor_requerente_id?: number
    local_abertura?: string
    created_at: string
    updated_at: string
    // Relacionamentos
    unidade?: Unidade
    requerente?: Requerente
    secretaria?: Secretaria
    setor_destino?: Setor
    setor_requerente?: Setor
    tramites?: Tramite[]
    pagamentos?: Pagamento[]
    documentos?: DocumentoControle[]
}

export interface Tramite {
    id: number
    processo_id?: number
    setor_origem_id?: number
    setor_destino_id?: number
    responsavel_id?: number
    data_tramite: string
    observacoes?: string
    situacao: string
    created_at: string
    updated_at: string
    // Relacionamentos
    processo?: Processo
    setor_origem?: Setor
    setor_destino?: Setor
    responsavel?: Responsavel
}

export interface Pagamento {
    id: number
    processo_principal_id?: number
    numero_processo_pagamento?: string
    ano_pagamento?: number
    valor: number
    data_pagamento: string
    identificador?: string
    created_at: string
    updated_at: string
    // Relacionamentos
    processo?: Processo
}

export interface DocumentoControle {
    id: number
    processo_id?: number
    enviado_por?: string
    data_envio?: string
    docs_guia?: string
    numero_guia?: string
    apensos?: string
    created_at: string
    updated_at: string
    // Relacionamentos
    processo?: Processo
}

// Tipos para formulários
export interface ProcessoForm {
    numero_documento: string
    tipo_documento: string
    ano: number
    data_abertura: string
    apenso_processo?: string
    criado_por?: string
    codigo_assunto?: string
    assunto: string
    doc_necessario?: string
    origem?: string
    valor_rs?: number
    codigo_requerente?: string
    sumula_documento?: string
    unidade_id?: number
    requerente_id?: number
    secretaria_id?: number
    setor_destino_id?: number
    setor_requerente_id?: number
    local_abertura?: string
}

export interface RequerenteForm {
    nome: string
    cpf?: string
    cnpj?: string
    email?: string
    telefone?: string
    endereco?: string
    tipo: 'PESSOA_FISICA' | 'PESSOA_JURIDICA'
}

export interface PagamentoForm {
    processo_principal_id?: number
    numero_processo_pagamento?: string
    ano_pagamento?: number
    valor: number
    data_pagamento: string
    identificador?: string
}

// Tipos para API responses
export interface ApiResponse<T> {
    data: T
    message?: string
    success: boolean
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    limit: number
    totalPages: number
}

// Tipos para dashboard
export interface DashboardStats {
    totalProcessos: number
    processosEmAndamento: number
    processosFinalizados: number
    processosMes: number
    valorTotalPagamentos: number
    tramitesRecentes: Tramite[]
    processosRecentes: Processo[]
}
