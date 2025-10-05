import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { TodoPage } from "./pages/TodoPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/todos" />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/todos" element={<TodoPage />} />
    </Routes>
  );
}

export default App;
