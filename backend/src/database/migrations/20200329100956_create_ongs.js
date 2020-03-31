
exports.up = function(knex) { // metodo up o que eu quero que seja feito
    return knex.schema.createTable('ongs', function (table) {
        table.string('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('whatsapp').notNullable();
        table.string('city').notNullable();
        table.string('uf', 2).notNullable(); // O segundo caractere passado se refere ao tamanho do texto
    });
};

exports.down = function(knex) { // Caso eu precise voltar atrás de algum problema
     return knex.schema.dropTable('ongs');
};
