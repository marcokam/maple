import { apiStates } from "../../api";

export const userActions = {
    USERS_FETCH_STARTED: "USERS_FETCH_STARTED",
    USERS_FETCH_SUCCEEDED: "USERS_FETCH_SUCCEEDED",
    USERS_FETCH_FAILED: "USERS_FETCH_FAILED",
};

const initialState = {
    apiState: apiStates.none,
};

export function users(state = initialState, action) {
    switch(action.type) {
        case userActions.USERS_FETCH_STARTED:
            return {
                ...state,
                apiState: apiStates.fetching,
            };
        case userActions.USERS_FETCH_SUCCEEDED:
            return {
                ...state,
                apiState: apiStates.fetched,
                payload: action.payload,
            };
        case userActions.USERS_FETCH_FAILED:
            return {
                ...state,
                apiState: apiStates.error,
            };
        default:
            return state;
    }
}
  