-- Criação das tabelas baseadas no diagrama de fluxo

-- Tabela UNIDADE
CREATE TABLE IF NOT EXISTS unidade (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(50) UNIQUE,
    endereco TEXT,
    telefone VARCHAR(20),
    email VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela SECRETARIA
CREATE TABLE IF NOT EXISTS secretaria (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(50) UNIQUE,
    descricao TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela SETOR
CREATE TABLE IF NOT EXISTS setor (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    codigo VARCHAR(50) UNIQUE,
    secretaria_id INTEGER REFERENCES secretaria(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela REQUERENTE
CREATE TABLE IF NOT EXISTS requerente (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    cnpj VARCHAR(18) UNIQUE,
    email VARCHAR(100),
    telefone VARCHAR(20),
    endereco TEXT,
    tipo ENUM('PESSOA_FISICA', 'PESSOA_JURIDICA') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela RESPONSAVEL
CREATE TABLE IF NOT EXISTS responsavel (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(255) NOT NULL,
    cpf VARCHAR(14) UNIQUE,
    email VARCHAR(100),
    telefone VARCHAR(20),
    cargo VARCHAR(100),
    setor_id INTEGER REFERENCES setor(id),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela PROCESSO
CREATE TABLE IF NOT EXISTS processo (
    id SERIAL PRIMARY KEY,
    numero_documento VARCHAR(50) NOT NULL,
    tipo_documento VARCHAR(100) NOT NULL,
    ano INTEGER NOT NULL,
    data_abertura DATE NOT NULL,
    apenso_processo VARCHAR(100),
    criado_por VARCHAR(255),
    codigo_assunto VARCHAR(50),
    assunto TEXT NOT NULL,
    doc_necessario TEXT,
    origem VARCHAR(255),
    valor_rs DECIMAL(15,2),
    codigo_requerente VARCHAR(50),
    sumula_documento TEXT,
    unidade_id INTEGER REFERENCES unidade(id),
    requerente_id INTEGER REFERENCES requerente(id),
    secretaria_id INTEGER REFERENCES secretaria(id),
    setor_destino_id INTEGER REFERENCES setor(id),
    setor_requerente_id INTEGER REFERENCES setor(id),
    local_abertura VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela TRAMITE
CREATE TABLE IF NOT EXISTS tramite (
    id SERIAL PRIMARY KEY,
    processo_id INTEGER REFERENCES processo(id),
    setor_origem_id INTEGER REFERENCES setor(id),
    setor_destino_id INTEGER REFERENCES setor(id),
    responsavel_id INTEGER REFERENCES responsavel(id),
    data_tramite TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    observacoes TEXT,
    situacao VARCHAR(50) DEFAULT 'EM_ANDAMENTO',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela PAGAMENTO
CREATE TABLE IF NOT EXISTS pagamento (
    id SERIAL PRIMARY KEY,
    processo_principal_id INTEGER REFERENCES processo(id),
    numero_processo_pagamento VARCHAR(50),
    ano_pagamento INTEGER,
    valor DECIMAL(15,2) NOT NULL,
    data_pagamento DATE NOT NULL,
    identificador VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela DOCUMENTO_CONTROLE
CREATE TABLE IF NOT EXISTS documento_controle (
    id SERIAL PRIMARY KEY,
    processo_id INTEGER REFERENCES processo(id),
    enviado_por VARCHAR(255),
    data_envio DATE,
    docs_guia TEXT,
    numero_guia VARCHAR(50),
    apensos TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Índices para melhor performance
CREATE INDEX IF NOT EXISTS idx_processo_numero ON processo(numero_documento);
CREATE INDEX IF NOT EXISTS idx_processo_ano ON processo(ano);
CREATE INDEX IF NOT EXISTS idx_requerente_cpf ON requerente(cpf);
CREATE INDEX IF NOT EXISTS idx_requerente_cnpj ON requerente(cnpj);
CREATE INDEX IF NOT EXISTS idx_tramite_processo ON tramite(processo_id);
CREATE INDEX IF NOT EXISTS idx_tramite_data ON tramite(data_tramite);
