const express = require('express');

module.exports = ({ userController, authentication }) => {
  const router = express.Router();
  router.post('/user/login', userController.login);
  router.use('/user', authentication.verify)
  router.post('/user/create', userController.create);
  router.post('/user/delete/:id', userController.delete);
  router.post('/user/update/:id', userController.edit);
  router.post('/user/list/:id', userController.list);
  router.post('/user/get', userController.get);
  router.post('/user/search/:id', userController.search)
  return router;
}
