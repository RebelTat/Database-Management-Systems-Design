const dbConnection = require('../database/connection');

class chefController {
    static all(ctx){
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM Chef;';
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

    static noRecipe (ctx) {
        return new Promise((resolve, reject) => {
            const query = 'SELECT * FROM unassignedChefs AS `No Recipe Chefs`;';
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

    static update(ctx) {
        return new Promise((resolve, reject) => {
            const Chef = ctx.request.body;
            const query = `UPDATE Chef SET nameChef = ?, typeChef = ?, hourlyRate = ? WHERE ChefID = ?;`;
            dbConnection.query(
                {
                    sql: query,
                    values: [Chef.nameChef, Chef.typeChef, Chef.hourlyRate, ctx.params.id]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 204;
                    //console.log(ctx);
                    resolve();
            });
        });
    }

    static add(ctx) {
        return new Promise((resolve, reject) => {
            const Chef = ctx.request.body;
            const query = `INSERT INTO Chef VALUES (?, ?, ?, ?);`;
            dbConnection.query(
                {
                    sql: query,
                    values: [Chef.ChefID, Chef.nameChef, Chef.typeChef, Chef.hourlyRate]
                }, (err, res) => {
                    if(err) {
                        reject(err);
                    }
                    ctx.body = res;
                    ctx.status = 201;
                    //console.log(ctx);
                    resolve();
            });
        });
    }

    static delete(ctx) {
        return new Promise((resolve, reject) => {
            const query = 'DELETE FROM Chef WHERE ChefID = ?;';
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

module.exports = chefController;