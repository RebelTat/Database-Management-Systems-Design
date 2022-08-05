const dbConnection = require('../database/connection');

class costController {

    static all(ctx){
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Sales JOIN Expenses;';
            dbConnection.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }

                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            });
        });
    }

    static sales(ctx){
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Sales;';
            dbConnection.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }

                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            });
        });
    }

    static expenses(ctx){
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Expenses;';
            dbConnection.query(query, (err, res) => {
                if(err) {
                    reject(err);
                }

                ctx.body = res;
                ctx.status = 200;
                resolve(res);
            });
        });
    }

    static costlyRecipes (ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT Distinct Recipe.Recipe_Name AS `Recipe`, SUM(Recipe.priceSold - ((Ingredients.quantity * Inventory.costPerUnit) + (Recipe.timeUsed * Chef.hourlyRate))) AS `Money Loss` FROM Recipe JOIN Ingredients ON Ingredients.RecipeID = Recipe.RecipeID JOIN Inventory ON Inventory.InventoryID = Ingredients.InventoryID JOIN Chef ON Chef.ChefID = Recipe.ChefID GROUP BY Recipe.Recipe_Name HAVING SUM(Recipe.priceSold - ((Ingredients.quantity * Inventory.costPerUnit) + (Recipe.timeUsed * Chef.hourlyRate))) < 0;';
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.curDate]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve(res);
            });
        });
    }

    static netCost (ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT costOfRest(?) AS `Restaurant Profit/Loss`;';
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.curDate]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve(res);
            });
        });
    }

    static updateSale(ctx) {
        return new Promise((resolve, reject) => {
            const Sales = ctx.request.body;
            const query = `UPDATE Sales SET RecipeID = ?, quantitySold = ?, dateSold = ? WHERE SalesID = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [Sales.RecipeID, Sales.quantitySold, Sales.dateSold, ctx.params.id]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 204;
                    resolve(res);
            });
        });
    }

    static addSale(ctx) {
        return new Promise((resolve, reject) => {
            const Sales = ctx.request.body;
            const query = `INSERT INTO Sales VALUES (?, ?, ?, ?);`;
            dbConnection.query(
                {
                    sql: query,
                    values: [Sales.SalesID, Sales.RecipeID, Sales.quantitySold, Sales.dateSold]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    resolve(res);
            });
        });
    }

    static deleteSale(ctx) {
        return new Promise((resolve, reject) => {
            const query = `DELETE FROM Sales WHERE SalesID = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.id]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve(res);
            });
        });
    }

    static updateExpense(ctx) {
        return new Promise((resolve, reject) => {
            const Expenses = ctx.request.body;
            const query = `UPDATE Expenses SET nameExpenses = ?, catagory = ?, amount = ?, dateSpent = ?, WHERE ExpensesID = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [Expenses.nameExpenses, Expenses.catagory, Expenses.amount, Expenses.dateSpent, ctx.params.id]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 204;
                    resolve(res);
            });
        });
    }

    static addExpense(ctx) {
        return new Promise((resolve, reject) => {
            const Expenses = ctx.request.body;
            const query = `INSERT INTO Expenses VALUES (?, ?, ?, ?, ?);`;
            dbConnection.query(
                {
                    sql: query,
                    values: [Expenses.ExpensesID, Expenses.nameExpenses, Expenses.catagory, Expenses.amount, Expenses.dateSpent]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    resolve(res);
            });
        });
    }

    static deleteExpense(ctx) {
        return new Promise((resolve, reject) => {
            const Expenses = ctx.request.body;
            const query = `DELETE FROM Expenses WHERE ExpensesID = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.id]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 200;
                    resolve(res);
            });
        });
    }

}

module.exports = costController;