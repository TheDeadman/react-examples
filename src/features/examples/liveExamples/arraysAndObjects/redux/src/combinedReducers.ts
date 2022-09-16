import { combineReducers } from "@reduxjs/toolkit";

import heroesListReducer from './optimizedSlice';

const combinedUnoptimizedReducers = combineReducers({
    heroesListSlice: heroesListReducer,
})

export default combinedUnoptimizedReducers;