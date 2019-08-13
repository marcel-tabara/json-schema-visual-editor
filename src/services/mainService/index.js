import { put, takeLatest, select } from "redux-saga/effects";
import axios from "axios";
import { SET_TREE } from "./actionTypes";
import { generateJsonSchemaCode } from "./helpers/jsonSchema";
import { generateJsonUISchemaCode } from "./helpers/jsonUISchema";
import { setUISchemaCode, setSchemaCode, setError } from "./actions";
import { validateSchema } from "./helpers/helper";

export function* watchSetTree(action) {
  console.log("console: saga", action);
}

const prettify = (code, parser) => {
  return axios.post("http://localhost:5000/api/prettify", code, parser);
};

export function* watchSetJsonForm() {
  const { tree } = (yield select()).mainReducer;
  const parser = "json";
  const jsonFormSchemaCode = generateJsonSchemaCode({ tree });
  console.log("console: jsonFormSchemaCode", jsonFormSchemaCode);
  const jsonFormUISchemaCode = generateJsonUISchemaCode({ tree });
  console.log("console: jsonFormUISchemaCode", jsonFormUISchemaCode);
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
