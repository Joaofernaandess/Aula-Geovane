const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Configuração da conexão com MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'SISTEMA'
});

db.connect(err => {
    if (err) throw err;
    console.log('Conectado ao MySQL!');
});

// ============================
// Rota de Login (existente)
// ============================
app.get('/acesso', (req, res) => {
    const { usuario, senha } = req.query;
    console.log('Tentativa de login com:', usuario);
    const sql = 'SELECT * FROM usuarios WHERE nome_login=? AND senha=?';

    db.query(sql, [usuario, senha], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.json({ success: true, message: 'Login realizado com sucesso!' });
        } else {
            res.json({ success: false, message: 'Usuário ou senha incorretos.' });
        }
    });
});

// =============================================
// Rota para INSERIR usuário (atividade Geovane)
// =============================================
app.post('/inserirusuario', (req, res) => {
    const { nome, login, senha, ativado } = req.body;

    if (!nome || !login || !senha) {
        return res.json({ success: false, message: 'Campos obrigatórios ausentes.' });
    }

    const sql = 'INSERT INTO usuarios (nome_usuario, nome_login, senha, ativado) VALUES (?, ?, ?, ?)';

    db.query(sql, [nome, login, senha, ativado], (err, result) => {
        if (err) {
            console.error(err);
            if (err.code === 'ER_DUP_ENTRY') {
                return res.json({ success: false, message: 'Login já existe. Escolha outro.' });
            }
            return res.status(500).json({ success: false, message: 'Erro no banco de dados.' });
        }
        res.json({ success: true, message: 'Usuário inserido com sucesso!', id: result.insertId });
    });
});

app.listen(3000, () => console.log('Servidor rodando na porta 3000'));
