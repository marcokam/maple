import { call, put, takeLatest } from "redux-saga/effects";
import { getUsers } from "../../api";
import { userActions } from "../redux/users";

export const userSagaActions = {
    USERS_FETCH_REQUESTED: "USERS_FETCH_REQUESTED",
};


function* fetchUsers(action) {
    console.log('action', action);
    try {
        yield put({ type: userActions.USERS_FETCH_STARTED }); 
        const payload = yield call(getUsers, { page: action.page });
        yield put({ type: userActions.USERS_FETCH_SUCCEEDED, payload, })
    } catch (e) {
        yield put({ type: userActions.USERS_FETCH_FAILED, message: e.message });
    }
}

export function* watchUsersRequests() {
    yield takeLatest(userSagaActions.USERS_FETCH_REQUESTED, fetchUsers);
}