pool = require("../utils/db.js");


module.exports = {
    async getAllProducts() { // todo
        try {
            let conn = await pool.getConnection();
            let sql = "";
            const [rows, fields] = await conn.execute(sql);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getProductOfCategory(category) {
        try {
            let conn = await pool.getConnection();
            let sql = "SELECT * FROM Products WHERE Id_category=?";
            const [rows, _] = await conn.execute(sql, [category]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async getProductInfos(productID) {
        try {
            let conn = await pool.getConnection();
            // productID = parseInt(productID);
            let sql = "SELECT * FROM Products WHERE Id_Products=?";
            const [rows, _] = await conn.execute(sql, [ productID ]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async createProduct(name, price, desc, vegan, image, cat) {
        try {
            let conn = await pool.getConnection();
            let sql = "INSERT INTO Products (name_product, product_price, description, vegan, image, Id_category) VALUES (?, ?, ?, ?, ?, ?)";
            const [rows, fields] = await conn.execute(sql, [ name, price, desc, vegan, image, cat ]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async editProduct(productID, name, price, desc, vegan, image, cat) {
        try {
            let conn = await pool.getConnection();
            let sql = "UPDATE Products SET name_product=?, product_price=?, description=?, vegan=?, image=?, Id_category=? WHERE Id_products=?";
            const [rows, fields] = await conn.execute(sql, [ name, price, desc, vegan, image, cat, productID ]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    async deleteProduct(productID) {
        try {
            let conn = await pool.getConnection();
            let sql = "DELETE FROM Products WHERE Id_products=?";
            const [rows, fields] = await conn.execute(sql, [ productID ]);
            conn.release();
            return rows;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
};

