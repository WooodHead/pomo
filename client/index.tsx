import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { connectRouter } from 'connected-react-router';
import { App } from './app';
import { store, browserHistory, sagaMiddleware } from './store';
import SagaManager from './utils/SagaManager';

const renderRoot = (app: JSX.Element) => {
  ReactDOM.render(app, document.getElementById('root'));
};

if (process.env.NODE_ENV === 'production') {
  renderRoot((
    <App store={store} history={browserHistory} />
  ));
} else { // removed in production, hot-reload config
  // tslint:disable-next-line:no-var-requires
  const AppContainer = require('react-hot-loader').AppContainer;
  renderRoot((
    <AppContainer>
      <App store={store} history={browserHistory} />
    </AppContainer>
  ));

  if (module.hot) {
    // app
    module.hot.accept('./app', async () => {
      const NextApp = require('./app').App;
      renderRoot((
        <AppContainer>
          <NextApp store={store} history={browserHistory} />
        </AppContainer>
      ));
    });

    // reducers
    module.hot.accept('./common/reducers', () => {
      const newRootReducer = require('./common/reducers').default;
      store.replaceReducer(newRootReducer);
      store.replaceReducer(connectRouter(browserHistory)(newRootReducer));
    });

    // sagas
    module.hot.accept('./common/sagas', () => {
      SagaManager.cancelSagas(store);
      require('./utils/SagaManager').default.startSagas(sagaMiddleware);
    });
  }
}
