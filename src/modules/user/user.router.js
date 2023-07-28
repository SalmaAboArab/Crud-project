import {Router} from 'express'
import * as userController from  './controller/user.js'
const router = Router();


// router.get("/" , userController.getUserModule)
router.patch("/:id" , userController.updateuser)  //patch  or put
router.delete("/:id" , userController.deleteuser)
router.get("/getallusers",userController.getallusers)
router.get("/:x/:y",userController.getUsersstartwithx)
router.get("/:x",userController.getUserendwithx)
router.get("/",userController.getUsercontainsx)
router.post("/fullmatch",userController.fullmatch)



export default  router