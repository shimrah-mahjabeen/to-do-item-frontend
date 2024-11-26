import React from 'react';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import { AuthProvider } from './providers/AuthProvider';
import { ApolloProvider } from '@apollo/client';
import Routes from './routes/Routes';
import { Provider } from 'react-redux';
import { client } from './apollo/client';
import { store } from './store/store';
import "./index.css";
import "./output.css";
import { Toaster } from 'react-hot-toast';

const App: React.FC = () => {
  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <ApolloProvider client={client}>
        <I18nextProvider i18n={i18n}>
          <Provider store={store}>
            <AuthProvider>
              <Routes />
            </AuthProvider>
          </Provider>
        </I18nextProvider>
      </ApolloProvider>
    </>
  );
};

export default App;
