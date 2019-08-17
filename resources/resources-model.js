const db = require('../data/dbConfig');

function get(id = null) {
    if (id) {
        return db('resources').where({ id }).first();
    } else {
        return db('resources');
    }
}

async function insert(resource) {
    let [id] = await db('resources').insert(resource);
    return get(id);
}

module.exports = {
    get,
    insert
};