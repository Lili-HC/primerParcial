const ToDoModel = require("../models/ToDo");



var TODO = new ToDoModel();
class ToDoController {
  constructor() {}
  //services
  async createTodo(request, response) {
    var data = request.body;
    var result = await TODO.createTodo(
      data.name,
      data.description,
      new Date(),
      data.done,
      
    );
    response.status(200).json(result);
  }

  async getTodo(request, response) {
    var result = await TODO.getTodo();
    response.status(200).json(result);
  }
  async updateTodo(request, response) {
    var id = request.params.id;
    var updatedata = request.body;
    var result = await TODO.updateModel(id, updatedata);
    response.status(200).json(result);
  }
  async deleteTodo(request, response) {
    var id = request.params.id;
    var result = await TODO.deleteTodo(id);
    response.status(200).json(result);
  }
}
module.exports = ToDoController;
