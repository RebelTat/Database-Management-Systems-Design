const menuController = new require('../controller/menuController');
const menuRouter = require('koa-router')({
    prefix: '/menu'
});

menuRouter.get('/', menuController.all); //all menus
menuRouter.get('/:activeStatus', menuController.byActiveStatus); //only active/deactive menus
menuRouter.put('/:id', menuController.update); //update a recipe in a menu or de/activate the menu
menuRouter.post('/', menuController.add); //add an aspect of menu
menuRouter.delete('/:id', menuController.delete); //delete an aspect of a menu

module.exports = menuRouter;