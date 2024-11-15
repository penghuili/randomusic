import React from 'react';

import { Router } from './Router.jsx';
import { initShared } from './shared/browser/initShared.js';
import { Scrollbar } from './shared/browser/Scrollbar.jsx';
import { Toast } from './shared/browser/Toast.jsx';
import { apps } from './shared/js/apps.js';
import { AppWrapper } from './shared/semi/AppWrapper.jsx';

initShared({
  logo: '/icons2/icon-192.png',
  app: apps['easyy.click'].name,
  privacyUrl: 'https://easyy.click/privacy',
  termsUrl: 'https://easyy.click/terms',
  resetPassword: false,
});

function App() {
  return (
    <AppWrapper>
      <Router />

      <Toast />
      <Scrollbar thumbColor="#78c174" trackColor="#def0dc" />
    </AppWrapper>
  );
}

export default App;
