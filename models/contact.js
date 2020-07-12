const mongoose=require('mongoose');

const ContactSchema=mongoose.Schema({
    first_name:{
        type:String,
        required:true
    },
    last_name:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
});

//Contact is the collection that will be formed in mongoDb database
const Contact=module.exports=mongoose.model('Contact',ContactSchema);