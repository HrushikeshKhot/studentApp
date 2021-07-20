const mm = require('../utilities/dbModule');
const jwt = require('jsonwebtoken');
const { validationResult, body } = require('express-validator');


var gradeMaster = "grade_master";
var viewGradeMaster = "view_" + gradeMaster;

function reqData(req) {

    var data = {
        GRADE_ID: req.body.GRADE_ID,
        NAME: req.body.NAME,
        DESC: req.body.DESC,
        CLIENT_ID: req.body.CLIENT_ID
    }
    return data;
}

exports.createValidate = function () {
    return [

        body('GRADE_ID').notEmpty().withMessage('Grade_id should not be empty'),
    
        body('NAME').notEmpty().withMessage('Grade name should not be empty'),
        

    ]
}




exports.updateValidate = function () {
    return [
        body('ID').notEmpty().withMessage('id should not be empty'),
        body('GRADE_ID').notEmpty().withMessage('Grade_id should not be empty').optional(),
    
        body('NAME').notEmpty().withMessage('Grade name should not be empty').optional(),

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
        mm.executeDQL('select count(*) as cnt from ' + viewGradeMaster + ' where 1 ' + countCriteria, [], supportKey, (error, results1) => {
            if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to get grade count.",
                });
            }
            else {
                console.log(results1);
                mm.executeDQL('select * from ' + viewGradeMaster + ' where 1 ' + criteria, [], supportKey, (error, results) => {
                    if (error) {
                        console.log(error);
                        res.send({
                            "code": 400,
                            "message": "Failed to get grade information."
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
             mm.executeDQL('INSERT INTO ' + gradeMaster + ' SET ?', data, supportKey, (error, results) => {
                if (error) {
                console.log(error);
                res.send({
                    "code": 400,
                    "message": "Failed to save grade information..."
                         });
                }
                else {
                    console.log(results);
                    res.send({
                    "code": 200,
                    "message": "grade information saved successfully...",
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
            mm.executeDQL(`UPDATE ` + gradeMaster + ` SET ${setData} CREATED_MODIFIED_DATE = '${systemDate}' where ID = ${criteria.ID} `, recordData, supportKey, (error, result2) => {
                if (error) {
                    console.log(error);
                    res.send({
                        "code": 400,
                        "message": "Failed to update grade information."
                    });
                }
                else {
                    console.log(result2);
                    res.send({
                        "code": 200,
                        "message": "grade information updated successfully...",
                    });
                }
            });
        } catch (error) {
            console.log(error);
        }
    }
}



