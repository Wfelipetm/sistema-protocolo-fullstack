const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM requerente');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM requerente WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const { nome, cpf, cnpj, email, telefone, endereco, tipo } = req.body;
            const result = await db.query(
                'INSERT INTO requerente (nome, cpf, cnpj, email, telefone, endereco, tipo) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
                [nome, cpf, cnpj, email, telefone, endereco, tipo]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { nome, cpf, cnpj, email, telefone, endereco, tipo } = req.body;
            const result = await db.query(
                'UPDATE requerente SET nome = $1, cpf = $2, cnpj = $3, email = $4, telefone = $5, endereco = $6, tipo = $7, updated_at = CURRENT_TIMESTAMP WHERE id = $8 RETURNING *',
                [nome, cpf, cnpj, email, telefone, endereco, tipo, id]
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
            const result = await db.query('DELETE FROM requerente WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async listarProcessos(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM processo WHERE requerente_id = $1', [id]);
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
