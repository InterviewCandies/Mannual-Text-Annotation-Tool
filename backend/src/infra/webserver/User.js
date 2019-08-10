
const express = require('express');
module.exports= ({userController,authentication})=>{
       const router = express.Router();
        router.post('/user/login',userController.login);
        router.post('/user/create',authentication.verify,userController.createUser);
        router.post('/user/delete',authentication.verify,userController.deleteUser);
        router.post('/user/update',authentication.verify,userController.editUser);
        router.get('/user/list',authentication.verify,userController.list);
        router.post('/user/get',authentication.verify,userController.get);
        router.post('/user/getUserByProject',authentication.verify,userController.getUserByProject);
        return router;
     }

