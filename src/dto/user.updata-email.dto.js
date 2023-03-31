import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import addErrors from "ajv-errors";
import { emailDTOSchema, passwordDTOSchema } from "../lib/dto.types.js";

const ajv = new Ajv({ allErrors: true });

const UpdateEmailDTOSchema = Type.Object(
  {
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
addFormats(ajv, ["email"]);
addErrors(ajv);

const validateSchema = ajv.compile(UpdateEmailDTOSchema);

// Middleware para validar los datos de usuario
const userUpdateEmailDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });
  next();
};

export default userUpdateEmailDTO;
