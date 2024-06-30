const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
const { generateToken } = require('../middlewares/auth');

router.use(express.json());

// router.use((req, res, next) => {
//     console.log('Request to:', req.method, req.url);
//     next();
//   });

router.post('/login', login);

// router.get('/test', async (req, res) => {
//     const sqlQuery = 'SELECT * FROM app.users';
//     try {
//         const users = await queryDatabase(sqlQuery);
//         res.json(users);
//     } catch (error) {
//         console.error('Error fetching users:', error);
//         res.status(500).json({ error: 'An error occurred while fetching users' });
//     }
// });

module.exports = router;