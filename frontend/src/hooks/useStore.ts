import { create } from 'zustand';

interface LoginState {
  isLogin: boolean;
  login: () => void;
  logout: () => void;
}

interface UserState {
  hasNickname: boolean;
  setHasNickname: (hasNickname: boolean) => void;
}

export const useLogin = create<LoginState>((set) => ({
  isLogin: false,
  login: () => set(() => ({ isLogin: true })),
  logout: () => set(() => ({ isLogin: false })),
}));

export const useUser = create<UserState>((set) => ({
  hasNickname: false,
  setHasNickname: (hasNickname: boolean) => set(() => ({ hasNickname })),
}));
