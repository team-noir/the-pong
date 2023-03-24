import { create } from 'zustand';

interface LoginState {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

interface UserState {
  isOnboarded: boolean;
  setIsOnboarded: (isOnboarded: boolean) => void;
}

export const useLogin = create<LoginState>((set) => ({
  isLogin: false,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
}));

export const useUser = create<UserState>((set) => ({
  isOnboarded: false,
  setIsOnboarded: (isOnboarded: boolean) => set(() => ({ isOnboarded })),
}));
