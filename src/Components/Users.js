import React, { useEffect, useState, useCallback } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { userSagaActions } from "../store/sagas/users";
import { denormalizeById } from "../store/redux/utils";

function Users({ getData, response = {} }) {
    const [currentPage, setCurrentPage] = useState(response.page || 1);
    const users = denormalizeById(response);
    const { page = 1, total_pages = 1 } = response;
    const haveMorePages = page < total_pages;

    useEffect(() => {
        getData(currentPage);
    }, [getData, currentPage]);
    
    const onLoadMore = useCallback(() => {
        setCurrentPage(currentPage => currentPage + 1);
    }, []);

    return (
        <div className="mw6 center">
            {users.map((user = {}) => {
                const { id, avatar = "", first_name, last_name, email } = user;

                return (
                    <Link key={id} to={`/users/${id}`} className="link">
                        <article
                            className="dt w-100 bb b--black-05 pb2 mt2 pointer"
                            href="#0"
                        >
                            <div className="dtc w2 w3-ns v-mid">
                                <img
                                    alt="avatar"
                                    src={avatar}
                                    className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns"
                                />
                            </div>
                            <div className="dtc v-mid pl3">
                                <h1 className="f6 f5-ns fw6 lh-title black mv0">
                                    {first_name} {last_name}
                                </h1>
                                <h2 className="f6 fw4 mt0 mb0 black-60">
                                    {email}
                                </h2>
                            </div>
                        </article>
                    </Link>
                );
            })}

            <div className="mv4">
                {haveMorePages
                    ? <button className="f6 link dim bg-transparent br2 ba b--navy ph3 pv2 mb2 dib navy" href="#0" onClick={onLoadMore}>Load More</button>
                    : "You've reached the end of the list."
                }
            </div>
        </div>
    );
}

function mapStateToProps(state, ownProps) {
    return {
        response: state.users.payload || {},
    };
}
function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            getData: (page = 1) => ({ type: userSagaActions.USERS_FETCH_REQUESTED, page })
        },
        dispatch
    );
}

export const ConnectedUsers = connect(
    mapStateToProps,
    mapDispatchToProps
)(Users);
