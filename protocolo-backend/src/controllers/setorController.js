const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM setor');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM setor WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const { nome, codigo, secretaria_id } = req.body;
            const result = await db.query(
                'INSERT INTO setor (nome, codigo, secretaria_id) VALUES ($1, $2, $3) RETURNING *',
                [nome, codigo, secretaria_id]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, codigo, secretaria_id } = req.body;
            const result = await db.query(
                'UPDATE setor SET nome = $1, codigo = $2, secretaria_id = $3, updated_at = CURRENT_TIMESTAMP WHERE id = $4 RETURNING *',
                [nome, codigo, secretaria_id, id]
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
            const result = await db.query('DELETE FROM setor WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async listarResponsaveis(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM responsavel WHERE setor_id = $1', [id]);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
