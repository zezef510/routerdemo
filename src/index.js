import http from 'http';
import fs from 'fs';
import qs from 'qs';
import url from 'url';
import router from "./router/router.js";
import {ProductService} from "./service/productService.js";

const server = http.createServer((req, res) => {

    let handle = router[req.url];
    if (handle === undefined) {
        handle = router['/err']
    }
    handle(req, res);


})


server.listen("8080", () => {
    console.log("Da ket noi")
})