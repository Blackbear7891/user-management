import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import {
  emailDTOSchema,
  idDTOSchema,
  nameDOTSchema,
  passwordDTOSchema,
  surnameDTOSchema,
} from "../lib/dto.types.js";

const ajv = new Ajv({ allErrors: true });

const registerDTOSchema = Type.Object(
  {
    _id: idDTOSchema,
    name: nameDOTSchema,
    surname: surnameDTOSchema,
    email: emailDTOSchema,
    password: passwordDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es valido",
    },
  },
);

ajv.addFormat("password", /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*$/);
addFormats(ajv, ["email", "uuid"]);
addErrors(ajv);

const validateSchema = ajv.compile(registerDTOSchema);

// Middleware para validar los datos de usuario
const userRegisterDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });
  next();
};

export default userRegisterDTO;
