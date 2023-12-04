pool = require("../utils/db.js");
const bcrypt = require('bcrypt');


module.exports = {
    getBlankUser () { // defines the entity model
        return {
            "Id_user": 0,
            "firstname": "XXXX",
            "lastname": "XXXX",
            "password": "XXXX",
            "gender": "XXXX",
            "date_of_birth": 0
        };
    },
    async createNewUser (mail, firstname, lastname, password, gender, date_of_birth) {
        try {
            password = await bcrypt.hash(password, 10);
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Users VALUES (null, ?, ?, ?, ?, ?, 'customer', ?)";
            const [rows, field] = await conn.execute(sql, [mail, lastname, firstname, password, gender, date_of_birth]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async deleteUser (mail) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM Users WHERE mail = ?";
            const [rows, field] = await conn.execute(sql, [mail]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async getUserInfos (userID) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Users WHERE Id_users = ?";
            const [rows, fields] = await conn.execute(sql, [userID]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    },
    async editUserInfos (userID, mail, firstname, lastname, password, gender, date_of_birth) {
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE `Users` SET `mail` = ?, `lastname` = ?, `firstname` = ?, `password` = ?, `gender` = ?, `date_of_birth` = ? WHERE `Users`.`Id_users` = ?; "
            const [rows, fields] = await conn.execute(sql, [mail, lastname, firstname, password, gender, date_of_birth, userID]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async areValidCreds(mail, password) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Users WHERE mail = ?";
            const [rows, fields] = await conn.execute(sql, [mail]);
            conn.release();
            // check bcrypt password
            if (rows.length === 1 && await bcrypt.compare(password, rows[0].password)) {
                return {
                    id: rows[0].Id_users,
                    mail: rows[0].mail,
                    role: rows[0].user_type
                };
            }
            return false;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
};