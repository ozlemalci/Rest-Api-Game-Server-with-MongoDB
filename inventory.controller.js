const Inventory = require('../models/inventory.model.js');
const mongoose = require('mongoose');


exports.findAll = (req, res) => {
    Inventory.find()
    .then(inventories => {
        res.send(inventories);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "ERROR"
        });
    });
};


exports.create = (req, res) => {
    const inventory= new Inventory({
        inventory_id:req.body.inventory_id,
        title:req.body.title,
        img_url:req.body.img_url,
        price:req.body.price,
        is_consume:req.body.is_consume,
        is_sold:req.body.is_sold
    });

    inventory.save()
    .then(data => {
        res.status(200).json({
            success: 'New item has been created'
        });
    }).catch(err => {
        res.status(500).json({
            error: err
        });
    });
};

exports.findOne = (req, res) => {
    Inventory.findById(req.params.inventoryId)
    .then(inventory => {
        if(!inventory) {
            return res.status(404).send({
                message: "Not Found" + req.params.inventoryId
            });            
        }
        res.send(inventory);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Item not found with id " + req.params.inventoryId
            });                
        }
        return res.status(500).send({
            message: "Error retrieving item with id " + req.params.inventoryId
        });
    });
};


exports.deleteAll = (req, res) => {
    Inventory.deleteMany({})
    .then(() => {
        res.send({message: "Inventories deleted successfully!"});
    }).catch(err => {
        return res.status(500).send({
            message: "Could not delete inventories"
        });
    });
};


exports.delete = (req, res) => {
    Inventory.findByIdAndRemove(req.params.inventoryId)
    .then(inventory => {
        if(!inventory) {
            return res.status(404).send({
                message: "Inventory not found with id " + req.params.inventoryId
            });
        }
        res.send({message: "Inventory deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Inventory not found with id " + req.params.inventoryId
            });                
        }
        return res.status(500).send({
            message: "Could not delete Inventory with id " + req.params.inventoryId
        });
    });
};



