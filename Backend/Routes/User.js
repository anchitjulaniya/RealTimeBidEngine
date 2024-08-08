// routes/authRoutes.js
const express = require('express');
const { signup, signin } = require('../Controller/User');
const { authMiddleware } = require('../Middleware/authMiddleware');

const router = express.Router();

router.post('/signup', signup);
router.post('/signin', signin);

//
// router.get('/protected', authMiddleware, (req, res) => {
//   res.json({ message: 'This is a protected route', user: req.user });
// });

module.exports = router;
