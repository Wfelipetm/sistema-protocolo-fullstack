const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM secretaria');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM secretaria WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const { nome, codigo, descricao } = req.body;
            const result = await db.query(
                'INSERT INTO secretaria (nome, codigo, descricao) VALUES ($1, $2, $3) RETURNING *',
                [nome, codigo, descricao]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, codigo, descricao } = req.body;
            const result = await db.query(
                'UPDATE secretaria SET nome = $1, codigo = $2, descricao = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
                [nome, codigo, descricao, id]
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
            const result = await db.query('DELETE FROM secretaria WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async listarSetores(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM setor WHERE secretaria_id = $1', [id]);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
