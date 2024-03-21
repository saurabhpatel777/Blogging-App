import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import reducers from "./reducers";
console.log("store")
export const store = createStore(reducers,{},applyMiddleware(thunk))