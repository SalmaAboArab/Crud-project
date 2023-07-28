import authRouter from './modules/auth/auth.router.js';
import userRouter from './modules/user/user.router.js'
import productRouter from './modules/product/product.router.js';
import connectDB from '../DB/connection.js';




const initApp = (app, express) => {

    app.use(express.json({}))

    app.get('/', (req, res) => res.send('Hello World!'))

    app.use('/auth', authRouter)
    app.use('/user', userRouter)
    app.use('/product', productRouter)

    app.use("*" , (req,res)=>{
        return res.json({message:"404 Page Not Found"})
    })
//connect DB
connectDB();
}


export default initApp