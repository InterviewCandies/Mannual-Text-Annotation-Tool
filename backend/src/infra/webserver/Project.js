
const express = require('express');

module.exports = ({ projectController }) => {
  const router = express.Router();
  router.post('/project/create', projectController.create);
  router.post('/project/update/:id', projectController.update);
  router.post('/project/delete/:id', projectController.delete);
  router.post('/project/get/:id', projectController.get);
  router.post('/project/statistics/:id', projectController.getStatistics);
  router.post('/project/list/:id', projectController.list);
  router.post('/project/addUser/:id', projectController.addUser);
  router.post('/project/removeUser/:id', projectController.removeUser);
  router.post('/project/userProjectList/:id', projectController.userProjectList);
  return router;
}
