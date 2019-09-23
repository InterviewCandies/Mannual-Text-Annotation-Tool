const express = require('express');
const multer = require('multer');
const fileFilter = require('../utils/file-filter');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    let ext = file.originalname.substring(file.originalname.lastIndexOf('.'), file.originalname.length);
    return cb(null, Date.now() + ext);
  },
  
})


const upload = multer({ storage:storage, fileFilter : fileFilter }).single('file');

module.exports = ({ datasetController }) => {
  const router = express.Router();
  router.post('/dataset/import/:id', upload, datasetController.importData);
  router.post('/dataset/export/:id', datasetController.exportData);
  router.post('/dataset/list/:id', datasetController.list);
  router.post('/dataset/get/:id', datasetController.get);
  router.post('/dataset/getAll/:id', datasetController.getAll);
  router.post('/dataset/update/:id', datasetController.edit)
  router.post('/dataset/delete/:id', datasetController.delete)
  router.post('/dataset/verify/:id', datasetController.verify)
  router.post('/dataset/annotate/:id', datasetController.annotate)
  return router;
}
