
# Leitura de um Excel | Conversão dos dados para JSON

Projeto desenvolvido com base na necessidade reportada pelo comercial da Prisma, onde recebiam um Excel da Senior para visualização dos módulos adquiridos pelos nossos clientes. 


## Autores

- [@JoaoBedin](https://github.com/JoaoHenriqueBedin)


## Documentação da API ComercialPrisma

#### Retorna uma lista de clientes com detalhes dos módulos associados.

```http
  GET /dados-clientes
```

| Parâmetro   | Tipo       | Resposta                           |
| :---------- | :--------- | :---------------------------------- |
| `Nenhum` | `string` | `200 - OK & 500 - Server Error`   |
                      

#### Permite o upload de uma nova planilha Excel para atualizar os dados dos clientes e módulos.

```http
  POST /upload
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `planilha`      | `multipart/form-data` | **Obrigatório**. O arquivo Excel (.xlsx) contendo os dados a serem atualizados |



![Logo](https://prismainformatica.com.br/wdadmin/uploads/informacoes_gerais/logo-alternativa-prisma-softwares-de-gestao-202307052041.png)

