import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import { passwordDTOSchema } from "../lib/dto.types.js";

const ajv = new Ajv({ allErrors: true });

const UnregisterDTOSchema = Type.Object(
  {
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
addErrors(ajv);

const validateSchema = ajv.compile(UnregisterDTOSchema);

// Middleware para validar los datos de usuario
const userUnregisterDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });
  next();
};

export default userUnregisterDTO;