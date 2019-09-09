
const express = require('express');
const multer = require('multer')
const fileFilter = require('../utils/file-filter')
let upload = multer({ dest: 'uploads/',fileFilter : fileFilter }).single('file')
module.exports= ({datasetController})=>{
        const router = express.Router();
        router.post('/dataset/import/:id',upload,datasetController.importData);
        router.post('/dataset/export/:id',datasetController.exportData);
        router.post('/dataset/list/:id',datasetController.list);   
        router.post('/dataset/get/:id',datasetController.get);
        router.post('/dataset/search/:id',datasetController.search);   
        router.post('/dataset/update/:id',datasetController.edit);
        router.post('/dataset/delete/:id',datasetController.delete);
        router.post('/dataset/verify/:id',datasetController.verify)         
        router.post('/dataset/annotate/:id',datasetController.annotate)                                                                   
        return router;
     }

