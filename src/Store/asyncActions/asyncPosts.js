import axios from 'axios'; 
import { actionStartPost } from "../Reduce/reducerMain"

export const fetchPosts = ()=>{
    return function(dispatch){
        axios.get('https://jsonplaceholder.typicode.com/posts')
        .then(response => response.data)
        .then(data => dispatch(actionStartPost(data)))
    }
}