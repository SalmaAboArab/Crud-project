import usermodel from "../../../../DB/model/User.model.js";



export const getAuthModule =   (req, res, next) => {

    return res.json({ message: "Auth module" })
}

export const signup=async (req,res,next)=>{                 //sign up
   try{
    const {username,email,password,cpassword,age}=req.body;
    // console.log({username,email,password});
    if(password!=cpassword){
        return res.json({message:"Password mismatch cpassword"});
    }
    const user=await usermodel.create({username,email,password,age})  //to save
    return res.json({message:"Done",user});


    // const {users}=req.body
    // const user =await usermodel.insertMany(users);   //to save array of users
    // return res.json({message:"Done",user})

    
    // const newUser=new usermodel({username,email,password});    //to save
    // const user = await newUser.save()
   }catch(error){
    if(error.code == 11000){
        return res.json({message: "Email Exists"})
    }
    return res.json({message: "Catch error",error,stack:error.stack})
   }
}

export const login=async (req,res,next)=>{                         //sign in
    try {
        const {email,password}=req.body;
    // console.log({email,password});
    const user=await usermodel.findOne({email,password}).select("username")
    return user? res.json({message:"Done",user}) : res.json({message:"In valid email or password"})
    } catch (error) {
        return res.json({message: "Catch error",error,stack:error.stack})
    }
}