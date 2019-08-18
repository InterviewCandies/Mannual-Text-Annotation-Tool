
const express = require('express');
module.exports= ({labelController,authentication})=>{
        const router = express.Router();
        router.post('/label/create',authentication.verify,labelController.create);
        router.post('/label/delete/:id',authentication.verify,labelController.delete);
        router.post('/label/update',authentication.verify,labelController.edit);
        router.post('/label/list/:id',authentication.verify,labelController.list);
        return router;
     }

