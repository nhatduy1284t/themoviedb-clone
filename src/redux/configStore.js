import { applyMiddleware, combineReducers, createStore } from "redux";
import { CarouselReducer } from "./reducers/CarouselReducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  CarouselReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
