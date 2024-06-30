const express = require('express');
const router = express.Router();
const { insertDataRoute, getDataRoute, getOneData, deleteOneData } = require('../controllers/dataRouteController.js');
const { authenticateUser } = require('../middlewares/auth');

router.post('/dataRoute_post', authenticateUser, insertDataRoute);
router.get('/dataRoute_get', authenticateUser, getDataRoute);
router.get('/dataRoute_get/:id', authenticateUser, getOneData);
router.delete('/dataRoute_delete/:id', authenticateUser, deleteOneData);

module.exports = router;