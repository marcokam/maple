export const apiStates = {
    none: "none",
    fetching: "fetching",
    fetched: "fetched",
    error: "error",
};

const getJson = (...fetchArgs) => fetch(...fetchArgs)
    .then(response => response.json());

const getQueryParams = (params = {}) => Object.entries(params)
    .map(([key, val]) => `${key}=${val}`)
    .join("&");
    
const apiBase = "https://reqres.in/api";
const generateUrl = (url, params = {}) => {
    const queryParams = getQueryParams(params);
    return `${apiBase}${url}${(queryParams ? `?${queryParams}` : "")}`;
}

export const getUsers = (params = {}) => getJson(generateUrl(`/users`, params));
export const getUserById = (id, params = {}) => getJson(generateUrl(`/users/${id}`));