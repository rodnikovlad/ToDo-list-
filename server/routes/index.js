const Router = require('express');
const router = new Router();

const listRoute = require('./listRoute');
const taskRoute = require('./taskRoute');

router.use('/list', listRoute);
router.use('/task', taskRoute);

module.exports = router;