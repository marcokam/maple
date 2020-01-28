import { apiStates } from "../../api";
import { normalizeById } from "./utils";

export const userActions = {
    USERS_FETCH_STARTED: "USERS_FETCH_STARTED",
    USERS_FETCH_SUCCEEDED: "USERS_FETCH_SUCCEEDED",
    USERS_FETCH_FAILED: "USERS_FETCH_FAILED",
    USERSBYID_FETCH_STARTED: "USERSBYID_FETCH_STARTED",
    USERSBYID_FETCH_SUCCEEDED: "USERSBYID_FETCH_SUCCEEDED",
    USERSBYID_FETCH_FAILED: "USERSBYID_FETCH_FAILED",
};

const initialState = {
    apiState: apiStates.none,
    payload: {},
};

export function users(state = initialState, action) {
    switch(action.type) {
        case userActions.USERS_FETCH_STARTED:
        case userActions.USERSBYID_FETCH_STARTED:
            return {
                ...state,
                apiState: apiStates.fetching,
            };
        case userActions.USERS_FETCH_SUCCEEDED: {
            const { ids = [], byId = {} } = normalizeById(action.payload.data);
            const { ids: prevIds = [], byId: prevById = {} } = state.payload;
            const normalizedPayload = {
                ...action.payload,
                ids: action.payload.page === 1 ? ids : Array.from(new Set(prevIds.concat(ids))),
                byId: {
                    ...prevById,
                    ...byId,
                }
            }
            return {
                ...state,
                apiState: apiStates.fetched,
                payload: normalizedPayload,
            };
        }
        case userActions.USERSBYID_FETCH_SUCCEEDED: {
            const { byId: prevById = {} } = state.payload;
            const user = action.payload.data || {};
            return {
                ...state,
                apiState: apiStates.fetched,
                payload: {
                    ...state.payload,
                    byId: {
                        ...prevById,
                        [user.id]: user,
                    }
                }
            }   
        }
        case userActions.USERS_FETCH_FAILED:
        case userActions.USERSBYID_FETCH_FAILED:
            return {
                ...state,
                apiState: apiStates.error,
            };
        default:
            return state;
    }
}
  