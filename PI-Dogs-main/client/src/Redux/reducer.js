import { GET_ALLDOGS, GET_DOGBYID, GET_DOGBYNAME, POST_DOG, GET_ALLTEMPS, FILTER_DOGS, FILTER_TEMPS, FILTER_ORIGIN, FILTER_WEIGHTS, RESET_FILTERS } from './actions';

let initialState = {
    dogs: [], //contiene todos los perros traidos de la base de datos y la api
    dogsOrdered: [], //copia del estado dogs que uso para filtrar
    tempsFilter: [], //contiene todos los temperamentos ordenados
}

export default function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALLDOGS:
            return {
                ...state,
                dogs: action.payload,
                dogsOrdered: action.payload,
            }
        case GET_DOGBYID:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_DOGBYNAME:
            return {
                ...state,
                dogsOrdered: action.payload
            }
        case POST_DOG:
            return {
                ...state,
                dogs: action.payload
            }
        case GET_ALLTEMPS:
            return {
                ...state,
                tempsFilter: action.payload
            }
        case FILTER_DOGS:
            let filteredDogs;
            if (action.payload === "asc") {
                filteredDogs = [...state.dogsOrdered].sort((a, b) => a.name.localeCompare(b.name));
            } else if (action.payload === "desc") {
                filteredDogs = [...state.dogsOrdered].sort((a, b) => b.name.localeCompare(a.name));
            } else {
                filteredDogs = state.dogsOrdered;
            }
            return {
                ...state,
                dogsOrdered: filteredDogs
            }
        case FILTER_TEMPS:
            const allDogsTemp = state.dogsOrdered;
            let filterByTemp;
            if (action.payload === 'all') {
                filterByTemp = allDogsTemp;
            } else {
                filterByTemp = allDogsTemp.filter((dog) => dog.temperament?.includes(action.payload))
            }
            return {
                ...state,
                dogsOrdered: [...filterByTemp]
            };
        case FILTER_WEIGHTS:
            let weightOrder = [...state.dogsOrdered];
            if (action.payload === "all") {
                weightOrder = [...state.dogsOrdered];
            } else if (action.payload === "asc") {
                weightOrder.sort((a, b) => parseInt(a.weight) - parseInt(b.weight));
            } else if(action.payload === "desc") {
                weightOrder.sort((a, b) => parseInt(b.weight) - parseInt(a.weight));
            }
            return {
                ...state,
                dogsOrdered: [...weightOrder]
            }
        case FILTER_ORIGIN:
            let originOrder;
            if (action.payload === "all") {
                originOrder = [...state.dogsOrdered];
            } else if(action.payload === "api"){
                originOrder = [...state.dogsOrdered].filter((dog) => typeof(dog.id) === "number");
            } else if(action.payload === "db"){
                originOrder = [...state.dogsOrdered].filter((dog) => typeof(dog.id) === "string");
            }
            return {
                ...state,
                dogsOrdered: [...originOrder]
            }
        case RESET_FILTERS:
            return {
                ...state,
                dogsOrdered: [...state.dogs]
            }
        default:
        return state; 
    }
}