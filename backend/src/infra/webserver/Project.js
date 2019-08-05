
const express = require('express');
const ProjectController = require('../../deliveries/Controller/project.controller');
module.exports= ()=>{
        const router = express.Router();
        router.post('/project/create',ProjectController.createProject);
        router.post('/project/update/:id',ProjectController.updateProject);
        router.post('/project/delete/:id',ProjectController.deleteProject);
        router.get('/project/list',ProjectController.list);
        router.post('/project/addUser/:id',ProjectController.addUser)

        return router;
     }

