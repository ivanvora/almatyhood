import { combineReducers } from '@reduxjs/toolkit';
import { likesReducer } from './likes/reducer';

export default combineReducers({
    likesReducer,
});
