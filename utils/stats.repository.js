pool = require("../utils/db.js");


module.exports = {
    async getStats() {
        // get usersCount, productsCount, orderCount, reviewsCount,
        // mostBoughtProduct, totalMoneySpent
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT COUNT(*) AS usersCount FROM Users";
            const [rows, fields] = await conn.execute(sql);
            let usersCount = rows[0].usersCount;
            sql = "SELECT COUNT(*) AS productsCount FROM Products";
            const [rows2, fields2] = await conn.execute(sql);
            let productsCount = rows2[0].productsCount;
            sql = "SELECT COUNT(*) AS ordersCount FROM Website_Order";
            const [rows3, fields3] = await conn.execute(sql);
            let ordersCount = rows3[0].ordersCount;
            sql = "SELECT COUNT(*) AS reviewsCount FROM Review";
            const [rows4, fields4] = await conn.execute(sql);
            let reviewsCount = rows4[0].reviewsCount;
            sql = "SELECT p.Id_Products, p.name_product AS name, SUM(b.quantity) AS total_sold_quantity FROM Products p JOIN Buy b ON p.Id_Products = b.Id_Products GROUP BY p.Id_Products ORDER BY total_sold_quantity DESC LIMIT 1;";
            const [rows5, fields5] = await conn.execute(sql);
            let mostBoughtProduct = rows5[0].name_product;
            sql = "SELECT SUM(total_price) AS total_money_made FROM Website_Order;";
            const [rows6, fields6] = await conn.execute(sql);
            let totalMoneySpent = rows6[0].totalMoneySpent;
            conn.release();
            return {
                usersCount: rows[0]["usersCount"],
                productsCount: rows2[0]["productsCount"],
                ordersCount: rows3[0]["ordersCount"],
                reviewsCount: rows4[0]["reviewsCount"],
                mostBoughtProduct: rows5[0]["name"],
                totalMoneySpent: rows6[0]["total_money_made"]
            };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async get3MostSoldProducts() {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT p.Id_Products AS id, p.name_product AS name, p.image AS image, p.Id_category AS cat, SUM(b.quantity) AS total_sold_quantity FROM Products p JOIN Buy b ON p.Id_Products = b.Id_Products GROUP BY p.Id_Products ORDER BY total_sold_quantity DESC LIMIT 3;";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};