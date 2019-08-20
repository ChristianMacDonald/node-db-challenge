const express = require('express');
const resourceModel = require('./resources-model');

const router = express.Router();

router.post('/', validateResource, async (req, res) => {
    try {
        let resource = await resourceModel.insert(req.body);
        res.status(201).json(resource);
    } catch (err) {
        res.status(500).json({ error: 'There was an issue saving the resource to the database.' });
    }
});

router.get('/', async (req, res) => {
    try {
        let resources = await resourceModel.get();
        res.status(200).json(resources);
    } catch (err) {
        res.status(500).json({ error: 'The resources information could not be retrieved.' });
    }
});

router.get('/:id', validateResourceId, (req, res) => {
    res.status(200).json(req.resource);
});

async function validateResourceId(req, res, next) {
    try {
        let resource = await resourceModel.get(req.params.id);
        if (resource) {
            req.resource = resource;
            next();
        } else {
            res.status(404).json({ message: 'The resource with the specified ID does not exist.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'The resource information could not be retrieved.' });
    }
}

async function validateResource(req, res, next) {
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            res.status(400).json({ message: 'Missing required name field.' });
        }
    } else {
        res.status(400).json({ message: 'Missing resource data.' });
    }
}

module.exports = router;