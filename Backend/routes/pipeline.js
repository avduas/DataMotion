const express = require('express');
const router = express.Router();
const { getPipeline, insertPipeline, deletePipeline } = require('../controllers/pipelineController');
const { authenticateUser } = require('../middlewares/auth');

router.get('/pipeline_get', authenticateUser, getPipeline);
router.post('/pipeline_post', authenticateUser, insertPipeline);
router.delete('/pipeline_delete', authenticateUser, deletePipeline)

module.exports = router;