
var mysql = require('mysql');
//const lgConfig = require("../logger/loggerDbConfig");
//const logger = require("./logger");

var counter = 0;
var poolConfig = {
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    multipleStatements: true,
}

//console.log(poolConfig);

var pool = mysql.createPool(poolConfig);
pool.on('connection', function (connection) {
    connection.on('error', function (error) {
        console.error(new Date(), 'MySQL error', error.code);
    });
    connection.on('close', function (error) {
        console.error(new Date(), 'MySQL close', error);
    });
});



exports.openConnection = () => {
    var connection = mysql.createConnection(poolConfig);
    counter += 1;

    connection.connect();
    connection.beginTransaction((error) => {
        if (error)
            console.log("Transaction error : ", error);
    });

    return connection;
}


exports.closeConnection = (connection) => {
    try {
        connection.release();
    } catch (error) {
    }
}



exports.getDB = () => {

    var connection = mysql.createConnection(poolConfig);
    counter += 1;
    connection.connect();

    console.log("counter : " + counter);
    return connection;
}



exports.executeDDL = (query, supportKey, callback) => {
    var con = this.openConnection();
    //counter += 1;
    // console.log("Counter = " + counter);
    try {
        //   console.log(query);

        con.query(query, callback);
        //console.log(dbConfig.getDB().query(query));
        //if(JSON.stringify(query).startsWith('UPDATE'))
        // if (supportKey)
        //logger.database(supportKey + " " + query, supportKey);

    } catch (error) {
        console.log("Error : -" + error)
    }
    finally {
        con.end();
    }
}


exports.executeDQL = (query, values,supportKey, callback) => {
    // var con = this.openConnection();
    //counter += 1;
    // console.log("Counter = " + counter);

    try {
        var connection = mysql.createConnection(poolConfig);
        counter += 1;
        //console.log('values');
        console.log(values);
        connection.connect();
        console.log(query);
        connection.query(query, values, callback);
        //console.log(dbConfig.getDB().query(query));
        //if(JSON.stringify(query).startsWith('UPDATE'))
        // if (supportKey)
        //     logger.database(supportKey + " " + query, supportKey);

    } catch (error) {
        console.log("Error : -" + error)
    }
    finally {
      //  connection.end();
    }
}



exports.executeDML = (query, values, supportKey, con, callback) => {

    //counter += 1;
    // console.log("Counter = " + counter);
    try {
        //console.log(query,values);
        // console.log(con);
        con.query(query, values, callback);
        // if (supportKey)
        //   logger.database(query+ " " +values.toString(), supportKey);

    } catch (error) {
        console.log("Error : -" + error)
    }
    finally { }
}


exports.executeDMLPromise = (query, values, supportKey, con) => {
    try {
        return new Promise((resolve) => {
            con.query(query, values, function (err, rows, fields) {
                if (err) {
                    console.log(err)
                    resolve("ERROR");
                }
                resolve(rows);
            });
        })
    } catch (error) {
        console.log("Error : -" + error);
        return '';
    }

}


exports.rollbackConnection = (connection) => {
    try {
        connection.rollback(function () {
            console.log('rollbacked connection...');
            connection.end();
        });
    } catch (error) { console.log("Exception in rollbackConnection : ", error); }
}

exports.commitConnection = (connection) => {
    try {
        connection.commit(function () {
            console.log('commited connection...')
            connection.end();
        });
    } catch (error) { console.log("Exception in rollbackConnection : ", error); }
}





exports.diff_hours = (dt2, dt1) => {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= (60 * 60);
    return Math.abs(diff);

}


exports.diff_minutes = (dt2, dt1) => {
    //console.log(dt2, dt1);
    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    diff /= 60;
    return Math.abs(diff);

}

exports.diff_seconds = (dt2, dt1) => {

    var diff = (dt2.getTime() - dt1.getTime()) / 1000;
    return Math.abs(diff);

}



//getCurrentdate
exports.getSystemDate = function () {
    let date_ob = new Date();
    // current date 
    // adjust 0 before single digit date
    let day = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);
    date_cur = year + "-" + month + "-" + day + " " + hours + ":" + minutes + ":" + seconds;

    return date_cur;
}


exports.getTimeDate = function () {
    let date_ob = new Date();
    // current date
    // adjust 0 before single digit date
    let date = ("0" + date_ob.getDate()).slice(-2);

    // current month
    let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

    // current year
    let year = date_ob.getFullYear();

    // current hours
    let hours = ("0" + date_ob.getHours()).slice(-2);

    // current minutes
    let minutes = ("0" + date_ob.getMinutes()).slice(-2);

    // current seconds
    let seconds = ("0" + date_ob.getSeconds()).slice(-2);
    // prints date & time in YYYY-MM-DD HH:MM:SS format
    //console.log(year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds);

    date_cur = year + month + date + hours + minutes + seconds;

    return date_cur;
}

//get Intermediate dates 
exports.intermediateDates = function (startDate, endDate) {
    //console.log("intermediate" + startDate + " "+endDate);
    var startDatea = new Date(startDate); //YYYY-MM-DD
    var endDatea = new Date(endDate); //YYYY-MM-DD
    var getDateArray = function (start, end) {
        var arr = new Array();
        var dt = new Date(start);
        while (dt <= end) {

            var tempDate = new Date(dt);
            let date = ("0" + tempDate.getDate()).slice(-2);

            // current month
            let month = ("0" + (tempDate.getMonth() + 1)).slice(-2);

            // current year
            let year = tempDate.getFullYear();

            arr.push(year + "-" + month + "-" + date);
            dt.setDate(dt.getDate() + 1);
        }
        //console.log(arr);
        return arr;
    }

    var dateArr = getDateArray(startDatea, endDatea);
    return dateArr;
}


exports.generateKey = function (size) {

    var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    var result = '';
    for (var i = size; i > 0; --i) result += chars[Math.floor(Math.random() * chars.length)];
    console.log('length = ', result.length);
    return result;

}



