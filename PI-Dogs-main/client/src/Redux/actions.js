import axios from "axios";

export const GET_ALLDOGS = "GET_ALLDOGS";
export const GET_DOGBYID = "GET_DOGBYID";
export const GET_DOGBYNAME = "GET_DOGBYNAME";
export const GET_ALLTEMPS = "GET_ALLTEMPS";

export const POST_DOG = "POST_DOG";

export const FILTER_DOGS = "FILTER_DOGS";
export const FILTER_TEMPS = "FILTER_TEMPS";
export const FILTER_WEIGHTS = "FILTER_WEIGHTS";
export const FILTER_ORIGIN = "FILTER_ORIGIN";

export const RESET_FILTERS = "RESET_FILTERS";       


export const getAllDogs = () => {
    try{
        const endpoint = "http://localhost:3001/dogs";
        return async (dispatch) => {
            const { data } = await axios(endpoint);
            return dispatch({
                type: GET_ALLDOGS,
                payload: data
            })
        }
    } catch(error){
        console.log(error);
    }
}

export const getAllTemps = () => {
    try{
        const endpoint = "http://localhost:3001/temperaments";
        return async (dispatch) => {
            const { data } = await axios(endpoint);
            return dispatch({
                type: GET_ALLTEMPS,
                payload: data
            })
        }
    } catch(error){
        console.log(error);
    }
}

export const getDogById = (id) => {
    try{
        const endpoint = `http://localhost:3001/dogs/${id}`;
        return async (dispatch) => {
            const { data } = axios(endpoint);
            return dispatch({
                type: GET_DOGBYID,
                payload: data
            })
        }
    } catch(error){
        console.log(error);
    }
}

export const getDogByName = (name) => {
    try{
        const endpoint = `http://localhost:3001/dogs/searchByName?name=${name}`;
        return async (dispatch) => {
            const { data } = await axios(endpoint);
            return dispatch({
                type: GET_DOGBYNAME,
                payload: data
            })
        }
    } catch(error){
        console.log(error);
    }
}

export const postDog = (dogData) => {
    try{
        const endpoint = "http://localhost:3001/dogs/";
        return async (dispatch) => {
            const { data } = axios.post(endpoint, dogData);
            return dispatch({
                type: POST_DOG,
                payload: data
            })
        }
    } catch(error){
        console.log(error);
    }
}

export const filterDogs = (event) => {
    return {
        type: FILTER_DOGS,
        payload: event
    }
}

export const filterTemps = (event) => {
    return {
        type: FILTER_TEMPS,
        payload: event
    }
}

export const filterWeights = (event) => {
    return {
        type: FILTER_WEIGHTS,
        payload: event
    }
}

export const filterOrigin = (event) => {
    return {
        type: FILTER_ORIGIN,
        payload: event
    }
}

export const resetFilters = () => {
    return {
        type: RESET_FILTERS
    }
}