const mysql = require('mysql');
require('dotenv').config();

const conn = mysql.createConnection({
    host     : process.env.MYSQL_HOST,
    user     : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE
});

exports.getRawData = (table) => {
    return new Promise((resolve, reject) => {
        conn.query(
            `SELECT * FROM ${table}`,
            (err, result) => {
                if (err) reject();
                resolve(JSON.parse(JSON.stringify(result)));
            }
        )
    })
}

exports.getDepartment = (dept_name) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT * FROM department WHERE dept_name = ?',
            [dept_name],
            (err, result) => {
                if (err) reject();
                resolve(JSON.parse(JSON.stringify(result)));
            }
        )
    })
}

exports.getTimeSlot = (time_slot_id) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT * FROM time_slot WHERE time_slot_id = ?',
            [time_slot_id],
            (err, result) => {
                if (err) reject();
                resolve(JSON.parse(JSON.stringify(result)));
            }
        )
    })
}

exports.getClassroom = (building, room_number) => {
    return new Promise((resolve, reject) => {
        conn.query(
            'SELECT * FROM classroom WHERE building = ? and room_number = ?',
            [building, room_number],
            (err, result) => {
                if (err) reject();
                resolve(JSON.parse(JSON.stringify(result)));
            }
        )
    })
}
