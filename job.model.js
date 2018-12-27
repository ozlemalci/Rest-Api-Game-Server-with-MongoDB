const mongoose=require('mongoose');

const JobSchema = mongoose.Schema({
    id:{type:Number, unique:true},
    title:{type:String,unique:false},
    information:{type:String,unique:false},
   
});

module.exports =mongoose.model('Job', JobSchema);