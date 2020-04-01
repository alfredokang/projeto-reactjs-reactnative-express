const express = require('express')
const cors = require('cors')
const app = express() // Vai armazenar toda a aplicação
const routes = require('./routes')
const { errors } = require('celebrate')

app.use(cors()) // Vc define quem pode acessar o seu http

app.use(express.json()) // IMPORTANTE se for trabalhar com json vc precisa colocar este comando para eles converterem o json para objeto do Javascritp para ele conseguir entender

app.use(routes)

app.use(errors())

module.exports = app

// app.listen(3333)

// Recurso esta associado a qual banco e rota o caminho a rota abaixo se refere a /

// Metodos HTTP:
// GET: Busca uma informação no Back-End
// POST: Criar uma informação no back-end
// PUT: Alterar uma informação no back-end
// DELETE: Deletar uma informação no back-end

/**
 * 
 * Tipos de parâmetros:
 * 
 * Query Params: Parâmetros nomeados enviados na rota após "?"" (Filtros, Paginação)
 * Route Params: Parâmetros utilizados para identificar recursos separado por ":id"
 * Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
 */

/**
 * 
 * SQL: Mysql, Sql Server, Postgre, Oracle
 * NoSQL: MondoDB, CouchDB, etc
 * 
 **/ 

/**
 * 
 * Como instalar o banco de dados
 * 
 * Para comunicar com o banco de dados:
 * 
 * - Instalar o Driver: select * from users
 * - Query Builder: Escrever as queries usando o JS, tablet('users').select('*').where()
 * 
 * Vamos estar usando a Query Builder Knex.js
 * 
 */

