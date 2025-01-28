import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';
import '@ant-design/v5-patch-for-react-19';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './services/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  // <StrictMode> Esto provoca que se ejecute 2 veces los useEfect, hay que testear!
    <BrowserRouter future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  // </StrictMode>,
);