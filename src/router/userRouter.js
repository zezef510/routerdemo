import fs from "fs";

let userRouter = {
    '/users' : (req,res)=>{
        fs.readFile('view/user/list.html', "utf-8",(err, stringHTML)=>{
            res.write(stringHTML);
            res.end()
        })
    },
    '/add-user' : (req,res)=>{
        fs.readFile('view/user/adduser.html', "utf-8",(err, stringHTML)=>{
            res.write(stringHTML);
            res.end()
        })
    },
    '/' : (req,res)=>{
        fs.readFile('view/index.html', "utf-8",(err, stringHTML)=>{
            res.write(stringHTML);
            res.end()
        })
    },
}
export default userRouter