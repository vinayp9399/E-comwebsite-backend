const express = require('express');
const userscontroller = require('../controllers/userscontroller');
const router = express.Router();
const authVerify = require('../middleware/authVerify')

// Public routes (no token needed)
router.post('/registration', userscontroller.registration);
router.post('/login', userscontroller.login);
router.post('/refresh', userscontroller.refreshtoken);

// Protected routes
router.get('/userlist', authVerify, userscontroller.userlist);
router.get('/singleuserlist/(:id)', authVerify, userscontroller.singleuserlist);
router.delete('/deleteuser/(:id)', authVerify, userscontroller.deleteuser);

module.exports = router
