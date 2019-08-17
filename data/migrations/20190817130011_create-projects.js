
exports.up = function(knex) {
    return knex.schema.createTable('projects', table => {
        table.increments();
        table.string('name', 128).notNullable();
        table.string('description');
        table.boolean('completed').notNullable();
    }).createTable('resources', table => {
        table.increments();
        table.string('name', 128).notNullable();
        table.string('description');
    }).createTable('project_resources', table => {
        table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onUpdate('CASCADE').onDelete('CASCADE');
        table.integer('resource_id').unsigned().notNullable().references('id').inTable('projects').onUpdate('CASCADE').onDelete('CASCADE');
        table.primary(['project_id', 'resource_id']);
    }).createTable('tasks', table => {
        table.increments();
        table.integer('project_id').unsigned().notNullable().references('id').inTable('projects').onUpdate('CASCADE').onDelete('CASCADE');
        table.string('description').notNullable();
        table.string('notes');
        table.boolean('completed').notNullable();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks').dropTableIfExists('project_resources').dropTableIfExists('resources').dropTableIfExists('projects');
};
