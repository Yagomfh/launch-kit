import 'react-app-polyfill/ie11';
import * as ReactDOM from 'react-dom';
// @ts-ignore
import { EmailLoginForm, LaunchKitProvider } from '../.';

const App = () => {
  return (
    <div>
      <LaunchKitProvider>
        <EmailLoginForm
          emailLabel="Email"
          emailPlaceholder="email@example.com"
          passwordLabel="Password"
          passwordPlaceholder="Your password"
          buttonText="Submit"
          onSubmit={async (values: any) => console.log(values)}
        />
      </LaunchKitProvider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
