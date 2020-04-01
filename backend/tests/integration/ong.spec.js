const request = require('supertest')
const app = require('../../src/app')
const connection = require('../../src/database/connection')

describe('ONG', () => {
    beforeEach(async () => {
        // Quando acabar um teste use o rollback para defazer as migrations sempre usar antes de fazer uma migration
        await connection.migrate.rollback()
        await connection.migrate.latest()
    })

    // Para tirar a mensagem de erro no test dizendo que mesmo depois do test algum processo continuou rodando
    // afterEach ou afterAll -> Executar depois de todos os testes, pode usar tanto um quanto ou outro
    afterAll(() => {
        connection.destroy() // Esta função ira destruir toda a conexão
    })

    // Vc pode fazer outros testes usando, para setar alguma rota vc chama o comando .set('Authorization', 'asd')
    it('Should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs').send({
            name: "A2",
            email: "contato@apad.com.br",
            whatsapp: "11961511000",
            city: "Rio do Sul",
            uf: "SC"
        })
        expect(response.body).toHaveProperty('id')
        expect(response.body.id).toHaveLength(8)
    })
})