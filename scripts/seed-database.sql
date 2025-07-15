-- Inserção de dados iniciais

-- Inserir Secretarias
INSERT INTO secretaria (nome, codigo, descricao) VALUES
('Secretaria de Ciência, Tecnologia, Inovação e Comunicação', 'SCTIC', 'Responsável pela gestão tecnológica do município'),
('Secretaria de Administração', 'SADM', 'Gestão administrativa municipal'),
('Secretaria de Finanças', 'SFIN', 'Gestão financeira e orçamentária');

-- Inserir Setores
INSERT INTO setor (nome, codigo, secretaria_id) VALUES
('Setor de Tecnologia da Informação', 'STI', 1),
('Setor de Inovação', 'SINOV', 1),
('Setor de Recursos Humanos', 'SRH', 2),
('Setor de Protocolo', 'SPROT', 2),
('Setor de Contabilidade', 'SCONT', 3),
('Setor de Tesouraria', 'STES', 3);

-- Inserir Unidades
INSERT INTO unidade (nome, codigo, endereco, telefone, email) VALUES
('Unidade Central', 'UC001', 'Rua Principal, 123 - Centro', '(21) 2688-0000', 'central@itaguai.rj.gov.br'),
('Unidade Norte', 'UN001', 'Av. Norte, 456 - Bairro Norte', '(21) 2688-0001', 'norte@itaguai.rj.gov.br'),
('Unidade Sul', 'US001', 'Rua Sul, 789 - Bairro Sul', '(21) 2688-0002', 'sul@itaguai.rj.gov.br');

-- Inserir Responsáveis
INSERT INTO responsavel (nome, cpf, email, telefone, cargo, setor_id) VALUES
('João Silva Santos', '123.456.789-01', 'joao.santos@itaguai.rj.gov.br', '(21) 99999-0001', 'Coordenador de TI', 1),
('Maria Oliveira Costa', '234.567.890-12', 'maria.costa@itaguai.rj.gov.br', '(21) 99999-0002', 'Analista de RH', 3),
('Pedro Souza Lima', '345.678.901-23', 'pedro.lima@itaguai.rj.gov.br', '(21) 99999-0003', 'Contador', 5);

-- Inserir Requerentes
INSERT INTO requerente (nome, cpf, cnpj, email, telefone, endereco, tipo) VALUES
('Carlos Eduardo Ferreira', '456.789.012-34', NULL, 'carlos.ferreira@email.com', '(21) 98888-0001', 'Rua das Flores, 100', 'PESSOA_FISICA'),
('Ana Paula Rodrigues', '567.890.123-45', NULL, 'ana.rodrigues@email.com', '(21) 98888-0002', 'Av. Central, 200', 'PESSOA_FISICA'),
('Empresa ABC Ltda', NULL, '12.345.678/0001-90', 'contato@empresaabc.com.br', '(21) 3333-0001', 'Rua Comercial, 300', 'PESSOA_JURIDICA');
