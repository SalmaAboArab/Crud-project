import productModel from "../../../../DB/model/Product.model.js";
import usermodel from "../../../../DB/model/User.model.js";


// export const getAllProducts = async  (req, res, next) => {       //get all products with their owner's information  (with populate)

//     try {
//         const products=await productModel.find().select("-createdAt -updatedAt").populate(
//             {
//                 path:'userId',
//                 select:'-password -createdAt -updatedAt'
//             }
//             )
//         return res.json({ message: "Done" ,products})
//     } catch (error) {
//         return res.json({message:"Catch Error ",error})
//     }
// }

export const getAllProducts = async  (req, res, next) => {       //get all products with their owner's information  (with lookup)

    try {

        const products = await productModel.aggregate([
            {
              $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "user_details",
              },
            }
          ])         
       
        // const products = await productModel.aggregate().lookup({
        //         from: "users",
        //         localField: "userId",
        //         foreignField: "_id",
        //         as: "user_details",
        //       })
        
        return res.json({ message: "Done" ,products})
    } catch (error) {
        return res.json({message:"Catch Error ",error})
    }
}


export const getproductById = async  (req, res, next) => {           //get product by id

   try {
    const {id}=req.params;
    const product=await productModel.findById({_id:id}).select("-createdAt -updatedAt")
    return res.json({ message: "Done" ,product})
   } catch (error) {
    return res.json({message:"Catch Error ",error})
   }
}


export const addProduct=async (req,res,next)=>{             //add product
   try {
    const {productname,productdescription,price,userId}=req.body;
    console.log({productname,productdescription,price,userId});
    const user =await usermodel.findById(userId);
    if(!user){
        return res.json({message:"In-valid user id"})
    }
    const product=await productModel.create({productname,productdescription,price,userId})
    return res.json({message:"Done",product})
   } catch (error) {
    return res.json({message:"Catch Error ",error})
   }
}

export const updateProduct = async(req,res,next)=>{      //update product (product owner only )
    try {
        const {productid,userid}=req.params;
       const {price} = req.body;
       const product=await productModel.updateOne({_id:productid , userId:userid},{price:price})
       return product.modifiedCount? res.json({ message: "Done",product }):res.json({ message: "Invalid_ID" })
       } catch (error) {
        return res.json({message: "Catch error",error})
       }
}

export const deleteproduct=async(req,res,next)=>{        //delete product ( product owner only)
    try {
        const {productid,userid}=req.params;
        const product=await productModel.deleteOne({_id:productid , userId:userid});
        return product.deletedCount? res.json({ message: "Done",product }):res.json({ message: "Invalid_ID" })
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }