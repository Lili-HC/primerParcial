const mongoose = require('../connection/connect.js');
const modelenum = require('../utils/enumModel.js');
const RolesModel = require('./rolesModel.js');
class UserModel {
	constructor() {
		var roles = new RolesModel();
		this.Schema = mongoose.Schema;
		this.ToDoSchema = new this.Schema({
			name: String,
			description: String,
			date: { type: Date, defautl: Date.now() },
			done: Boolean,
		});
	}
	/* 
  C. create
  */
	createToDo(name, description, date, done) {
		var todo = {
			name,
			description,
			date,
			done,
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
				console.log('Todo registrado');
				resolve(docs);
			});
		});
	}
	/* 
  R. read
  */
	getUsers(filterdata) {
		var filter = {};
		if (filterdata != null) {
			filter = filterdata;
		}
		return new Promise((resolve, reject) => {
			this.mymodel.find(filter, (err, docs) => {
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
  U. update
   */
	updateModel(id, userUpdate) {
		return new Promise((resolve, reject) => {
			this.mymodel.update({ _id: id }, { $set: userUpdate }, (err, docs) => {
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
  D. delete
   */
	deleteUser(id) {
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
	getModel() {
		return this.mymodel;
	}
	getSchema() {
		return this.UserSchema;
	}
	async checkEmaildb(email) {
		var result = await this.mymodel.find({ email: email });

		if (result.length > 0) {
			return true;
		}
		return false;
	}
	async addRol(id, rol) {
		var result = await this.mymodel.update({ _id: id }, { $push: { roles: rol } });
		return result;
	}
	async updateAvatar(id, obj) {
		var result = await this.mymodel.update({ _id: id }, { $push: { fotosPerfil: obj } });
		return result;
	}
	async findAvatar(name) {
		var avatarImages = await this.mymodel.find({ 'fotosPerfil.name': name });
		if (avatarImages != null && avatarImages.length > 0) {
			var avatarimage = avatarImages[0];
			var resuldata = avatarimage.fotosPerfil.filter((item) => {
				if (item.name == name) {
					return true;
				}
				return false;
			});
			return resuldata;
		}
		return [];
	}
}
module.exports = UserModel;
