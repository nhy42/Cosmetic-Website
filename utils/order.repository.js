pool = require("../utils/db.js");


module.exports = {
    async addToCart(productID, quantity, accountID) {
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Wish (Id_users, Id_Products, quantity) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity);";
            const [rows, fields] = await conn.execute(sql, [accountID, productID, quantity]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async clearCart(accountID) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM Wish WHERE Id_users = ?";
            const [rows, _] = await conn.execute(sql, [accountID]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async getCart(accountID) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT w.Id_users, w.Id_Products, p.name_product, p.product_price, p.description, p.vegan, p.image, w.quantity FROM Wish w JOIN Products p ON w.Id_Products = p.Id_Products WHERE w.Id_users = ?;";
            const [rows, _] = await conn.execute(sql, [accountID]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async checkout(accountID) {
        try {
            let conn = await pool.getConnection();
            let sql = `INSERT INTO Website_Order (date_order, delivery_adress, total_price, rememember_card)
                VALUES (
                    NOW(),
                    'Default Address',
                    (SELECT SUM(p.product_price * w.quantity) FROM Wish w JOIN Products p ON w.Id_Products = p.Id_Products WHERE w.Id_users = ?),
                    0
                );`;
            const [rows, _] = await conn.execute(sql, [accountID, accountID, accountID, accountID]);
            let sql2 = `INSERT INTO Buy (Id_users, Id_Products, Id_Order, quantity)
                SELECT
                    ? AS Id_users,
                    w.Id_Products,
                    LAST_INSERT_ID() AS Id_Order,
                    w.quantity
                FROM Wish w
                WHERE w.Id_users = ?;`;
            const [rows2, _2] = await conn.execute(sql2, [accountID, accountID]);
            let sql3 = "DELETE FROM Wish WHERE Id_users = ?";
            const [rows3, _3] = await conn.execute(sql3, [accountID]);
            conn.release();
            return rows.insertId;
        } catch (err) {
            console.log(err);
            return false;
        }
    },
    async deleteFromCart(productID, accountID) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM Wish WHERE Id_users = ? AND Id_Products = ?";
            const [rows, _] = await conn.execute(sql, [accountID, productID]);
            conn.release();
            return rows;
        } catch (err) {
            console.log(err);
            return false;
        }
    }
}