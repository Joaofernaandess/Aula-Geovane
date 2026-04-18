const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(cors());

app.use(bodyParser.json());
// Configuração da conexão com mysql 
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'loja'
});

db.connect(err => {
    if (err) throw err;
    console.log("Conectado ao mysql!");
});

// Rota de Login 
app.get('/acesso', (req, res) => {
    const { usuario, senha } = req.query;
    console.log("Tentativa de login com:", usuario);
    const sql = "SELECT * FROM usuarios WHERE usuario=? AND senha=?";

    db.query(sql, [usuario, senha], (err, results) => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        if (results.length > 0) {
            res.json({ success: true, message: "Login realizado com sucesso!" });
        }
        else {
            res.json({ success: false, message: "Usuário ou senha incorretos." });
        }
    });
});

app.listen(3000, () => console.log("Servidor rodando na porta 3000")); 