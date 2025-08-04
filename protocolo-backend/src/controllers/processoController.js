const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM processo');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM processo WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const {
                numero_documento,
                tipo_documento,
                ano,
                data_abertura,
                apenso_processo,
                criado_por,
                codigo_assunto,
                assunto,
                doc_necessario,
                origem,
                valor_rs,
                codigo_requerente,
                sumula_documento,
                unidade_id,
                requerente_id,
                secretaria_id,
                setor_destino_id,
                setor_requerente_id,
                local_abertura
            } = req.body;
            const result = await db.query(
                `INSERT INTO processo (
                    numero_documento, tipo_documento, ano, data_abertura, apenso_processo, criado_por, codigo_assunto, assunto, doc_necessario, origem, valor_rs, codigo_requerente, sumula_documento, unidade_id, requerente_id, secretaria_id, setor_destino_id, setor_requerente_id, local_abertura
                ) VALUES (
                    $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19
                ) RETURNING *`,
                [
                    numero_documento,
                    tipo_documento,
                    ano,
                    data_abertura,
                    apenso_processo,
                    criado_por,
                    codigo_assunto,
                    assunto,
                    doc_necessario,
                    origem,
                    valor_rs,
                    codigo_requerente,
                    sumula_documento,
                    unidade_id,
                    requerente_id,
                    secretaria_id,
                    setor_destino_id,
                    setor_requerente_id,
                    local_abertura
                ]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const {
                numero_documento,
                tipo_documento,
                ano,
                data_abertura,
                apenso_processo,
                criado_por,
                codigo_assunto,
                assunto,
                doc_necessario,
                origem,
                valor_rs,
                codigo_requerente,
                sumula_documento,
                unidade_id,
                requerente_id,
                secretaria_id,
                setor_destino_id,
                setor_requerente_id,
                local_abertura
            } = req.body;
            const result = await db.query(
                `UPDATE processo SET
                    numero_documento = $1,
                    tipo_documento = $2,
                    ano = $3,
                    data_abertura = $4,
                    apenso_processo = $5,
                    criado_por = $6,
                    codigo_assunto = $7,
                    assunto = $8,
                    doc_necessario = $9,
                    origem = $10,
                    valor_rs = $11,
                    codigo_requerente = $12,
                    sumula_documento = $13,
                    unidade_id = $14,
                    requerente_id = $15,
                    secretaria_id = $16,
                    setor_destino_id = $17,
                    setor_requerente_id = $18,
                    local_abertura = $19,
                    updated_at = CURRENT_TIMESTAMP
                WHERE id = $20 RETURNING *`,
                [
                    numero_documento,
                    tipo_documento,
                    ano,
                    data_abertura,
                    apenso_processo,
                    criado_por,
                    codigo_assunto,
                    assunto,
                    doc_necessario,
                    origem,
                    valor_rs,
                    codigo_requerente,
                    sumula_documento,
                    unidade_id,
                    requerente_id,
                    secretaria_id,
                    setor_destino_id,
                    setor_requerente_id,
                    local_abertura,
                    id
                ]
            );
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async remover(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('DELETE FROM processo WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async listarTramites(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM tramite WHERE processo_id = $1', [id]);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async listarPagamentos(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM pagamento WHERE processo_principal_id = $1', [id]);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async listarDocumentos(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM documento_controle WHERE processo_id = $1', [id]);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
