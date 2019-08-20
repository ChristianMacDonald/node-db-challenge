const express = require('express');
const projectModel = require('./projects-model');

const router = express.Router();

router.post('/', validateProject, async (req, res) => {
    try {
        if (req.body.completed) {
            let project = await projectModel.insert(req.body);
            res.status(201).json(project);
        } else {
            let project = await projectModel.insert({ ...req.body, completed: 0 });
            res.status(201).json(project);
        }
    } catch (err) {
        res.status(500).json({ error: 'There was an issue saving the project to the database.' });
    }
});

router.get('/', async (req, res) => {
    try {
        let projects = await projectModel.get();
        projects.forEach(project => {
            if (project.completed) {
                project.completed = true;
            } else {
                project.completed = false;
            }
        });
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: 'The projects information could not be retrieved.' });
    }
});

router.get('/:id', validateProjectId, (req, res) => {
    if (req.project.completed) {
        req.project.completed = true;
    } else {
        req.project.completed = false;
    }
    res.status(200).json(req.project);
});

async function validateProjectId(req, res, next) {
    try {
        let project = await projectModel.get(req.params.id);
        if (project) {
            req.project = project;
            next();
        } else {
            res.status(404).json({ message: 'The project with the specified ID does not exist.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'The project information could not be retrieved.' });
    }
}

async function validateProject(req, res, next) {
    if (req.body) {
        if (req.body.name) {
            next();
        } else {
            res.status(400).json({ message: 'Missing required name field.' });
        }
    } else {
        res.status(400).json({ message: 'Missing project data.' });
    }
}

module.exports = router;