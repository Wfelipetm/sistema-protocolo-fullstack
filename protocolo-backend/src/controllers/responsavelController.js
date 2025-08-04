const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM responsavel');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM responsavel WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const { nome, cpf, email, telefone, cargo, setor_id } = req.body;
            const result = await db.query(
                'INSERT INTO responsavel (nome, cpf, email, telefone, cargo, setor_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [nome, cpf, email, telefone, cargo, setor_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, cpf, email, telefone, cargo, setor_id } = req.body;
            const result = await db.query(
                'UPDATE responsavel SET nome = $1, cpf = $2, email = $3, telefone = $4, cargo = $5, setor_id = $6 WHERE id = $7 RETURNING *',
                [nome, cpf, email, telefone, cargo, setor_id, id]
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
            const result = await db.query('DELETE FROM responsavel WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
