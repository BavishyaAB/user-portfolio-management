import mongoose from "mongoose"
const counterSchema = new mongoose.Schema({
    _id:{
        type:String,
        required:true,
        default:'userid'
    },
    seq:{
        type:Number,
        default:0
    }
});
const userSchema = new mongoose.Schema({
    _id:{
        type:Number
    },
    first_name:{
        type:String,
        required:[true,"Enter First Name"],
        trim: true
    },
    last_name:{
        type:String,
        required:[true,"Enter Last Name"],
        trim: true
    },
    company_name:{
        type:String,
        required:[true,"Enter Company Name"],
        trim: true
    },
    city:{
        type:String,
        required:true
    },
    state:{
        type:String,
        required:true
    },
    zip:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    web:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true
    }
});
export const Counter = mongoose.model('Counter',counterSchema);
export const User = mongoose.model('User',userSchema);

