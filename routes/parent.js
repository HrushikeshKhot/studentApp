const express = require('express');
const router = express.Router();
const par = require('../services/parent');

router

.post('/get',par.get)
.post('/create',par.createValidate(),par.create)
.put('/update',par.updateValidate(),par.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;