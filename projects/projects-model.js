const db = require('../data/dbConfig');

function find(id = null) {
    if (id) {
        return db('projects').where({ id }).first();
    } else {
        return db('projects');
    }
}

module.exports = {
    find
};