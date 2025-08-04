const { Pool } = require('pg');

// Configuração da conexão com o PostgreSQL
const pool = new Pool({
    host: 'sistemaprotocolo.itaguai.rj.gov.br',
    port: 5432,
    database: 'protocolo',
    user: 'postgres',
    password: 'B10m3Tr1@',
});

// Teste de conexão ao pool
pool.query('SELECT 1', (err) => {
    if (err) {
        console.error('Erro ao conectar ao banco:', err.message);
    } else {
        console.log('Banco de dados protocol conectado!');
    }
});

module.exports = {
    query: (text, params) => pool.query(text, params),
};
