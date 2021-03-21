
exports.up = function (knex) {
    return knex.schema.createTable('navers', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.date('birthdate').notNullable();
        table.date('admission_date').notNullable();
        table.string('job_role').notNullable();
    })
}

exports.down = function (knex) {
    return knex.schema.dropTable('navers');
}
