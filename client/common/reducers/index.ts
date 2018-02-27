import { combineReducers } from 'redux';

interface StoreEnhancerState { }

export interface RootState extends StoreEnhancerState {
}

import { RootAction } from '../actions/';
export const rootReducer = combineReducers<RootState>({

});
