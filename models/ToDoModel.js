import mongoose from "../connection/connect.js";
class ToDoModel {
	constructor() {
		this.Schema = mongoose.Schema;
		this.ToDoSchema = new this.Schema({
			name: String,
			description: String,
      		date: Date,
      		hour: String, 
			done: Boolean,
    });
    this.mymodel = mongoose.model("ToDo", this.ToDoSchema);
	}
	/* 
    ------3.1 Agregar tareas------
  */
	createToDo(name, description, date, hour, done) {
		var todo = {
			name,
			description,
      		date,
     		hour,
			done
		};
		var newtodo = new this.mymodel(todo);
		// aqui viene la validacion
		var error = newtodo.validateSync();
		return new Promise((resolve, reject) => {
			if (error) {
				resolve(error);
				return;
			}
			newtodo.save().then((docs) => {
				console.log('Registrado');
				resolve(docs);
			});
		});
	}
	/* 
    ------3.2 Borrar tareas------
  */
  deleteToDo(id) {
    return new Promise((resolve, reject) => {
      this.mymodel.remove({ _id: id }).then((err, docs) => {
        if (err) {
          console.log(err);
          resolve(err);
          return;
        }
        resolve(docs);
      });
    });
  }
  /*
    ------3.3 Actualizar tareas------
  */
	updateToDo(id, todo) {
		return new Promise((resolve, reject) => {
			this.mymodel.update({ _id: id }, { $set: todo }, (err, docs) => {
				if (err) {
					console.log(err);
					resolve(err);
					return;
				}
				resolve(docs);
			});
		});
  }
  /*
    ------3.4 Mostrar tareas------
  */
	getToDo() {
		return new Promise((resolve, reject) => {
			this.mymodel.find({}, (err, docs) => {
				if (err) {
					console.log(err);
					resolve(err);
					return;
				}
				resolve(docs);
			});
		});
  }

	updateDoneToDo(id){
    return new Promise((resolve, reject) => {
        this.mymodel.update({_id: id}, {done: true}, (err, docs) => {
            if(err){
                resolve(err);
                return;
            }
            resolve(docs);
        });
    });
  }
}
export default ToDoModel;
