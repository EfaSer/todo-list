import { IAuthResponse, IUser } from "@/types/auth";
import { create } from "zustand";
import { authApi } from "@/api/authApi";

interface AuthState {
  user: IAuthResponse["user"] | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: IUser) => Promise<boolean>;
  register: (data: IUser) => Promise<boolean>;
  logout: () => void;
  sessionExpired: boolean;
  setSessionExpired: (value: boolean) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: localStorage.getItem("token"),
  loading: false,
  error: null,
  sessionExpired: false,

  setSessionExpired: (value) => set({ sessionExpired: value }),

  login: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await authApi.login(data);
      localStorage.setItem("token", res.token);
      set({ user: res.user, token: res.token, loading: false });
      return true;
    } catch (err: any) {
      const status = err.response?.status;
      let message = "Ошибка входа. Попробуйте позже.";

      if (status === 401) message = "Неверный email или пароль.";
      if (status === 400) message = "Некорректные данные.";

      set({ error: message, loading: false });
      return false;
    }
  },

  register: async (data) => {
    set({ loading: true, error: null });

    try {
      const res = await authApi.register(data);
      localStorage.setItem("token", res.token);
      set({ user: res.user, token: res.token, loading: false });
      return true;
    } catch (err: any) {
      const status = err.response?.status;
      let message = "Ошибка регистрации. Попробуйте позже.";

      if (status === 409)
        message = "Пользователь с таким email уже существует.";
      if (status === 400) message = "Некорректные данные. Проверьте поля.";

      set({ error: message, loading: false });
      return false;
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    set({ user: null, token: null });
  },
}));
