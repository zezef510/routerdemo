import fs from 'fs';
import productRouter from "./productRouter.js";
import userRouter from "./userRouter.js";
import homeController from "../controller/homeController.js";
let router = {
    '/' : homeController.showAllHome,
    '/err' : homeController.showErr,
    '/users' : (req,res)=>{
        fs.readFile('view/user/list.html', "utf-8",(err, stringHTML)=>{
            res.write(stringHTML);
            res.end()
        })
    },
    '/product' : (req,res)=>{
        fs.readFile('view/product/listProduct.html', "utf-8",(err, stringHTML)=>{
            res.write(stringHTML);
            res.end()
        })
    },
}
router = {...router, ...productRouter}
router = {...router, ...userRouter}
export default router