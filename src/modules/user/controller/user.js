import { query } from "express";
import usermodel from "../../../../DB/model/User.model.js"





export const updateuser=async(req,res,next)=>{        //update user
   try {
    const {id}=req.params;
   const {age} = req.body;
   const user=await usermodel.updateOne({_id:id},{age:age})
   return user.modifiedCount? res.json({ message: "Done",user }):res.json({ message: "Invalid_ID" })
   } catch (error) {
    return res.json({message: "Catch error",error})
   }
}

export const deleteuser=async(req,res,next)=>{           //delete user
    try {
        const id=req.params.id;
    const user=await usermodel.deleteOne({_id:id})
    return user.deletedCount? res.json({ message: "Done",user }):res.json({ message: "Invalid_ID" })
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }

 export const getallusers=async (req,res,next)=>{               //get all users
    try {
        const users=await usermodel.find().select("-password");
    return res.json({ message: "Done",users })
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
 }


 export const getUsersstartwithx =  async (req, res, next) => {           //get users with name start with x with age less than y
   try {
    const {x,y}=req.params;
    const rgx=new RegExp(`^${x}`)
    const users=await usermodel.find({username:{$regex: rgx},age:{$lt:parseInt(y)}})
    return users? res.json({ message: "Done",users }) : res.json({ message: "Not founded"})
   } catch (error) {
    return res.json({message: "Catch error",error})
   }
}


export const getUserendwithx =  async (req, res, next) => {          //get users with name end with x
    
    try {
        const {x}=req.params;
    const rgx=new RegExp(`${x}$`)
    const users=await usermodel.find({username:{$regex: rgx}})
    return users? res.json({ message: "Done",users }) : res.json({ message: "Not founded"})
    } catch (error) {
        return res.json({message: "Catch error",error})
    }
}

export const getUsercontainsx =  async (req, res, next) => {       //get users with name contains x
    
    try {
        const {x}=req.query;
    const rgx=new RegExp(`${x}`)
    const users=await usermodel.find({username:{$regex: rgx }})
    return users? res.json({ message: "Done",users }) : res.json({ message: "Not founded"})
    } catch (error) {
        return res.json({message: "Catch error",error}) 
    }
}
export const fullmatch =  async (req, res, next) => {            //get users with name fully match the name variable which destructed from body
    
    try {
        const {name}=req.body;
    const users=await usermodel.find({username:name})
    return users? res.json({ message: "Done",users }) : res.json({ message: "Not founded"})
    } catch (error) {
        return res.json({message: "Catch error",error}) 
    }
}