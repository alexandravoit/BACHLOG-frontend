import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'
import App from './App';

import '@primer/react-brand/lib/css/main.css';
import '@primer/react-brand/fonts/fonts.css';

import '@primer/primitives/dist/css/base/size/size.css';
import '@primer/primitives/dist/css/base/typography/typography.css';

import '@primer/primitives/dist/css/functional/size/size.css';
import '@primer/primitives/dist/css/functional/size/border.css';
import '@primer/primitives/dist/css/functional/typography/typography.css';

import '@primer/primitives/dist/css/functional/themes/light.css';
import '@primer/primitives/dist/css/functional/themes/dark.css';
import '@primer/primitives/dist/css/functional/themes/dark-dimmed.css';

import { ThemeProvider, BaseStyles } from '@primer/react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ThemeProvider colorMode="auto" dayScheme="light" nightScheme="dark">
      <BaseStyles>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BaseStyles>
    </ThemeProvider>
  </React.StrictMode>
);