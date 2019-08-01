
const express = require('express');
const UserController = require('../../deliveries/Controller/user.controller')
module.exports= ()=>{
        const router = express.Router();
        router.post('/user/login',UserController.login);
        router.post('/user/create',UserController.createUser);
        router.post('/user/delete/:id',UserController.deleteUser);
        return router;
     }

