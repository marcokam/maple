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

const generateUrl = (url, params = {}) => {
    const queryParams = getQueryParams(params);
    return url + (queryParams ? `?${queryParams}` : "");
}

export const getUsers = (params = {}) => getJson(generateUrl('https://reqres.in/api/users', params));