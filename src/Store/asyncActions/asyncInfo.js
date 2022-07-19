import { startCreater, onePersonCreater } from "../Reduce/reducerMain";
import axios from 'axios'

export const fetchInfo = {
    getAll: () => {
        return function (dispatch) {
            axios.get("https://jsonplaceholder.typicode.com/users")
                .then((response) => response.data)
                .then((data) => dispatch(startCreater(data)));
        };
    },
    getById: (id) => {
        return function (dispatch) {
            axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
                .then((response) => response.data)
                .then((data) => dispatch(onePersonCreater(data)));
        };
    },
};
