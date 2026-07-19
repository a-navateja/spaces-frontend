import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./context/ToastContext";
import { RequireAuth } from "./components/layout/RequireAuth";
import { AppLayout } from "./components/layout/AppLayout";
import { LoginPage } from "./pages/auth/LoginPage";
import { SignupRequestPage } from "./pages/auth/SignupRequestPage";
import { SignupConfirmPage } from "./pages/auth/SignupConfirmPage";
import { ForgotPasswordPage } from "./pages/auth/ForgotPasswordPage";
import { ResetPasswordPage } from "./pages/auth/ResetPasswordPage";
import { SpacesListPage } from "./pages/SpacesListPage";
import { SpaceDetailPage } from "./pages/SpaceDetailPage";
import { NotFoundPage } from "./pages/NotFoundPage";
import { ROUTES } from "./constants/routes";

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Navigate to={ROUTES.SPACES} replace />} />

            <Route path={ROUTES.LOGIN} element={<LoginPage />} />
            <Route path={ROUTES.SIGNUP} element={<SignupRequestPage />} />
            <Route path={ROUTES.SIGNUP_CONFIRM} element={<SignupConfirmPage />} />
            <Route path={ROUTES.FORGOT_PASSWORD} element={<ForgotPasswordPage />} />
            <Route path={ROUTES.RESET_PASSWORD} element={<ResetPasswordPage />} />

            <Route
              element={
                <RequireAuth>
                  <AppLayout />
                </RequireAuth>
              }
            >
              <Route path={ROUTES.SPACES} element={<SpacesListPage />} />
              <Route path={ROUTES.SPACE_DETAIL} element={<SpaceDetailPage />} />
            </Route>

            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  );
}
