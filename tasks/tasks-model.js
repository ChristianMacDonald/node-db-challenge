const db = require('../data/dbConfig');

function get(id = null) {
    if (id) {
        return db('tasks').where({ id }).first();
    } else {
        return db('tasks');
    }
}

async function insert(resource) {
    let [id] = await db('tasks').insert(resource);
    return get(id);
}

module.exports = {
    get,
    insert
};