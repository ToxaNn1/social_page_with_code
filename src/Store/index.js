import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import { reducerMain } from "./Reduce/reducerMain";


export const store = createStore(reducerMain, composeWithDevTools(applyMiddleware(thunk)));
