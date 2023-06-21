export class Product {

    constructor(id, nameProduct, price, quantity) {
        this._id = id;
        this._nameProduct = nameProduct;
        this._price = price;
        this._quantity = quantity;
    }

    get id() {
        return this._id;
    }

    set id(value) {
        this._id = value;
    }

    get nameProduct() {
        return this._nameProduct;
    }

    set nameProduct(value) {
        this._nameProduct = value;
    }

    get price() {
        return this._price;
    }

    set price(value) {
        this._price = value;
    }

    get quantity() {
        return this._quantity;
    }

    set quantity(value) {
        this._quantity = value;
    }
}