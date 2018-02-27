import React from 'react';
import {connect} from 'react-redux';
import {Route} from 'react-router';
import {compose, lifecycle} from 'recompose';

import {authCheck} from '../../actions/';

const enhance = (store: any) => compose(
  lifecycle({
    componentWillMount() {
      // TODO: We shouldn't use getState
      if (!(store.getState().authentication.isAuth)) {
        authCheck();
      }
    },
  }),
  connect((state: any) => {
    return {
      ...state.authentication.isAuth,
    };
  })
);

const AuthRouter = (props: any) =>
  (<Route {...props} />);

const createAuthRoute = (store: any) => enhance(store)(AuthRouter);

export default createAuthRoute;
