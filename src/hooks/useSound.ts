import { useEffect, useRef, useState } from "react";

export default function useSound(src: string, { defaultVolume = 1 }: { defaultVolume?: number } = {}) {
  const audio = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const handleEnded = () => {
      setIsPlaying(false);
    };
    audio.current = new Audio(src);
    audio.current.volume = defaultVolume;
    audio.current?.addEventListener("ended", handleEnded);
    return () => {
      audio.current?.pause();
      audio.current?.removeEventListener("ended", handleEnded);
    };
  }, [defaultVolume, src]);

  const play = async () => {
    await audio.current?.play();
    setIsPlaying(true);
  };

  const pause = () => {
    audio.current?.pause();
    setIsPlaying(false);
  };

  const stop = async () => {
    if (audio.current) {
      audio.current.pause();
      audio.current.currentTime = 0;
    }
    setIsPlaying(false);
  };

  const setVolume = (value: number) => {
    if (audio.current) {
      audio.current.volume = value;
    }
  };

  return {
    play,
    pause,
    stop,
    setVolume,
    isPlaying,
  };
}
