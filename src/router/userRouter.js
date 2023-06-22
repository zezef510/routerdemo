import fs from "fs";
import userController from "../controller/userController.js";
let userRouter = {
    '/users' : userController.showAll,
    '/add-user' : userController.showFormAdd,
    '/' : (req,res)=>{
        fs.readFile('view/index.html', "utf-8",(err, stringHTML)=>{
            res.write(stringHTML);
            res.end()
        })
    },
}
export default userRouter