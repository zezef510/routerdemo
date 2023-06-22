import fs from "fs";
import qs from "qs";
import {ProductService} from "../service/productService.js";
import {Product} from "../model/product.js";
import url from "url";
import productController from "../controller/productController.js";



let productRouter = {
    '/product': productController.showAll,
    '/add-product': productController.showFormAdd, // NOteChuawa lay duoc ID , ID dang la null
    '/edit-product': productController.showFormEdit,
    // '/delete-product': productController.showAll.delete,

    '/': (req, res) => {
        fs.readFile('view/index.html', "utf-8", (err, stringHTML) => {
            res.write(stringHTML);
            res.end()
        })
    },


}



export default productRouter;