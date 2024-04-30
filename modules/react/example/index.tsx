import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
import axios from 'axios';
import {
  LaunchKitConfig,
  LaunchKitProvider,
  Router,
  setupInterceptors,
  useSession,
} from '../.';
import Login from './src/pages/Login';

const config: LaunchKitConfig = {
  api: setupInterceptors(
    axios.create({
      baseURL: 'http://localhost:1337',
    })
  ),

  auth: {
    usersMePath: '/api/users/me',
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
            component: <Login />,
            access: 'public',
          },
        ]}
      />
    </LaunchKitProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
