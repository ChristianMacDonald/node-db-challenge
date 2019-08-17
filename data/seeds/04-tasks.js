
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('tasks').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('tasks').insert([
        { project_id: 1, description: 'Decide whether to buy a pre-built PC or build one.', notes: 'Building a PC is more time consuming but saves you money.' },
        { project_id: 1, description: 'Decide your budget.', notes: 'A high end gaming PC can easily cost more than $1,000, but you don\'t have to spend that much if your willing to play at lower quality.' },
        { project_id: 2, description: 'Keep your attendance consistent.', notes: 'Lambda School kicks you out if you miss more than 8 hours of class in a month.' },
        { project_id: 2, description: 'If your falling behind, ask for help.', notes: 'Being too stubborn to ask for help will waste hours of your time.' },
        { project_id: 3, description: 'Decide if you really care that much about the show.' }
      ]);
    });
};
