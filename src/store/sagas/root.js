import { all } from "redux-saga/effects";
import { watchUsersRequests } from "./users";

export function* rootSaga() {
    yield all([
        watchUsersRequests(),
    ]);
}
