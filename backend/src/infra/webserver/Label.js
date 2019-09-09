
const express = require('express');
module.exports= ({labelController})=>{
        const router = express.Router();
        router.post('/label/create',labelController.create);
        router.post('/label/delete/:id',labelController.delete);
        router.post('/label/update/:id',labelController.edit);
        router.post('/label/list/:id',labelController.list);
        return router;
     }

