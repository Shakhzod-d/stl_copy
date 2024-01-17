import ReactDOM from 'react-dom/client';
import App from './App';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { createBrowserHistory } from 'history'
import { QueryClientProvider } from "react-query";
import { queryClient } from './constants';
import { QueryParamProvider } from 'use-query-params';
import { ReactRouter5Adapter } from 'use-query-params/adapters/react-router-5';
import store from './store';
import 'antd/dist/antd.less';
import "./styles/index.scss"

export const history = createBrowserHistory()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);


root.render(
  <Provider store={store}>
    <Router history={history}>
      <QueryClientProvider client={queryClient}>
        <QueryParamProvider adapter={ReactRouter5Adapter}>
          <App />
          {/* <ReactQueryDevtools initialIsOpen={true} /> */}
        </QueryParamProvider>
      </QueryClientProvider>
    </Router>
  </Provider >
);
