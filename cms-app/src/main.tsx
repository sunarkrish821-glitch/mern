import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/style.css";
import RouterConfig from './config/RouterConfig';
import { Toaster } from 'sonner';
import AuthProvider from './lib/provider/provider/AuthProvider';
import { Provider } from "react-redux";
import store from './config/store';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
         <Toaster position='top-right' richColors closeButton/>
    <RouterConfig />
      </Provider>
    </AuthProvider>
   {/* <LoginPage /> */}
   {/* <ForgetPasswordPage /> */}
  </StrictMode>,
)
