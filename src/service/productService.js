import {Product} from "../model/product.js";

export class ProductService{
    constructor() {
    this.listProduct = [];
    this.listProduct.push(new Product(1,"Quan ao", 200 ,200))
    this.listProduct.push(new Product(2,"Tu lanh", 1000 ,30))
    this.listProduct.push(new Product(3,"Dieu Hoa", 1200 ,40))
    this.listProduct.push(new Product(4,"Quat ", 400 ,50))
    }
    showListProduct(){
        return this.listProduct
    }
    add(product){
        this.listProduct.push(product)
    }
    delete(id){
        const newList = this.listProduct.filter((item) => item.id != id);
        if (newList.length < this.listProduct.length) {
            this.listProduct = newList;
        }
    }

    edit(product) {
        for (let i = 0; i < this.listProduct.length; i++) {
            if (this.listProduct[i].id == product.id) {
                this.listProduct[i] = product;
            }
        }
    }
    getProductById(idEdit) {
        for (const product  of this.listProduct){
            if (product.id == idEdit ){
                return product
            }
        }

    }
    save(products){
        let checkExist = false
        for (let i = 0; i < this.listProduct.length; i++) {
            if (this.listProduct[i].id == products.id) {
                this.listProduct[i] = products;

            }
        }
        if(!checkExist){
            this.listProduct.push(products)
        }

    }

}