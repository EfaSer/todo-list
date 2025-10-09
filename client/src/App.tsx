import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import { Modal } from "./components/Modal";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TodoPage } from "./pages/TodoPage";
import { useAuthStore } from "./store/authStore";

function App() {
  const { sessionExpired, setSessionExpired } = useAuthStore();
  const navigate = useNavigate();

  const handleSessionExpired = () => {
    setSessionExpired(false);
    navigate("/login");
  };

  return (
    <>
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/todos" />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/todos"
            element={
              <ProtectedRoute>
                <TodoPage />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/todos" replace />} />
        </Routes>
      </div>

      {sessionExpired && (
        <Modal
          title={"Время сессии истекло"}
          message={"Пожалуйста, войдите снова, чтобы продолжить."}
          confirmText={"OK"}
          onConfirm={handleSessionExpired}
        />
      )}
    </>
  );
}

export default App;
