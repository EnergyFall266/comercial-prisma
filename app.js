const express = require('express');
const xlsx = require('xlsx');
const multer = require('multer');
const port = 3000;

const cors = require("cors");
const app = express();
app.use(cors());

// Configuração do Multer para salvar o arquivo
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './'); // O diretório onde o arquivo será salvo
    },
    filename: (req, file, cb) => {
        cb(null, 'Modulos.xlsx'); // Mantendo o mesmo nome de arquivo
    }
});
const upload = multer({ storage: storage });

// Rota para upload de arquivos
app.post('/upload', upload.single('planilha'), (req, res) => {
    res.json({ message: 'Arquivo recebido e salvo com sucesso!' });
});


app.get('/dados-clientes', (req, res) => {
    const workbook = xlsx.readFile('./Modulos.xlsx');
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet);

    const clientesMap = {};

    data.forEach(row => {
        const clienteNome = row.Cliente; 

        if (!clientesMap[clienteNome]) {
            clientesMap[clienteNome] = {
                nome: clienteNome,
                gestor: row.Gestor,
                dados: [] // Agora uma lista simples
            };
        }

        const moduloInfo = {
            linhaDeProduto: row['Linha de Produto'],
            modulo: row.Módulo,
            familia: row.Familia,
            nota: row.Nota,
            mes: row.Mês
        };

        clientesMap[clienteNome].dados.push(moduloInfo);
    });

    const clientesArray = Object.values(clientesMap);

    const resultado = {
        Clientes: clientesArray
    };

    res.json(resultado);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});