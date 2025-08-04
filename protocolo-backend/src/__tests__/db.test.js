const db = require('../config/db');

describe('Conexão com o banco de dados', () => {
    it('deve conectar e executar uma query simples', async () => {
        const result = await db.query('SELECT 1 AS value');
        expect(result.rows[0].value).toBe(1);
    });
});
