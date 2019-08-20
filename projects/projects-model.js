const db = require('../data/dbConfig');

function get(id = null) {
    if (id) {
        return db('projects').where({ id }).first();
    } else {
        return db('projects');
    }
}

async function insert(project) {
    let [id] = await db('projects').insert(project);
    return get(id);
}

module.exports = {
    get,
    insert
};