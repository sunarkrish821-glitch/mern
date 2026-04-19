import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/style.css";
import RouterConfig from './config/RouterConfig';
import { Toaster } from 'sonner';
import AuthProvider from './lib/provider/provider/AuthProvider';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <Toaster position='top-right' richColors closeButton/>
    <RouterConfig />
    </AuthProvider>
   {/* <LoginPage /> */}
   {/* <ForgetPasswordPage /> */}
  </StrictMode>,
)
