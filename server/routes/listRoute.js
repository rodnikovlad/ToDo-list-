const Router = require('express');
const router = new Router();

const listController = require('../controllers/listController');

router.post('/create', listController.create);
router.post('/delete', listController.delete);
router.get('/getListTasks', listController.getListTasks);
router.get('/get', listController.get);

module.exports = router;