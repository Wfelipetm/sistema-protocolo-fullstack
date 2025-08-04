const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM unidade');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM unidade WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const { nome, codigo, endereco, telefone, email } = req.body;
            const result = await db.query(
                'INSERT INTO unidade (nome, codigo, endereco, telefone, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
                [nome, codigo, endereco, telefone, email]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, codigo, endereco, telefone, email } = req.body;
            const result = await db.query(
                'UPDATE unidade SET nome = $1, codigo = $2, endereco = $3, telefone = $4, email = $5 WHERE id = $6 RETURNING *',
                [nome, codigo, endereco, telefone, email, id]
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
            const result = await db.query('DELETE FROM unidade WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
