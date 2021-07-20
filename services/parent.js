const mm = require('../utilities/dbModule');
const jwt = require('jsonwebtoken');
const { validationResult, body } = require('express-validator');


var parentMaster = "parent_master";
var viewParentMaster = "view_" + parentMaster;

function reqData(req) {

    var data = {
        PARENT_ID: req.body.PARENT_ID,
        EMAIL: req.body.EMAIL,
        PASSWORD: req.body.PASSWORD,
        FNAME: req.body.FNAME,
        LNAME: req.body.LNAME,
        DOB: req.body.DOB,
        MOBILE_NO: req.body.MOBILE_NO,
        STATUS: req.body.STATUS ,
        LAST_LOGIN_DATE: req.body.LAST_LOGIN_DATE,
        LAST_LOGIN_IP: req.body.LAST_LOGIN_IP,
        CLIENT_ID: req.body.CLIENT_ID
    }
    return data;
}

exports.createValidate = function () {
    return [

       
        body('PARENT_ID').notEmpty().withMessage('Parent_id should not be empty'),

        body('FNAME').notEmpty().withMessage('Parrent  first name should not be empty'),
        body('LNAME').notEmpty().withMessage('Parrent  last name should not be empty'),
        body('EMAIL').notEmpty().withMessage('EMAIL_ID should not be empty'),

        body('MOBILE_NO').isLength({ min: 10, max: 10 }).withMessage('Mobile Number must be 10 digits')
            .isMobilePhone('en-IN').withMessage('Enter valid Mobile Number')
            .notEmpty().withMessage('Mobile number should not empty'),

        body('PASSWORD').isLength({ min: 6, max: 10 }).withMessage('Password length Must Be at Least 6 and at most 10')
            .notEmpty().withMessage('Password should not empty'),

    ]
}




exports.updateValidate = function () {
    return [
        body('ID').notEmpty().withMessage('id should not be empty'),
        body('MOBILE_NO').isLength({ min: 10, max: 10 }).withMessage('mobile number must be 10 digits')
            .isMobilePhone('en-IN').withMessage('Enter valid mobile number')
            .notEmpty().withMessage('mobile number should not empty')
            .optional(),

        body('PASSWORD').isLength({ min: 6, max: 10 }).withMessage('Password Must Be at Least 6 and at most 10')
            .notEmpty().withMessage('Password should not empty')
            .optional(),

    ]
}



exports.get = (req, res) => {

    var pageIndex = req.body.pageIndex ? req.body.pageIndex : '';

    var pageSize = req.body.pageSize ? req.body.pageSize : '';
    var start = 0;
    var end = 0;

    console.log(pageIndex + " " + pageSize)
    if (pageIndex != '' && pageSize != '') {
        start = (pageIndex - 1) * pageSize;
        end = pageSize;
        console.log(start + " " + end);
    }

    let sortKey = req.body.sortKey ? req.body.sortKey : 'ID';
    let sortValue = req.body.sortValue ? req.body.sortValue : 'DESC';
    let filter = req.body.filter ? req.body.filter : '';

    let criteria = '';

    if (pageIndex === '' && pageSize === '')
        criteria = filter + " order by " + sortKey + " " + sortValue;
    else
        criteria = filter + " order by " + sortKey + " " + sortValue + " LIMIT " + start + "," + end;

    let countCriteria = filter;
    var supportKey = req.headers['supportkey'] ? req.headers['supportkey'] : '';
    try {
        mm.executeDQL('select count(*) as cnt from ' + viewParentMaster + ' where 1 ' + countCriteria, [], supportKey, (error, results1) => {
            if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to get parrent count.",
                });
            }
            else {
                console.log(results1);
                mm.executeDQL('select * from ' + viewParentMaster + ' where 1 ' + criteria, [], supportKey, (error, results) => {
                    if (error) {
                        console.log(error);
                        res.send({
                            "code": 400,
                            "message": "Failed to get parrent information."
                        });
                    }
                    else {
                        res.send({
                            "code": 200,
                            "message": "success",
                            "count": results1[0].cnt,
                            "data": results
                        });
                    }
                });
            }
        });
    } catch (error) {
        console.log(error);
    }

}

exports.create = (req, res) => {

    var data = reqData(req);
    const errors = validationResult(req);
    var supportKey = req.headers['supportkey'] ? req.headers['supportkey'] : '';

    if (!errors.isEmpty()) {

        console.log(errors);
        res.send({
            "code": 422,
            "message": errors.errors
        });
    }
    else {
        try {
             mm.executeDQL('INSERT INTO ' + parentMaster + ' SET ?', data, supportKey, (error, results) => {
                if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to save parent information..."
                         });
                }
                else {
                    console.log(results);
                    res.send({
                    "code": 200,
                    "message": "parrent information saved successfully...",
                    "data": [{ ID: results.insertId }]
                     });
                }
            });      
                 
        } catch (error) { console.log(error); }
    }
}


exports.update = (req, res) => {
    const errors = validationResult(req);
    //console.log(req.body);
    var data = reqData(req);
    var supportKey = req.headers['supportkey'] ? req.headers['supportkey'] : '';
    var criteria = {
        ID: req.body.ID
    };
    var systemDate = mm.getSystemDate();
    var setData = "";
    var recordData = [];


    Object.keys(data).forEach(key => {
        data[key] ? setData += `${key}= ? , ` : true;
        data[key] ? recordData.push(data[key]) : true;
    });

    if (!errors.isEmpty()) {
        console.log(errors);
        res.send({
            "code": 422,
            "message": errors.errors
        });
    }
    else {
        try {
            mm.executeDQL(`UPDATE ` + parentMaster + ` SET ${setData} CREATED_MODIFIED_DATE = '${systemDate}' where ID = ${criteria.ID} `, recordData, supportKey, (error, result2) => {
                if (error) {
                    console.log(error);
                    res.send({
                        "code": 400,
                        "message": "Failed to update parent information."
                    });
                }
                else {
                    console.log(result2);
                    res.send({
                        "code": 200,
                        "message": "parent information updated successfully...",
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}


