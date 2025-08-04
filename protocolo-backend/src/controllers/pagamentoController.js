const db = require('../config/db');

module.exports = {
    async listar(req, res) {
        try {
            const result = await db.query('SELECT * FROM pagamento');
            res.json(result.rows);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async buscarPorId(req, res) {
        try {
            const { id } = req.params;
            const result = await db.query('SELECT * FROM pagamento WHERE id = $1', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async criar(req, res) {
        try {
            const { processo_principal_id, numero_processo_pagamento, ano_pagamento, valor, data_pagamento, identificador } = req.body;
            const result = await db.query(
                'INSERT INTO pagamento (processo_principal_id, numero_processo_pagamento, ano_pagamento, valor, data_pagamento, identificador) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
                [processo_principal_id, numero_processo_pagamento, ano_pagamento, valor, data_pagamento, identificador]
            );
            res.status(201).json(result.rows[0]);
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    },
    async atualizar(req, res) {
        try {
            const { id } = req.params;
            const { processo_principal_id, numero_processo_pagamento, ano_pagamento, valor, data_pagamento, identificador } = req.body;
            const result = await db.query(
                'UPDATE pagamento SET processo_principal_id = $1, numero_processo_pagamento = $2, ano_pagamento = $3, valor = $4, data_pagamento = $5, identificador = $6 WHERE id = $7 RETURNING *',
                [processo_principal_id, numero_processo_pagamento, ano_pagamento, valor, data_pagamento, identificador, id]
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
            const result = await db.query('DELETE FROM pagamento WHERE id = $1 RETURNING *', [id]);
            if (result.rows.length === 0) return res.status(404).json({ erro: 'Não encontrado' });
            res.json({ removido: true });
        } catch (error) {
            res.status(500).json({ erro: error.message });
        }
    }
};
