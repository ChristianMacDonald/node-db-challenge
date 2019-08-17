const cleaner = require('knex-cleaner');

exports.seed = function(knex) {
  cleaner.clean(knex, {
    ignoreTables: ['knex_migrations', 'knex_migrations_lock']
  });
};
