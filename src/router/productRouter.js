import fs from "fs";
import qs from "qs";
import {ProductService} from "../service/productService.js";

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
                console.log(data)
                if (data.idDelete !== undefined) {
                    const idToDelete = qs.parse(data).idDelete;
                    productService.delete(idToDelete);
                    const allProducts = productService.showListProduct();
                    console.log(1)
                    console.log(allProducts)
                    showList(req, res, allProducts);
                } else {
                    productService.add(data);
                    const allProducts = productService.showListProduct();
                    showList(req, res, allProducts)
                }
            }
            // if (req.method === "GET")
            const all = productService.showListProduct();
            showList(req, res, all)
        })

        req.on('end', () => {
        });

    }, '/add-product': (req, res) => {
        fs.readFile('view/product/add.html', "utf-8", (err, stringHTML) => {
            res.write(stringHTML);
            res.end()
        })
    },
    '/edit-product': (req, res) => {
        fs.readFile('view/product/editProduct.html', "utf-8", (err, stringHTML) => {
            res.write(stringHTML);
            res.end()
        })
    },
    '/delete-product': (req, res) => {

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
      <td><form method='GET' action='/edit-product'><input type='hidden' name='idDelete' value='${item.id}'><button type='submit'>Edit</button></form></td>
    </tr>`;
        }

        str += '</table>';
        stringHTML = stringHTML.replace('{listProducts}', str)
        res.write(stringHTML);
        res.end()
    })
}

export default productRouter;