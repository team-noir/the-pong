import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { UserType } from 'types';

interface UserState {
  isLogin: boolean;
  isOnboarded: boolean;
  id: number | null;
  nickname: string;
  rank: number;
  isTwoFactor: boolean;
  login: (user: UserType) => void;
  logout: () => void;
  setNickname: (nickname: string) => void;
  setIsOnboarded: (isOnboarded: boolean) => void;
}

const initialState = {
  isLogin: false,
  id: null,
  nickname: '',
  rank: 0,
  isTwoFactor: false,
  isOnboarded: false,
};

export const useUser = create<UserState>()(
  devtools((set) => ({
    ...initialState,
    login: ({ id, nickname, rank, isTwoFactor }: UserType) =>
      set(() => ({
        isLogin: true,
        id,
        nickname,
        rank,
        isTwoFactor,
      })),
    logout: () => set(() => initialState),
    setNickname: (nickname: string) =>
      set(() => ({
        nickname,
      })),
    setIsOnboarded: (isOnboarded: boolean) => set(() => ({ isOnboarded })),
  }))
);
