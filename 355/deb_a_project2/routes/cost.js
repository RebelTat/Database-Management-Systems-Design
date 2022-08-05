const costController = new require('../controller/costController');
const costRouter = require('koa-router')({
    prefix: '/cost'
});

costRouter.get('/', costController.all); //combo of sales and expenses
costRouter.get('/sales', costController.sales); //only sales
costRouter.get('/expenses', costController.expenses); //only expenses
costRouter.get('/costlyRecipes', costController.costlyRecipes); //Recipes that lose money
costRouter.get('/:curDate', costController.netCost);//FUNCTION

costRouter.put('/sales/:id', costController.updateSale); //change a sale made incase it was wrong
costRouter.post('/sales', costController.addSale); //add a sale 
costRouter.delete('/sales/:id', costController.deleteSale); //delete a sale

costRouter.put('/expenses/:id', costController.updateExpense);//change a sale made incase it was wrong
costRouter.post('/expenses', costController.addExpense); //add expense
costRouter.delete('/expenses/:id', costController.deleteExpense); //delete expense



module.exports = costRouter;