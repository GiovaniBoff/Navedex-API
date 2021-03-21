
exports.up = function (knex) {
    return knex.schema.createTable('navers_projects', (table) => {
        table.increments('id').primary();
        table.integer('navers_id').notNullable().references('id').inTable('navers');
        table.integer('projects_id').notNullable().references('id').inTable('projects')
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('navers_projects');
}
