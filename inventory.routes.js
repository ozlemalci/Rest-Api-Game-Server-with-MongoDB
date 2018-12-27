module.exports = (app) => {
    const inventories = require('../controllers/inventory.controller.js');
    app.get('/inventories', inventories.findAll);
    app.post('/inventories', inventories.create);
    app.get('/inventories/:inventoryId', inventories.findOne);
    app.delete('/inventories/deleteAll', inventories.deleteAll);
    app.delete('/inventories/:inventoryId', inventories.delete);
}
