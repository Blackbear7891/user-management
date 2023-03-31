import { Type } from "@sinclair/typebox";
import Ajv from "ajv";
import addErrors from "ajv-errors";
import { nameDOTSchema, surnameDTOSchema } from "../lib/dto.types.js";

const ajv = new Ajv({ allErrors: true });

const UpdateDataDTOSchema = Type.Object(
  {
    name: nameDOTSchema,
    surname: surnameDTOSchema,
  },
  {
    additionalProperties: false,
    errorMessage: {
      additionalProperties: "El formato del objeto no es valido",
    },
  },
);

addErrors(ajv);

const validateSchema = ajv.compile(UpdateDataDTOSchema);

// Middleware para validar los datos de usuario
const userUpdateDataDTO = (req, res, next) => {
  const isDTOValid = validateSchema(req.body);
  if (!isDTOValid)
    return res.status(400).send({
      errors: validateSchema.errors.map((error) => error.message),
    });
  next();
};

export default userUpdateDataDTO;
