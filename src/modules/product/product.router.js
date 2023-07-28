import {Router} from 'express'
import * as productController from  './controller/product.js'
const router = Router();


router.get("/" , productController.getAllProducts)
router.post("/" , productController.addProduct)
router.get("/:id" , productController.getproductById)
router.patch("/:productid/:userid" , productController.updateProduct)
router.delete("/delete/:productid/:userid" , productController.deleteproduct)


export default  router