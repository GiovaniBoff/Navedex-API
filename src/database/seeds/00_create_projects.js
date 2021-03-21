exports.seed = function (knex) {
  return knex('projects').insert([
    { name: 'Projeto top' },
    { name: 'Projeto topzera' },
    { name: 'Projeto legalzao' }
  ])
};
