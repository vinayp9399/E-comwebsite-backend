const express = require('express');
const userscontroller = require('../controllers/userscontroller');
const router = express.Router();
router.get('/userlist',userscontroller.userlist);
router.get('/singleuserlist/(:id)',userscontroller.singleuserlist);
router.post('/registration',userscontroller.registration);
router.delete('/deleteuser/(:id)',userscontroller.deleteuser);
router.post('/login',userscontroller.login);
module.exports = router
