const express = require('express');
const projectsModel = require('./projects-model');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        let projects = await projectsModel.find();
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: 'The projects information could not be retrieved.' });
    }
});

router.get('/:id', async (req, res) => {
    try {
        let project = await projectsModel.find(req.params.id);
        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({ message: 'The project with the specified ID does not exist.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'The projects information could not be retrieved.' });
    }
});

module.exports = router;