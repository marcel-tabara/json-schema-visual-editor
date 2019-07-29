import Ajv from "ajv";
import isEmpty from "lodash/isEmpty";

export const validateSchema = schema => {
  if (!isEmpty(schema)) {
    const ajv = new Ajv();
    const test = ajv.compile(JSON.parse(schema));
    const isValid = test();

    if (isValid) {
      return { valid: true };
    } else {
      return { valid: false, error: test.errors };
    }
  }
};
