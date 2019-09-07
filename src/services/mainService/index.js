import { put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import { SET_TREE } from "./actionTypes";
import { generateJsonSchemaCode } from "./helpers/jsonSchema";
import { generateJsonUISchemaCode } from "./helpers/jsonUISchema";
import { setUISchemaCode, setSchemaCode, setError } from "./actions";
import { validateSchema } from "./helpers/helper";

const prettify = (code, parser) => {
  return axios.post("https://jsonschema-visual-editor.herokuapp.com/api/prettify", code, parser);
};

export function* watchSetJsonForm() {
  const { tree } = (yield select()).mainReducer;
  const parser = "json";
  const jsonFormSchemaCode = generateJsonSchemaCode({ tree });
  const jsonFormUISchemaCode = generateJsonUISchemaCode({ tree });
  let prettyJsonFormSchemaCode = "";

  try {
    prettyJsonFormSchemaCode = jsonFormSchemaCode
      ? yield prettify({
          code: jsonFormSchemaCode,
          parser
        })
      : "";
    const schema = prettyJsonFormSchemaCode.data || {};
    yield put(setSchemaCode(schema));
    validateSchema(schema);
    yield put(setError(""));
  } catch (e) {
    yield put(setError(e));
  }

  const prettyJsonFormUISchemaCode = jsonFormUISchemaCode
    ? yield prettify({
        code: jsonFormUISchemaCode,
        parser
      })
    : "";

  yield put(setUISchemaCode(prettyJsonFormUISchemaCode.data));
}

export default function* rootSaga() {
  yield takeLatest(SET_TREE, watchSetJsonForm);
}
