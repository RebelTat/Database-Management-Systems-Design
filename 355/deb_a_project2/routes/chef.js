const chefController = new require('../controller/chefController');
const chefRouter = require('koa-router')({
    prefix: '/chef'
});

chefRouter.get('/', chefController.all); //gets all chefs
chefRouter.get('/unassigned', chefController.noRecipe); //VIEW to see chefs that are not cooking a reciepe. 
chefRouter.put('/:id', chefController.update); //update a chef to a new role/id/other
chefRouter.post('/', chefController.add); //add new chef hired
chefRouter.delete('/:id', chefController.delete); //delete chef fired/quit

module.exports = chefRouter;