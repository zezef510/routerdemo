import fs from "fs";
import qs from "qs";
import {ProductService} from "../service/productService.js";
import {Product} from "../model/product.js";
import url from "url";


let productService = new ProductService()

let productRouter = {
    '/product': (req, res) => {
        let data = "";
        req.on(`data`, dataRaw => {
            data += dataRaw
        })
        req.on(`end`, () => {
            if (req.method === "POST") {
                data = qs.parse(data)
                if (data.idDelete !== undefined) {
                    const idToDelete = qs.parse(data).idDelete;
                    productService.delete(idToDelete);
                    const allProducts = productService.showListProduct();

                    showList(req, res, allProducts);
                }else if(data.id !== undefined) {
                    productService.save(data)


                } else {
                    productService.add(data);
                    const allProducts = productService.showListProduct();
                    showList(req, res, allProducts)
                }

            }

            const all = productService.showListProduct();
            showList(req, res, all)
        })




    }, '/add-product': (req, res) => {
        fs.readFile('view/product/add.html', "utf-8", (err, stringHTML) => {
            res.write(stringHTML);
            res.end()
        })
    }, // NOteChuawa lay duoc ID , ID dang la null
    '/edit-product': (req, res) => {
        let urlObject = url.parse(req.url, true)

        let idEditt = productService.getProductById(urlObject.query.idEdit)
        console.log(idEditt)
        // if (idEditt) { // Kiểm tra giá trị id hợp lệ hay không
        //     res.writeHead(400, {"Content-Type": "text/plain"});
        //     res.end("Invalid ID");
        // } else {
        const product = productService.getProductById(urlObject.query.idEdit);
        // console.log(product)
        if (!product) { // Nếu không tìm thấy sản phẩm có id tương ứng trong listProduct
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.end("Product not found");
        } else {
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
        // }
    }, '/delete-product': (req, res) => {

    },

    '/': (req, res) => {
        fs.readFile('view/index.html', "utf-8", (err, stringHTML) => {
            res.write(stringHTML);
            res.end()
        })
    },


}

function showList(req, res, product) {
    fs.readFile(`view/product/listProduct.html`, "utf8", (err, stringHTML) => {
        let str = '<table style="width: 1200px ; font-size: 20px ; text-align: center">';
        str += `<tr style="font-size: 30px ; font-weight: bold">
         <td>ID</td>
        <td>Name</td>
        <td>Price</td>
        <td>Quantity</td>
</tr>`
        for (let i = 0; i < product.length; i++) {
            const item = product[i]
            const rowColor = i % 2 === 0 ? 'lightgray' : 'white';


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

export default productRouter;