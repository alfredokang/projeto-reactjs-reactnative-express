//const crypto = require('crypto') // É um pacote do próprio Node
const generateUniqueId = require('../utils/generateUniqueId')
const connection = require('../database/connection') // Conexão com o banco de dados

module.exports = {
    // Método que retorna todas as informações da tabela
    async index(request, response) { // Vai retornar todas as informações da tabela ongs -> Fizemos tipo um log
            const ongs = await connection('ongs').select('*')
        
            return response.json(ongs)
    },

    // Método que adiciona valore na tabela
    async create(request, response) {
    
    // ATENÇÃO: Precisamos definir esta função como async/await para que somente quando acabar de cadastrar os dados no banco de dados
    // ela execute a próxima instrução, pois, demora um pouco o cadastro.
    //  return res.send('Hello World') // Outra forma de chamada
    // const params = request.query // Vc consegue acessar as informações das Queries
    // const params = request.params // Vc acessa os parâmetros pelo identificador colocado :id

    // const params = request.body // Para acessar uma request body só trocar para body
    
    // console.log(params)

    //return response.json({
    //       evento: 'Semana OminiStack',
    //       aluno: 'Alfredo'
    // })
     
    // const data = request.body // Ao inves de usar esta estrutura é interessantes usar o destruction para pegar todos os dados

    const {name, email, whatsapp, city, uf} = request.body

    // Ja que o id vamos cadastrar e não será incrementado auto pelo banco de dados estamos pegando um metodo da
    // biblioteca crypto do node para fazer este contador
    const id = generateUniqueId()
    //crypto.randomBytes(4).toString('HEX') - trocado pelo jes para teste
       
        await connection('ongs').insert({ // Ja que esta função demora e vc precisa esperar ela acabar para executar o próximo passo será usado o async/await
            id,
            name,
            email,
            whatsapp,
            city,
            uf
        })
    
        return response.json({id}) // Ele vai retornar o id do cadastro que é como se fosse o cpf da aplicacao com ele vc pode fazer tudo
    }
}