
const express = require('express');
module.exports= ({projectController,authentication})=>{
        const router = express.Router();
        router.post('/project/create',authentication.verify,projectController.create);
        router.post('/project/update/:id',authentication.verify,projectController.update);
        router.post('/project/delete/:id',authentication.verify,projectController.delete);
        router.post('/project/list/:id',authentication.verify,projectController.list);
        router.post('/project/search/:id',authentication.verify,projectController.search);
        router.post('/project/addUser',authentication.verify,projectController.addUser);
        router.post('/project/removeUser',authentication.verify,projectController.removeUser);
        router.post('/project/getProjectByUser/:id',authentication.verify,projectController.getProjectByUser);
        router.post('/project/userSearchProject/:id',authentication.verify,projectController.userSearchProject);
        return router;
     }

