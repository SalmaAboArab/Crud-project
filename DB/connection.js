import mongoose from "mongoose";
const connectDB=async ()=>{
    return await mongoose.connect(`mongodb://127.0.0.1:27017/testmongo`).then(result=>{
        console.log('DB connected ........... ');
        // console.log(result);
    }).catch(err=>{
        console.log(`Fail to connect DB ........ ${err}`);
    })
}

export default connectDB;