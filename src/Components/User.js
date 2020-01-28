import React, { useEffect } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { userSagaActions } from "../store/sagas/users";
import { apiStates } from "../api";

function User({ id, getData, apiState, user }) {
    useEffect(() => {
        getData(id);
    }, [getData, id]);

    return (
        apiState === apiStates.fetching && !user.id ? "Loading..." : (
            <article className="mw5 center bg-white br3 pa3 pa4-ns mv3 ba b--black-10">
                <div className="tc">
                    <img
                        alt="User profile"
                        src={user.avatar}
                        className="br-100 h4 w4 dib ba b--black-05 pa2"
                    />
                    <h1 className="f3 mb2">{user.first_name} {user.last_name}</h1>
                    <h2 className="f5 fw4 gray mt0">{user.email}</h2>
               </div>
            </article>
        )
    );
}

function mapStateToProps(state, ownProps) {
    const apiState = state.users.apiState;
    const byId = state.users.payload.byId || {};
    const user = byId[ownProps.id] || {};
    return { 
        apiState,
        user,
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getData: (id = 1) => ({ type: userSagaActions.USERBYID_FETCH_REQUESTED, id })
        },
        dispatch
    );
}

export const ConnectedUser = connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
