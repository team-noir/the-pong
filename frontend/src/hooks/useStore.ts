import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserType } from 'types';

interface UserState {
  isLoggedIn: boolean;
  isOnboarded: boolean;
  id: number | null;
  nickname: string;
  rank: number;
  isTwoFactor: boolean;
  login: (user: UserType) => void;
  logout: () => void;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  setNickname: (nickname: string) => void;
  setIsOnboarded: (isOnboarded: boolean) => void;
  setIsTwoFactor: (isTwoFactor: boolean) => void;
}

const initialState = {
  isLoggedIn: false,
  isOnboarded: false,
  id: null,
  nickname: '',
  rank: 0,
  isTwoFactor: false,
};

export const useUser = create<UserState>()(
  devtools((set) => ({
    ...initialState,
    login: ({ id, nickname, rank, isTwoFactor }: UserType) =>
      set(() => ({
        isLoggedIn: !isTwoFactor,
        isOnboarded: !!nickname,
        id,
        nickname,
        rank,
        isTwoFactor,
      })),
    logout: () => set(() => initialState),
    setIsLoggedIn: (isLoggedIn: boolean) => set(() => ({ isLoggedIn })),
    setNickname: (nickname: string) =>
      set(() => ({
        nickname,
      })),
    setIsOnboarded: (isOnboarded: boolean) => set(() => ({ isOnboarded })),
    setIsTwoFactor: (isTwoFactor: boolean) => set(() => ({ isTwoFactor })),
  }))
);
