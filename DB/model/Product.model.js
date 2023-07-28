import mongoose, { Schema,model,Types } from "mongoose";

const productSchema=new Schema({
    productname:{
        type:String,
        required:true
    },
    productdescription:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true
    },
    userId:{
        type:Types.ObjectId,
        ref:"User",            // اللي هيشاور عليه
        required: true
    }
},{
    timestamps:true
})


const productModel=model('Product',productSchema);
export default productModel;