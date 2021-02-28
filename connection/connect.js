const mongoose= require ("mongoose");
const dotenv = require("dotenv");
dotenv.config();
mongoose.connect("mongodb://localhost/examen",{
  useNewUrlParser: true,
  useUnifiedTopology: true
}
);
var db = mongoose.connection;
db.on("error", () => {
  console.log("No se puede conectar con la base de datos");
});
db.on("open", () => {
  console.log("Conexion exitosa");
});
module.exports = mongoose;
