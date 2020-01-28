import { all } from "redux-saga/effects";
import { watchUsersRequests, watchUserByIdRequests } from "./users";

export function* rootSaga() {
    yield all([
        watchUsersRequests(),
        watchUserByIdRequests(),
    ]);
}
