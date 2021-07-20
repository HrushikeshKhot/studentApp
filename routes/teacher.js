const express = require('express');
const router = express.Router();
const tech = require('../services/teacher');

router

.post('/get',tech.get)
.post('/create',tech.createValidate(),tech.create)
.put('/update',tech.updateValidate(),tech.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;