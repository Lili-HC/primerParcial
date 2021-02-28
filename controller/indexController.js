const UserModel = require ("../models/userModel.js");
const Sha1 = require ("sha1");
const JsonWebTokenManagement = require ("../middleware/JsonWebTokenManagement.js");
var USER = new UserModel();
var jsonwebtoken = new JsonWebTokenManagement();
class IndexController {
  constructor() {}
  //services
  index(request, response) {
    response.status(200).json({ msn: "Api Test v. 2.0" });
  }
  async login(request, response) {
    const body = request.body;
    //Validacion.
    let filter = { email: body.email, password: Sha1(body.password) };
    let list = await USER.getUsers(filter);
    console.log(list);
    if (list.length == 1) {
      let jsonwebdata = { email: list[0].email, id: list[0].id };
      console.log(jsonwebdata);
      let token = jsonwebtoken.sign(jsonwebdata);
      response.status(200).json({ token });
      return;
    }
    response
      .status(200)
      .json({ serverResponse: "El password o correo son incorrectos" });
  }
}
module.exports = IndexController;
