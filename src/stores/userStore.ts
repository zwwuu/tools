import { create } from "zustand";
import { createJSONStorage, devtools, persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

export type UserState = {
  id?: string;
  likedTools: {
    [key: string]: number;
  };
  setId: (id: string) => void;
  setLikedTools: (likedTools: { [key: string]: number }) => void;
  addLike: (slug: string) => void;
};

export const useUserStore = create<UserState>()(
  immer(
    persist(
      devtools(
        (set) => ({
          id: undefined,
          likedTools: {},
          setId: (id) => set({ id }, false, { type: "setId", id }),
          setLikedTools: (likedTools) =>
            set({ likedTools }, false, {
              type: "setLikedTools",
              likedTools,
            }),
          addLike: (slug) =>
            set(
              (state) => {
                state.likedTools[slug] = (state.likedTools[slug] || 0) + 1;
              },
              false,
              {
                type: "addLike",
                slug,
              },
            ),
        }),
        { name: "user" },
      ),
      {
        name: "user",
        version: 0,
        storage: createJSONStorage(() => localStorage),
        partialize: (state) => ({ userId: state.id }),
      },
    ),
  ),
);
