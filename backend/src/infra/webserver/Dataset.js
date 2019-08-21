
const express = require('express');
const multer = require('multer')
const fileFilter = require('../util/fileFilter')
let upload = multer({ dest: 'uploads/',fileFilter : fileFilter })
module.exports= ({datasetController,authentication})=>{
        const router = express.Router();
        router.post('/dataset/import/:id',authentication.verify,
                                          upload.single('file'),
                                          datasetController.importData);
        router.post('/dataset/list/:id',authentication.verify,datasetController.list);   
        router.post('/dataset/search/:id',authentication.verify,datasetController.search);   
        router.post('/dataset/update/:id',authentication.verify,datasetController.edit);
        router.post('/dataset/delete/:id',authentication.verify,datasetController.delete);
        router.post('/dataset/verify/:id',authentication.verify,datasetController.verify)                                      
        return router;
     }

