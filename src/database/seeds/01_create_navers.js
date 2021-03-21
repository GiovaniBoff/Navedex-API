
exports.seed = function (knex) {
  return knex('navers').insert([
    { name: 'Fulano', birthdate: '1999-04-15', admission_date: '2020-06-12', job_role: 'Desenvolvedor' },
    { name: 'Ciclano', birthdate: '1992-10-28', admission_date: '2018-06-12', job_role: 'Desenvolvedor' },
    { name: 'Beltrano', birthdate: '1995-09-18', admission_date: '2019-02-10', job_role: 'Desenvolvedor' }
  ])
};
