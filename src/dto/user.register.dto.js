import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";

const ajv = new Ajv({ allErrors: true });

const registerDTOSchema = Type.Object({
  _id: Type.String({
    format: "uuid",
    errorMessage: {
      type: "El tipo de _id no es valido debe ser un string",
      format: "El formato de _id no es valido, debe ser un uuid4",
    },
  }),
  name: Type.String({
    minLength: 2,
    maxLength: 20,
    errorMessage: {
      minLength: "name de tener al menos 2 caracteres de longitud",
      maxLength: "name debe tener como maximo 20 caracteres de longitud",
    },
  }),
  surname: Type.String({
    minLength: 4,
    maxLength: 50,
    errorMessage: {
      minlength: "surname debe tener como minimo 4 caracteres de longitud",
      maxLnegth: "surname debe tener como maximo 50 caracteres de longitud",
    },
  }),
  email: Type.String({
    format: "email",
    errorMessage: {
      type: "El tipo de email no es valido, debe ser un string",
      format: "El formato de email no es valido, debe de cumplir RFC 5322",
    },
  }),
  password: Type.String({
    format: "password",
    minLength: 10,
    maxLength: 25,
    errorMessage: {
      type: "El tipo de el password no es valido debe ser un string",
      format:
        "El fromato de el password no es valido debe contener amlenos una Mayuscula una minuscula y un numero",
      minLength: "el password debe contener almenos 10 caracteres de longitud",
      maxLength:
        "el password debe conterer como maximo 25 caracteres de longitud",
    },
  }),
});

ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ["email", "uuid"]);
addErrors(ajv);

const validateSchema = ajv.compile(registerDTOSchema);

// Middleware para validar los datos de usuario
const userRegisterDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res
      .status(400)
      .send(ajv.errorsText(validateSchema.errors, { separator: "\n" }));
  next();
};

export default userRegisterDTO;
