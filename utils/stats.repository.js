pool = require("../utils/db.js");


module.exports = {
    async getUserCount() {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT COUNT(*) AS usersCount FROM Users";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows[0]["usersCount"];
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getProductCount() {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT COUNT(*) AS productsCount FROM Products";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows[0]["productsCount"];
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getOrderCount() {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT COUNT(*) AS ordersCount FROM Website_Order";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows[0]["ordersCount"];
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getReviewCount() {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT COUNT(*) AS reviewsCount FROM Review";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows[0]["reviewsCount"];
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getMostBoughtProduct() {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT p.Id_Products, p.name_product AS name, SUM(b.quantity) AS total_sold_quantity FROM Products p JOIN Buy b ON p.Id_Products = b.Id_Products GROUP BY p.Id_Products ORDER BY total_sold_quantity DESC LIMIT 1;";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows[0]["name"];
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getTotalMoneySpent() {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT SUM(p.product_price * b.quantity) AS total_money_made FROM Products p JOIN Buy b ON p.Id_Products = b.Id_Products;";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows[0]["total_money_made"];
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getStats() {
        // get usersCount, productsCount, orderCount, reviewsCount,
        // mostBoughtProduct, totalMoneySpent
        try {
            let usersCount = await this.getUserCount();
            let productsCount = await this.getProductCount();
            let ordersCount = await this.getOrderCount();
            let reviewsCount = await this.getReviewCount();
            let mostBoughtProduct = await this.getMostBoughtProduct();
            let totalMoneySpent = await this.getTotalMoneySpent();
            return {
                usersCount: usersCount,
                productsCount: productsCount,
                ordersCount: ordersCount,
                reviewsCount: reviewsCount,
                mostBoughtProduct: mostBoughtProduct,
                totalMoneySpent: totalMoneySpent
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