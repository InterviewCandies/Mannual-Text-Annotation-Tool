
const express = require('express');
module.exports= ({projectController,authentication})=>{
        const router = express.Router();
        router.post('/project/create',authentication.verify,projectController.createProject);
        router.post('/project/update',authentication.verify,projectController.updateProject);
        router.post('/project/delete',authentication.verify,projectController.deleteProject);
        router.get('/project/list',authentication.verify,projectController.list);
        router.post('/project/addUser',authentication.verify,projectController.addUser);
        router.post('/project/removeUser',authentication.verify,projectController.removeUser);
        router.post('/project/getProjectByUser',authentication.verify,projectController.getProjectByUser);
        return router;
     }

