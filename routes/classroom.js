const express = require('express');
const router = express.Router();
const cl = require('../services/classroom');

router

.post('/get',cl.get)
.post('/create',cl.createValidate(),cl.create)
.put('/update',cl.updateValidate(),cl.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;