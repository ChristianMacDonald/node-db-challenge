const express = require('express');
const projectRouter = require('./projects/projects-router');

const server = express();

server.use(express.json());
server.use('/api/projects', projectRouter);

const port = 8000;

server.listen(port, () => {
    console.log(`Server listening on port ${port}.`);
});