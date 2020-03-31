
exports.up = function(knex) {
    return knex.schema.createTable('incidents', function (table) {
        table.increments(); // Cria uma chave primaria autoincrement 

        table.string('title').notNullable();
        table.string('description').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();  // Cria uma chave de relacionamento

        table.foreign('ong_id').references('id').inTable('ongs'); // Criando a chave estrangeira
    });
};

exports.down = function(knex) {
   return knex.schema.dropTable('incidents');
};