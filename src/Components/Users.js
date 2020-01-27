import React, { useState, useEffect, useCallback } from "react";
import { apiStates, getUsers } from '../api';

export function Users() {
  const [userData, setUserData] = useState({ apiState: apiStates.none, response: {} });
  const [currentPage, setCurrentPage] = useState(1);
  const { page = currentPage, total_pages = currentPage, data: users = [] } = userData.response;
  const haveMorePages = page < total_pages;

  useEffect(() => {
    setUserData(prev => ({ ...prev, apiState: apiStates.fetching }));
    getUsers({ page: currentPage })
      .then((users = []) => setUserData(prev => 
        ({
          apiState: apiStates.fetched,
          response: {
            ...users,
            data: (prev.response.data || []).concat(users.data),
          }
        })
      ))
      .catch(err => {
        console.log('err', err);
        setUserData(prev => ({ ...prev, apiState: apiStates.error }));
      });
  }, [currentPage]);

  const onLoadMore = useCallback(() => {
    setCurrentPage(currentPage => currentPage + 1);
  }, []);

  console.log('userResponse', userData);
  return (
    <div className="mw6 center">
      
      {users.map((user = {}) => {
        const { id, avatar = "", first_name, last_name, email } = user;

        return (
          <a key={id} href={`/users/${id}`} className="link">
            <article className="dt w-100 bb b--black-05 pb2 mt2 pointer" href="#0">
              <div className="dtc w2 w3-ns v-mid">
                <img alt="avatar" src={avatar} className="ba b--black-10 db br-100 w2 w3-ns h2 h3-ns" />
              </div>
              <div className="dtc v-mid pl3">
                <h1 className="f6 f5-ns fw6 lh-title black mv0">{first_name} {last_name}</h1>
                <h2 className="f6 fw4 mt0 mb0 black-60">{email}</h2>
              </div>
            </article>
          </a>
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
