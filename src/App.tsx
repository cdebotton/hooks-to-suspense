import React, { Suspense } from 'react';

import Home from './Home';
import { GlobalStyle } from './GlobalStyle';
import { Loading } from './Loading';
import ErrorBoundary from './ErrorBoundary';
import ErrorPage from './ErrorPage';

function App() {
  return (
    <>
      <GlobalStyle />
      <Suspense fallback={<Loading />}>
        <ErrorBoundary fallback={<ErrorPage />}>
          <Home />
        </ErrorBoundary>
      </Suspense>
    </>
  );
}

export default App;
