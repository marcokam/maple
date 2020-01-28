import { call, put, takeLatest } from "redux-saga/effects";
import { getUsers, getUserById } from "../../api";
import { userActions } from "../redux/users";

export const userSagaActions = {
    USERS_FETCH_REQUESTED: "USERS_FETCH_REQUESTED",
    USERBYID_FETCH_REQUESTED: "USERBYID_FETCH_REQUESTED",
};


function* fetchUsers(action) {
    try {
        yield put({ type: userActions.USERS_FETCH_STARTED }); 
        const payload = yield call(getUsers, { page: action.page });
        yield put({ type: userActions.USERS_FETCH_SUCCEEDED, payload });
    } catch (e) {
        yield put({ type: userActions.USERS_FETCH_FAILED, message: e.message });
    }
}
function* fetchUserById(action) {
    try {
        yield put({ type: userActions.USERSBYID_FETCH_STARTED }); 
        const payload = yield call(getUserById, action.id);
        yield put({ type: userActions.USERSBYID_FETCH_SUCCEEDED, payload });
    } catch (e) {
        yield put({ type: userActions.USERSBYID_FETCH_FAILED, message: e.message });
    }
}

export function* watchUsersRequests() {
    yield takeLatest(userSagaActions.USERS_FETCH_REQUESTED, fetchUsers);
}
export function* watchUserByIdRequests() {
    yield takeLatest(userSagaActions.USERBYID_FETCH_REQUESTED, fetchUserById);
}