
const express = require('express');
const LabelController = require('../../deliveries/Controller/label.controller')
module.exports= ()=>{
        const router = express.Router();
        router.post('/label/create',LabelController.createLabel);
        return router;
     }

