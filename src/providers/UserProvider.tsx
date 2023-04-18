"use client";

import { createContext, useCallback, useContext, useEffect, type ReactNode } from "react";
import { collectionGroup, onSnapshot, query, where } from "firebase/firestore";

import { db } from "~/lib/firebase";
import { useUserStore } from "~/stores/userStore";

type UserContextProps = {
  id?: string;
  likedTools: { [k: string]: number };
  isLiked: (slug: string) => boolean;
  addLike: (slug: string) => void;
};

export const UserContext = createContext<UserContextProps>({
  id: undefined,
  likedTools: {},
  isLiked: () => false,
  addLike: () => undefined,
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const { id, setId, likedTools, setLikedTools, addLike } = useUserStore((state) => ({
    id: state.id,
    likedTools: state.likedTools,
    setId: state.setId,
    setLikedTools: state.setLikedTools,
    addLike: state.addLike,
  }));

  useEffect(() => {
    (async () => {
      await fetch("/api/id", {
        method: "POST",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.id) {
            setId(data.id);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    })();
  }, [setId]);

  useEffect(() => {
    if (!id) return;

    const unsubscribe = onSnapshot(query(collectionGroup(db, "likes"), where("by", "==", id)), (snapshot) => {
      const likedTools: { [k: string]: number } = {};
      snapshot.forEach((doc) => {
        const fullPath = doc.ref.path;
        const slug = fullPath.split("/")[1];
        const likeData = doc.data();
        likedTools[slug] = likeData.likes;
      });
      setLikedTools(likedTools);
    });

    return () => unsubscribe();
  }, [id, setLikedTools]);

  const isLiked = useCallback((slug: string) => likedTools.hasOwnProperty(slug), [likedTools]);

  return <UserContext.Provider value={{ id, isLiked, likedTools, addLike }}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
