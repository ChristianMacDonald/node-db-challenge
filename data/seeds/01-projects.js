
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('projects').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('projects').insert([
        { name: 'Build a Gaming PC', description: 'I want to build a proper gaming PC so I can play all the latest games in high quality.', completed: 1 },
        { name: 'Graduate Lambda School', description: 'I want to start my career as a developer as soon as possible, so I need to graduate Lambda School.', completed: 0 },
        { name: 'Start Watching Doctor Who Again', description: 'I fell off of Doctor Who after season 10, so I want to get back into it.', completed: 0 }
      ]);
    });
};
