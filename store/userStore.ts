import { axiosApi } from "@/services";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";

export type UserStoreType = {
  isAuthenticated: boolean;
  token: string;
  user: any;
  login: (token: string, user: any) => void;
  logout: () => void;
  loginControl: () => void;
};

export const useUserStore = create<UserStoreType>((set) => ({
  isAuthenticated: false,
  token: "",
  user: null,

  login: async (token: string, user: any) => {
    set({ isAuthenticated: true, token, user });
    await AsyncStorage.setItem("token", token);
    await AsyncStorage.setItem("user", JSON.stringify(user));
    axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  },

  logout: async () => {
    set({ isAuthenticated: false, token: "", user: null });
    await AsyncStorage.removeItem("token");
    await AsyncStorage.removeItem("user");
    axiosApi.defaults.headers.common["Authorization"] = "";
  },

  loginControl: async () => {
    const token = await AsyncStorage.getItem("token");
    const user = await AsyncStorage.getItem("user");

    if (token && user) {
      set({ isAuthenticated: true, token, user: JSON.parse(user) });
      axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
  },
}));
