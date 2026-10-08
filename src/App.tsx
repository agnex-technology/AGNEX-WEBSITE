import React, { useEffect } from 'react';
import { RouterProvider } from 'react-router-dom';
import router from './router';
import ErrorBoundary from './components/layout/ErrorBoundary';
import { LocalizationProvider } from './localization/LocalizationContext';
import { initAnalytics } from './utils/analytics';

const App: React.FC = () => {
  useEffect(() => {
    initAnalytics();
  }, []);

  return (
    <ErrorBoundary>
      <LocalizationProvider>
        <RouterProvider router={router} />
      </LocalizationProvider>
    </ErrorBoundary>
  );
};

export default App;
