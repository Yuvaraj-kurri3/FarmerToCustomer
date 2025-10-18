const user = require('../controller/Usercontroller');
const express = require('express');
const router = express.Router();

router.post('/signup', user.signup);
router.post('/login', user.login);

module.exports = router;