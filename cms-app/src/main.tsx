import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import LoginPage from './pages/auth/Login'
import ForgetPasswordPage from './pages/auth/ForgetPassword';
import "./assets/style.css";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoginPage />
    <ForgetPasswordPage/>
  </StrictMode>,
)
