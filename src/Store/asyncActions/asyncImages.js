import { startCreaterImage,startCreaterFriends} from "../Reduce/reducerMain";
import axios from 'axios'
export const fetchImages =  {
    getImagesMain: ()=>{
        return function (dispatch) {
            axios.get("https://jsonplaceholder.typicode.com/photos")
                .then((response) => response.data)
                .then((data) => dispatch(startCreaterImage(data)));
        };
    },
    getImagesFriends: ()=>{
        return function (dispatch) {
            axios.get("https://jsonplaceholder.typicode.com/photos")
                .then((response) => response.data)
                .then((data) => dispatch(startCreaterFriends(data)));
        };
    }
};
