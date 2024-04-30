import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import {
  LaunchKitConfig,
  LaunchKitProvider,
  Router,
  setupInterceptors,
} from '../.';

const config: LaunchKitConfig = {
  api: {
    instance: setupInterceptors(
      axios.create({
        baseURL: 'http://localhost:3000',
      })
    ),
  },
  auth: {
    registerFn: async (params) => {
      const response = await fetch(`${config.api.baseURL}/register`, {
        method: 'POST',
        body: JSON.stringify(params),
      });
      return response.json();
    },
    loginFn: async (params) => {
      const response = await fetch(`${config.api.baseURL}/login`, {
        method: 'POST',
        body: JSON.stringify(params),
      });
      return response.json();
    },
    getMeFn: async () => {
      const response = await fetch(`${config.api.baseURL}/me`);
      return response.json();
    },
    logoutRedirect: '/login',
  },
};

const App = () => {
  return (
    <LaunchKitProvider config={config}>
      <Router
        routes={[
          {
            path: '/',
            component: <div>Home</div>,
            access: 'public',
          },
          {
            path: '/test',
            component: <div>Test</div>,
            access: 'private',
          },
          {
            path: '/login',
            component: <div>Login</div>,
            access: 'public',
          },
        ]}
      />
    </LaunchKitProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
