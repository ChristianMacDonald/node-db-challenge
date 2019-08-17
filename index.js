const express = require('express');
const projectRouter = require('./projects/projects-router');
const resourceRouter = require('./resources/resources-router');
const taskRouter = require('./tasks/tasks-router');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter);
server.use('/api/resources', resourceRouter);
server.use('/api/tasks', taskRouter);

const port = 8000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});