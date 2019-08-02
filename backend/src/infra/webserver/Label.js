
const express = require('express');
const LabelController = require('../../deliveries/Controller/label.controller')
module.exports= ()=>{
        const router = express.Router();
        router.post('/label/create',LabelController.createLabel);
        router.post('/label/delete/:id',LabelController.deleteLabel);
        router.post('/label/edit/:id',LabelController.editLabel);
        router.get('/label/list/:id',LabelController.list);
        return router;
     }

