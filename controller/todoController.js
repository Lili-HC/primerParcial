import ToDoModel from "../models/ToDoModel.js";
var ToDo = new ToDoModel();
class ToDoController {
    constructor(){}
    async createToDo(request, response){
        var data = request.body;
        var result = await ToDo.createToDo(
            data.name,
            data.description,
            new Date(),
            data.hour,
            false);
        response.status(200).json({result});
    }
    async deleteToDo(request, response) {
        var id = request.params.id;
        var result = await ToDo.deleteToDo(id);
        response.status(200).json(result);
    }
    async updateToDo(request, response) {  
        var id = request.params.id;
        var updatedata = request.body;
        var result = await ToDo.updateToDo(id, updatedata);
        response.status(200).json(result);
    }
    async getToDo(request, response) {
        var result = await ToDo.getToDo();
        response.status(200).json(result);
    }
    async updateDoneToDo(request, response) {
        var id = request.params.id;
        var result = await ToDo.updateDoneToDo(id);
        response.status(200).json(result);
    }  
}
export default ToDoController;