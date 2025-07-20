const express = require('express');
const { loginController, signup } = require('../controller/loginController');
const router = express.Router();

router.post('/login',loginController);
router.post('/signup',signup)

module.exports = router;