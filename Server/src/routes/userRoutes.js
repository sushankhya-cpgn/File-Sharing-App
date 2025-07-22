const express = require('express');
const verifytoken = require('../middlewares/verifytokens');
const { userController } = require('../controller/userController');
const router = express.Router();

router.get('/',verifytoken,userController);

module.exports = router;;