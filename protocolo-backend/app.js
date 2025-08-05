require('dotenv').config();
const express = require('express');
const cors = require('cors');
const passport = require('passport');
const LdapStrategy = require('passport-ldapauth');
const db = require('./src/config/db');

// Inicializa app
const app = express();
const PORT = process.env.PORT || 4002;

// Configuração do Passport com LDAP
passport.use(
    new LdapStrategy({
        server: {
            url: process.env.LDAP_URL,
            bindDN: process.env.LDAP_BIND_DN,
            bindCredentials: process.env.LDAP_BIND_CREDENTIALS,
            searchBase: process.env.LDAP_SEARCH_BASE,
            searchFilter: process.env.LDAP_SEARCH_FILTER,
            searchAttributes: [
                'sAMAccountName', 'cn', 'mail', 'memberOf', 'description', 'department', 'dn'
            ],
            tlsOptions: { rejectUnauthorized: false }
        },
        usernameField: 'username',
        passwordField: 'password'
    })
);

// Middlewares globais
app.use(express.json());
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// Rotas básicas
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.get('/dbtest', async (req, res) => {
    try {
        const result = await db.query('SELECT 1 AS value');
        res.json({ conectado: true, resultado: result.rows[0] });
    } catch (error) {
        res.status(500).json({ conectado: false, erro: error.message });
    }
});

// Importação das rotas RESTful
const processoRoutes = require('./src/routes/processoRoutes');
const setorRoutes = require('./src/routes/setorRoutes');
const secretariaRoutes = require('./src/routes/secretariaRoutes');
const requerenteRoutes = require('./src/routes/requerenteRoutes');
const unidadeRoutes = require('./src/routes/unidadeRoutes');
const responsavelRoutes = require('./src/routes/responsavelRoutes');
const tramiteRoutes = require('./src/routes/tramiteRoutes');
const pagamentoRoutes = require('./src/routes/pagamentoRoutes');
const documentoControleRoutes = require('./src/routes/documentoControleRoutes');
const authRoutes = require('./src/routes/authRoutes');

// Rotas da API
app.use('/auth', authRoutes);
app.use('/processos', processoRoutes);
app.use('/setores', setorRoutes);
app.use('/secretarias', secretariaRoutes);
app.use('/requerentes', requerenteRoutes);
app.use('/unidade', unidadeRoutes);
app.use('/responsaveis', responsavelRoutes);
app.use('/tramites', tramiteRoutes);
app.use('/pagamentos', pagamentoRoutes);
app.use('/documentos-controle', documentoControleRoutes);

// Tratamento global de erros não tratados
process.on('uncaughtException', (err) => {
    console.error('Erro não tratado:', err);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Rejeição não tratada:', reason);
});

// Inicialização do servidor
app.listen(PORT, () => {
    console.log(`Servidor protocol rodando em http://localhost:${PORT}`);
});