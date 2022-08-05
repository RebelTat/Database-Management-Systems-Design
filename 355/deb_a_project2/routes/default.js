//const demoRouter = require('./demo');
const menuRouter = require('./menu');
const chefRouter = require('./chef');
const costRouter = require('./cost');

const defaultRouter = require('koa-router')({
    prefix: '/restaurant_api/v1'
});

defaultRouter.get('/', (ctx) => { //HOME page
    ctx.body = 'Welcome to Restaurant DB created by Amit Deb!\nTo use this database use these routes (every route has an update, add, and delete EXCEPT /cost): \n/menu--shows all menus\n\t/<0 or 1>--shows all inactive or active menus\n/chef--shows all chefs\n\t/unassigned--shows all chefs which do not have recipes attached\n/cost--shows all sales and expenses\n\t/sales--shows all sales(also access to add/update/delete sales)\n\t/expenses--shows all expenses(also access to add/update/delete expenses)\n\t/loss--shows all recipes that lose money\n\t/<YYYY-MM-DD>--shows net gain/loss from that date to the past';
});
// defaultRouter.get('/you/:name', (ctx) =>{
//     let name = ctx.params.name;
//     ctx.body = `Hello ${name}`;
// });

defaultRouter.use(
    menuRouter.routes(),
    chefRouter.routes(),
    costRouter.routes()
);

module.exports = api => {
    api.use(
        defaultRouter.routes(), 
        defaultRouter.allowedMethods()
        );
};