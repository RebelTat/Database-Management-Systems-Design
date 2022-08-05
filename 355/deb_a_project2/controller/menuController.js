const dbConnection = require('../database/connection');

class menuController {
    static all(ctx){
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Menu;';
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

    static byActiveStatus (ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Menu HAVING activeStatus = ?;';
            dbConnection.query(
                {
                    sql: query,
                    values: [ctx.params.activeStatus]
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

    static update(ctx) {
        return new Promise((resolve, reject) => {
            const Menu = ctx.request.body;
            const query = 'UPDATE Menu SET Menu_name = ?, activeStatus = ?, RecipeID = ? WHERE RecipeID = ? AND MenuID = ?;';
            dbConnection.query(
                {
                    sql: query,
                    values: [Menu.Menu_name, Menu.activeStatus, Menu.RecipeID, Menu.RecipeID, ctx.params.id]
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

    static add(ctx) {
        return new Promise((resolve, reject) => {
            const Menu = ctx.request.body;
            const query = 'INSERT INTO Menu VALUES (?, ?, ?, ?);';
            dbConnection.query(
                {
                    sql: query,
                    values: [Menu.MenuID, Menu.Menu_name, Menu.activeStatus, Menu.RecipeID]
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

    static delete(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Menu WHERE MenuID = ?;';
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

module.exports = menuController;