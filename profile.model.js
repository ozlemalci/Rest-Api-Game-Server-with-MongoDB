const mongoose = require('mongoose');

const ProfileSchema=mongoose.Schema({
    Name:{type:String,unique:true,required: true},
    arenaTitle:{type:String,unique:false,required: true},
    Days_in_Arena:{type:Number,unique:false,required: true},
    Agression:{type:Number,unique:false,required: true},
    Momentum:{type:Number,unique:false,required: true},
    Muscle:{type:Number,unique:false,required: true},  
    Toughness:{type:Number,unique:false,required:true},
    Weapon:{type:Number,unique:false,required:true},
    Armor:{type:Number,unique:false,required:true},
    Shield:{type:Number,unique:false,required:true},
    Total_Damage:{type:Number,unique:false,required:true},
});

module.exports =mongoose.model('Profile', ProfileSchema);