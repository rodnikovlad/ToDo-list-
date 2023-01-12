const Router = require('express');
const router = new Router();

const taskController = require('../controllers/taskController');

router.post('/create', taskController.create);
router.post('/delete', taskController.delete);
router.get('/get', taskController.get);
router.post('/updateStatus', taskController.updateStatus);
module.exports = router;