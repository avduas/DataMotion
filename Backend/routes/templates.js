const express = require('express');
const router = express.Router();
const { insertTemplate, getTemplatesByOrgId, deleteTemplates, getTemplateById } = require('../controllers/templateController');
const { authenticateUser } = require('../middlewares/auth');

router.post('/template_create', authenticateUser, insertTemplate);
router.get('/template_get', authenticateUser, getTemplatesByOrgId);
router.get('/template_get/:id', authenticateUser, getTemplateById);
router.delete('/template_del/:id', authenticateUser, deleteTemplates);

module.exports = router;