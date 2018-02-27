import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch, Link } from 'react-router-dom';
import { History } from 'history';
import { navigate } from './common/actions/navigate';
import createAuthRoute from 'features/authentication/components/AuthRoute/AuthRoute';

import LoginPage from 'features/authentication/containers/LoginPage';

interface Props {
  store: Store<any>;
  history: History;
}

const Home = () => (
  <div>
    Home
    <button onClick={r => navigate('/test')} >Test</button>
  </div>
);

const Page = () => (
  <div>Page 2</div>
);

const Secret = () => (
  <div>Page 2</div>
);

export class App extends React.Component<Props, {}> {
  render() {
    const { store, history } = this.props;
    const AuthRoute = createAuthRoute(store);
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
        <div>
          <ul>
            <li><Link to={'/'}>index</Link></li>
            <li><Link to={'/page'}>Page 1</Link></li>
            <li><Link to={'/secret'}>Secret</Link></li>
          </ul>
          <hr />
          <Switch>
              <Route exact={true} path="/" component={Home} />
              <Route path="/page" component={Page} />
              <AuthRoute path="/secret" component={Secret} />
              <Route path="/login" component={LoginPage} />
          </Switch>
        </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
