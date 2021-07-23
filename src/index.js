import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from './services/Store';
import LoadingScreen from './components/LoadingScreen';
const App = React.lazy(() => import('./app/App'))
ReactDOM.render(
  <React.StrictMode>
    <StoreProvider>
      <Suspense fallback={<LoadingScreen />}>
        <App />
      </Suspense>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
