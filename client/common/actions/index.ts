// RootActions
import { RouterAction, LocationChangeAction } from 'react-router-redux';
import { getReturnOfExpression } from 'utility-types';

import { navigate } from './navigate';

export {
  navigate
};

const returnsOfActions = [
].map(getReturnOfExpression);

type AppAction = typeof returnsOfActions[number];
type ReactRouterAction = RouterAction | LocationChangeAction;

export type RootAction =
  | AppAction
  | ReactRouterAction;
