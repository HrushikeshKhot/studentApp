const express = require('express');
const router = express.Router();
const ext = require('../services/examtype');

router

.post('/get',ext.get)
.post('/create',ext.createValidate(),ext.create)
.put('/update',ext.updateValidate(),ext.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;