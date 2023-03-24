import { Schema, model } from "mongoose";

// Se define el esquema que tendra el documento
const userSchema = new Schema({
  name: { type: String, require: true },
  surname: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
});

// Se genera la instancia del documento usando el metodo model de mongoose
const userModel = model("Users", userSchema);

export default userModel;
