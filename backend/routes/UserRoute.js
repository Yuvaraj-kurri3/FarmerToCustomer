const controller = require('../controller/Usercontroller');
const express = require('express');
const router = express.Router();

router.post('/signup', controller.signup);
router.post('/login', controller.login);

module.exports = router;