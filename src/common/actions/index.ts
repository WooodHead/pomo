// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { getReturnOfExpression } from 'utility-types';

export const actions = {

};

const returnsOfActions = [
].map(getReturnOfExpression);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
