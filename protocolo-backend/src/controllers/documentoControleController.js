const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM documento_controle');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM documento_controle WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const { processo_id, enviado_por, data_envio, docs_guia, numero_guia, apensos } = req.body;
            const result = await db.query(
                'INSERT INTO documento_controle (processo_id, enviado_por, data_envio, docs_guia, numero_guia, apensos) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [processo_id, enviado_por, data_envio, docs_guia, numero_guia, apensos]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { processo_id, enviado_por, data_envio, docs_guia, numero_guia, apensos } = req.body;
            const result = await db.query(
                'UPDATE documento_controle SET processo_id = $1, enviado_por = $2, data_envio = $3, docs_guia = $4, numero_guia = $5, apensos = $6 WHERE id = $7 RETURNING *',
                [processo_id, enviado_por, data_envio, docs_guia, numero_guia, apensos, id]
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
            const result = await db.query('DELETE FROM documento_controle WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
