import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <PersistGate loading={<div>جاري التحميل...</div>} persistor={persistor}> */}
        <App />
      {/* </PersistGate> */}
    </Provider>
  </StrictMode>,
)
