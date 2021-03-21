
exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('email').notNullable();
        table.string('password').notNullable();
        table.integer('navers_id').notNullable().references('id').inTable('navers');

    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('users');
}
