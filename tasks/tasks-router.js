const express = require('express');
const taskModel = require('./tasks-model');

const router = express.Router();

router.post('/', validateTask, async (req, res) => {
    try {
        if (req.body.completed) {
            let task = await taskModel.insert(req.body);
            res.status(201).json(task);
        } else {
            let task = await taskModel.insert({ ...req.body, completed: 0 });
            res.status(201).json(task);
        }
    } catch (err) {
        res.status(500).json({ error: 'There was an issue saving the task to the database.' });
    }
});

router.get('/', async (req, res) => {
    try {
        let tasks = await taskModel.get();
        tasks.forEach(task => {
            if (task.completed) {
                task.completed = true;
            } else {
                task.completed = false;
            }
        });
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: 'The tasks information could not be retrieved.' });
    }
});

router.get('/:id', validateTaskId, (req, res) => {
    if (req.task.completed) {
        req.task.completed = true;
    } else {
        req.task.completed = false;
    }
    res.status(200).json(req.task);
});

async function validateTaskId(req, res, next) {
    try {
        let task = await taskModel.get(req.params.id);
        if (task) {
            req.task = task;
            next();
        } else {
            res.status(404).json({ message: 'The task with the specified ID does not exist.' });
        }
    } catch (err) {
        res.status(500).json({ error: 'The task information could not be retrieved.' });
    }
}

async function validateTask(req, res, next) {
    if (req.body) {
        if (req.body.description) {
            next();
        } else {
            res.status(400).json({ message: 'Missing required description field.' });
        }
    } else {
        res.status(400).json({ message: 'Missing task data.' });
    }
}

module.exports = router;