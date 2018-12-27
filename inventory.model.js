const mongoose=require('mongoose');

const InventorySchema=mongoose.Schema({
    inventory_id:{type:Number, unique:true,required: true},
    title:{type:String,unique:false,required: true},
    img_url:{type:String,unique:false,required: true},
    price:{type:String,unique:false,required: true},
    is_consume:{type:Boolean,unique:false,required: true},
    is_sold:{type:Boolean,unique:false,required: true}    
});

module.exports =mongoose.model('Inventory', InventorySchema);
