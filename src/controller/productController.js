import fs from "fs";
import qs from "qs";
import {ProductService} from "../service/productService.js";
import productService from "../service/productService.js";
import url from "url";
class ProductController {


    showAll(req,res){
        let data = "";
        req.on(`data`, dataRaw =>{
            data += dataRaw
        })
        req.on("end", ()=>{
            if(req.method === "GET"){
                showList(req,res)
            }else {
                const idToDelete = qs.parse(data).idDelete;


                if (idToDelete !== undefined) {
                    productService.delete(idToDelete);
                    const allProducts = productService.showListProduct();
                    console.log(allProducts)
                    showList(req, res, allProducts);
                }

                else {
                    data = qs.parse(data);
                    console.log(data)
                    productService.save(data)
                    showList(req, res)
                }

            }
            showList(req, res)// note
        })
    }
    showFormEdit(req ,res){
            let urlObject = url.parse(req.url, true)
            const product = productService.getProductById(urlObject.query.idEdit);
            fs.readFile('view/product/editProduct.html', "utf-8", (err, stringHTML) => {
                    // Thay đổi stringHTML để hiển thị thông tin sản phẩm cần chỉnh sửa
                    stringHTML = stringHTML.replace('{productId}', product.id)
                        .replace('{productName}', product.nameProduct)
                        .replace('{productPrice}', product.price)
                        .replace('{productQuantity}', product.quantity);
                    res.write(stringHTML);
                    res.end()
                })


        }


    showFormAdd(req,res){
        fs.readFile('view/product/add.html', "utf-8", (err, stringHTML) => {
            res.write(stringHTML);
            res.end()
        })
    }

}
function showList(req, res) {
    fs.readFile(`view/product/listProduct.html`, "utf8", (err, stringHTML) => {
        let str = '<table style="width: 1200px ; font-size: 20px ; text-align: center">';
        str += `<tr style="font-size: 30px ; font-weight: bold">
         <td>ID</td>
        <td>Name</td>
        <td>Price</td>
        <td>Quantity</td>
</tr>`

        for (const item of productService.showListProduct()) {
            const rowColor = productService.showListProduct().indexOf(item) % 2 === 0 ? 'lightgray' : 'white';

            str += `
    <tr style="background-color: ${rowColor}">
      <td>${item.id}</td>
      <td>${item.nameProduct}</td>
      <td>${item.price}</td>
      <td>${item.quantity}</td>
      <td><form method='POST' action='/product'><input type='hidden' name='idDelete' value='${item.id}'><button type='submit'>Delete</button></form></td>
      <td><form method='POST' action='/edit-product?idEdit=${item.id}'><input type='hidden' name='idEdit' value='${item.id}'><button type='submit'>Edit</button></form></td>
    </tr>`;
        }


        str += '</table>';
        stringHTML = stringHTML.replace('{listProducts}', str)
        res.write(stringHTML);
        res.end()
    })
}
export default new ProductController()