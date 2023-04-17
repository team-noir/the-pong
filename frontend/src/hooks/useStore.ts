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
  isVerifiedTwoFactor: boolean;
  login: (user: UserType) => void;
  logout: () => void;
  setNickname: (nickname: string) => void;
  setIsOnboarded: (isOnboarded: boolean) => void;
  setIsTwoFactor: (isTwoFactor: boolean) => void;
  setIsVerifiedTwoFactor: (isVerifiedTwoFactor: boolean) => void;
}

const initialState = {
  isLoggedIn: false,
  isOnboarded: false,
  id: null,
  nickname: '',
  rank: 0,
  isTwoFactor: false,
  isVerifiedTwoFactor: false,
};

export const useUser = create<UserState>()(
  devtools((set) => ({
    ...initialState,
    login: ({
      id,
      nickname,
      rank,
      isTwoFactor,
      isVerifiedTwoFactor,
    }: UserType) =>
      set(() => ({
        isLoggedIn: true,
        isOnboarded: !!nickname,
        id,
        nickname,
        rank,
        isTwoFactor,
        isVerifiedTwoFactor: false, // TODO: 나중에 false 삭제
      })),
    logout: () => set(() => initialState),
    setNickname: (nickname: string) =>
      set(() => ({
        nickname,
      })),
    setIsOnboarded: (isOnboarded: boolean) => set(() => ({ isOnboarded })),
    setIsTwoFactor: (isTwoFactor: boolean) => set(() => ({ isTwoFactor })),
    setIsVerifiedTwoFactor: (isVerifiedTwoFactor: boolean) =>
      set(() => ({ isVerifiedTwoFactor })),
  }))
);
