const connection = require('../database/connection')

module.exports = {
     // Método que retorna todas as informações da tabela
     async index(request, response) { // Vai retornar todas as informações da tabela ongs -> Fizemos tipo um log
        // Criando paginação 
        const {page = 1} = request.query

        const [count] = await connection('incidents').count() // Numero total de registros
        
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id') // Relacioanr dados de 2 tabelas, onde os ids das tabelas ongs e incidents sejam iguais
            .limit(5)
            .offset((page - 1) * 5) 
            .select([
            'incidents.*', 
            'ongs.name', 
            'ongs.email', 
            'ongs.whatsapp', 
            'ongs.city', 
            'ongs.uf'
            ]) // Filtro para aparecer apenas valores que desejamos, ele sobrepos o id da ong pois eles tem o mesmo id, pois com o join mistura muitos os dados
    
        response.header('X-Total-Count', count['count(*)']) // O retorno da quantidade total de incidentes é retornada pelo cabecalho e não pelo corpo
                                                            // Variável criada poderia ser outro nome X-Total-Count    
        return response.json(incidents)
},  
     // Método que salva os dados na tabla
    async create(request, response) {
        const {title, description, value} = request.body // O Id ele vai criar automático // O Id ong_id por ser um Id de autenticação ele é colocado no cabecalho e não no corpo da requisicao
        const ong_id = request.headers.authorization // a request header geralmente tem informações de login, de localizacao, contexto da requisição, nome authorization foi dado no header
        
        // const result = await connection('incidents').insert({
         const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id,
        })
        // const id = result[0] // Para pega o id vc pode fazer indicar o id 0 
        return response.json({id})
    },
    
    async delete(request, response) {
        const {id} = request.params
        const ong_id = request.headers.authorization 

         // Estamos pegando o incidente dentro da table incidents
        // Vamos fazer uma verificação onde ongs podem apagar apenas seus incidentes
        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first() // Vai retornar apenas um resultado
            
        if (incident.ong_id != ong_id) {
            return response.status(401).json({error: 'Operation not permitted.' }) // A resposta de sucesso por padrao no http é 200 e não autorizado é 401 no comando response.status
        }
        await connection('incidents').where('id', id).delete()

        return response.status(204).send() // Resposta sem conteúdo de sucesso no caso do delete
    }
}