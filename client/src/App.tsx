import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
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

      {sessionExpired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="bg-gray-800 p-6 rounded-2xl shadow-xl w-80 text-center animate-fade-in">
            <h2 className="text-xl font-semibold text-white mb-2">
              Время сессии истекло
            </h2>
            <p className="text-white mb-5">
              Пожалуйста, войдите снова, чтобы продолжить.
            </p>
            <button
              onClick={handleSessionExpired}
              className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors cursor-pointer"
            >
              ОК
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
