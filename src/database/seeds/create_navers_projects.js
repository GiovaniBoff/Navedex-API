
exports.seed = function (knex) {
  return knex('navers_projects').insert([
    { navers_id: 1, projects_id: 1 },
    { navers_id: 1, projects_id: 2 },
    { navers_id: 2, projects_id: 2 },
    { navers_id: 3, projects_id: 3 },
    { navers_id: 3, projects_id: 2 },
  ])
};