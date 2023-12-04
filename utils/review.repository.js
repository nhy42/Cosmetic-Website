pool = require("../utils/db.js");


module.exports = {
    async addReview(prodQ, deliQ, deliS, custS, recomm, account_id, order_id) {
        try {
            // todo: check if order is linked to the right account
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Review VALUES (null, ?, ?, ?, ?, ?, ?, ?)";
            const [rows, field] = await conn.execute(sql, [prodQ, deliQ, deliS, custS, recomm, account_id, order_id]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async deleteReview(review_id, accID) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM Review WHERE Id_review = ? AND Id_users = ?";
            const [rows, field] = await conn.execute(sql, [review_id, accID]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async editReview(prodQ, deliQ, deliS, custS, recomm, account_id, review_id) {
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE `Review` SET `product_quality` = ?, `delivery_quality` = ?, `delivery_speed` = ?, `customer_service` = ?, `recommendation` = ? WHERE `Id_review` = ? AND `Id_users` = ?; ";
            const [rows, fields] = await conn.execute(sql, [prodQ, deliQ, deliS, custS, recomm, review_id, account_id]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    },
    async getReviewsOfUser(account_id) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Review WHERE Id_users = ?";
            const [rows, fields] = await conn.execute(sql, [account_id]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    },
    async getReviewInfos(review_id) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Review WHERE Id_review = ?";
            const [rows, _] = await conn.execute(sql, [review_id]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            return false;
        }
    }
};