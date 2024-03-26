const express = require('express');
const xlsx = require('xlsx');
const port = 3000;

const cors = require("cors");
const app = express();
app.use(cors());

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