import { fork, all } from "redux-saga/effects";
import mainSaga from "../../services/mainService";

export default function* sagas() {
  yield all([mainSaga].map(saga => fork(saga)));
}
