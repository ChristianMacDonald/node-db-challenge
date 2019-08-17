
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('resources').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('resources').insert([
        { name: 'Newegg', description: 'An online marketplace for computer parts.' },
        { name: 'Lambda School', description: 'An alternative school for computer science.' },
        { name: 'BBC', description: 'A public British broadcasting network.' }
      ]);
    });
};
