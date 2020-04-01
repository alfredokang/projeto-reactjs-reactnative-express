const knex = require('knex')
const configuration = require('../../knexfile')

// Variáveis ambiente que foi colocado manualmente no package.json
const config = process.env.NODE_ENV === 'test' ? configuration.test : configuration.development

const connection = knex(config)

module.exports = connection