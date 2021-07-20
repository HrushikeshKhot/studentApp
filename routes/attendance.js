const express = require('express');
const router = express.Router();
const att = require('../services/attendance');

router

.post('/get',att.get)
.post('/create',att.createValidate(),att.create)
.put('/update',att.updateValidate(),att.update)

module.exports = router;