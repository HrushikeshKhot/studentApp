const express = require('express');
const router = express.Router();
const stud = require('../services/student');

router

.post('/get',stud.get)
.post('/create',stud.createValidate(),stud.create)
.put('/update',stud.updateValidate(),stud.update)
// .put('/changepassword',user.passwordValidate(),user.changePassword)
// .post('/forgotpassword',user.forgotPassword)

module.exports = router;