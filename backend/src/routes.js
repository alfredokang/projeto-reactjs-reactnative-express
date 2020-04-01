const express = require('express')
const OngController = require('./controllers/OngController')
const IncidentController = require('./controllers/IncidentController')
const ProfileController = require('./controllers/ProfileController')
const SessionController = require('./controllers/SessionController')

const { celebrate, Segments, Joi } = require('celebrate') // Usado para fazer validação

const routes = express.Router()

routes.post('/session', SessionController.create)

routes.get('/ongs', OngController.index)
routes.post('/ongs', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), OngController.create)

// Validação dos headers é dieferente
routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization: Joi.string().required(),

    }).unknown()
}), ProfileController.index)

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), IncidentController.index)


routes.post('/incidents', IncidentController.create)
routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), IncidentController.delete)


module.exports = routes

// Em celebrate, como isto é um objeto e a chave eh uma variável vc precisa colocar em colchetes
// Sempre que em um objeto a chave dele é uma variavel, se for em JavaScript 
// vc precisa colocar ele entre chaves