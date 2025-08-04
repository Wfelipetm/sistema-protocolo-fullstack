const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM tramite');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM tramite WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const { processo_id, setor_origem_id, setor_destino_id, responsavel_id, data_tramite, observacoes, situacao } = req.body;
            const result = await db.query(
                'INSERT INTO tramite (processo_id, setor_origem_id, setor_destino_id, responsavel_id, data_tramite, observacoes, situacao) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [processo_id, setor_origem_id, setor_destino_id, responsavel_id, data_tramite, observacoes, situacao]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { processo_id, setor_origem_id, setor_destino_id, responsavel_id, data_tramite, observacoes, situacao } = req.body;
            const result = await db.query(
                'UPDATE tramite SET processo_id = $1, setor_origem_id = $2, setor_destino_id = $3, responsavel_id = $4, data_tramite = $5, observacoes = $6, situacao = $7 WHERE id = $8 RETURNING *',
                [processo_id, setor_origem_id, setor_destino_id, responsavel_id, data_tramite, observacoes, situacao, id]
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
            const result = await db.query('DELETE FROM tramite WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
