import fs from "fs";


class UserController {
    showFormEdit(){}

    showAll(req,res) {
        fs.readFile('view/user/list.html', "utf-8", (err, stringHTML) => {
            res.write(stringHTML);
            res.end()
        })
    }
    showFormAdd(req,res){
        fs.readFile('view/user/adduser.html', "utf-8", (err, stringHTML) => {
            res.write(stringHTML);
            res.end()
        })
    }
}
export default new UserController()