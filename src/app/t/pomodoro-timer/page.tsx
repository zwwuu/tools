"use client";

import { useEffect, useMemo } from "react";
import { IconBell, IconBellOff, IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import clsx from "clsx";

import Main from "~/app/t/components/Main";
import { INTERVAL_STYLES, MIN_MINUTES, usePomodoroTimerStore } from "~/app/t/pomodoro-timer/data";
import { Accordion, AccordionContent, AccordionHeader, AccordionItem, AccordionTrigger } from "~/components/Accordion";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import Input from "~/components/Form/Input";
import Heading from "~/components/Typography/Heading";
import useInterval from "~/hooks/useInterval";
import useKeyPress from "~/hooks/useKeyPress";
import useSound from "~/hooks/useSound";
import useTitle from "~/hooks/useTitle";

export default function PomodoroTimerPage() {
  const {
    round,
    durations,
    currentInterval,
    timeLeft,
    isActive,
    isRunning,
    isMuted,
    tick,
    next,
    start,
    reset,
    toggle,
    setDuration,
    setCurrentInterval,
    setTimeLeft,
    toggleAlarm,
  } = usePomodoroTimerStore((state) => ({
    round: state.round,
    durations: state.durations,
    currentInterval: state.currentInterval,
    timeLeft: state.timeLeft,
    isActive: state.isActive,
    isRunning: state.isRunning,
    isMuted: state.isMuted,
    tick: state.tick,
    next: state.next,
    start: state.start,
    reset: state.reset,
    toggle: state.toggle,
    setDuration: state.setDuration,
    setCurrentInterval: state.setCurrentInterval,
    setTimeLeft: state.setTimeLeft,
    toggleAlarm: state.toggleAlarm,
  }));
  const [_, setTitle] = useTitle();
  const { play, isPlaying, setVolume } = useSound("/sounds/pomodoro-timer/alarm.mp3");

  useInterval(() => {
    if (timeLeft <= 0) {
      if ((round + 1) % 4 === 0) {
        setTimeLeft(durations.longBreak);
        setCurrentInterval("longBreak");
      } else {
        setTimeLeft(currentInterval === "work" ? durations.shortBreak : durations.work);
        setCurrentInterval(currentInterval === "work" ? "shortBreak" : "work");
      }
      next();
      void play();
    } else {
      tick();
    }
  }, isActive && isRunning);

  const progress = useMemo(() => {
    return (timeLeft / durations[currentInterval]) * 100;
  }, [timeLeft, durations, currentInterval]);

  const formattedTimeLeft = useMemo(() => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, [timeLeft]);

  useEffect(() => {
    if (isActive) {
      if (isRunning) {
        setTitle(`${INTERVAL_STYLES[currentInterval].label} - ${formattedTimeLeft}`);
      } else {
        setTitle(`Paused - ${INTERVAL_STYLES[currentInterval].label} - ${formattedTimeLeft}`);
      }
    } else {
      setTitle(null);
    }
  }, [isActive, isRunning, currentInterval, setTitle, formattedTimeLeft]);

  useKeyPress([" "], {
    onKeyDown: {
      fn: (event) => {
        event.preventDefault();
        handleToggle();
      },
    },
  });

  useKeyPress(["m"], {
    onKeyDown: {
      fn: (event) => {
        event.preventDefault();
        handleAlarmToggle();
      },
    },
  });

  useKeyPress(["r"], {
    onKeyDown: {
      fn: (event) => {
        event.preventDefault();
        handleReset();
      },
    },
  });

  const handleStart = () => {
    start();
  };

  const handleToggle = () => {
    if (isActive) {
      toggle();
    }
  };

  const handleAlarmToggle = () => {
    setVolume(isMuted ? 1 : 0);
    toggleAlarm();
  };

  const handleReset = () => {
    setTitle(null);
    reset();
  };

  return (
    <Main>
      <Card
        className={clsx(
          "relative before:absolute before:inset-0 before:-z-1",
          isActive && INTERVAL_STYLES[currentInterval].shadow,
          isActive && "before:animate-twPulse before:shadow-2xl before:animate-infinite",
        )}
      >
        <CardBody className={"space-y-4"}>
          <div>
            <div className={"flex items-center justify-between"}>
              <div className={"opacity-90 text-xs"}>{`#${round}`}</div>
              <Button
                className={"sm:hidden"}
                title={`click to ${isMuted ? "unmute" : "mute"}`}
                variant={"icon"}
                onClick={handleAlarmToggle}
              >
                {isMuted ? (
                  <IconBellOff size={"1em"} aria-hidden />
                ) : (
                  <IconBell className={clsx({ "animate-tada animate-infinite": isPlaying })} size={"1em"} aria-hidden />
                )}
              </Button>
            </div>
            <Heading as={"h2"} className={"mb-2"}>
              {INTERVAL_STYLES[currentInterval].label}
            </Heading>
            <div className={clsx("relative h-1 w-full", INTERVAL_STYLES[currentInterval].track)}>
              <div
                className={clsx("absolute inset-y-0 left-0 transition", INTERVAL_STYLES[currentInterval].bar)}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <p className={"font-mono text-[3rem] font-bold"}>{formattedTimeLeft}</p>
          <div className={"flex w-full items-center"}>
            {isActive ? (
              <>
                <Button
                  className={clsx("mr-4 uppercase hover:animate-paused focus:animate-paused", {
                    "animate-twPulse animate-infinite": !isRunning,
                  })}
                  onClick={handleToggle}
                >
                  {isRunning ? (
                    <>
                      <IconPlayerPause className={"mr-1"} size={"1em"} />
                      Pause
                    </>
                  ) : (
                    <>
                      <IconPlayerPlay className={"mr-1"} size={"1em"} />
                      Resume
                    </>
                  )}
                </Button>
                <Button className={"uppercase"} onClick={handleReset}>
                  Reset
                </Button>
              </>
            ) : (
              <Button className={"uppercase"} onClick={handleStart}>
                <IconPlayerPlay className={"mr-1"} size={"1em"} /> Start
              </Button>
            )}
            <Button
              className={"ml-auto hidden sm:inline-flex"}
              size={"lg"}
              title={`click to ${isMuted ? "unmute" : "mute"}`}
              variant={"icon"}
              onClick={handleAlarmToggle}
            >
              {isMuted ? (
                <IconBellOff size={"1em"} aria-hidden />
              ) : (
                <IconBell className={clsx({ "animate-tada animate-infinite": isPlaying })} size={"1em"} aria-hidden />
              )}
            </Button>
          </div>
        </CardBody>
        <Accordion type={"single"} collapsible>
          <AccordionItem value={"config"}>
            <AccordionHeader>
              <AccordionTrigger className={"flex w-full items-center justify-center p-2"}>
                <span className={"mr-1 uppercase"}>Config</span>
              </AccordionTrigger>
            </AccordionHeader>
            <AccordionContent>
              <div className={"text-sm"}>
                <fieldset>
                  <legend className={"font-bold"}>Time (minutes)</legend>
                  <div className={"-mx-2 flex flex-wrap items-end"}>
                    {(Object.keys(INTERVAL_STYLES) as unknown as Array<keyof typeof INTERVAL_STYLES>).map(
                      (interval) => {
                        return (
                          <div className={"m-2 flex flex-1 flex-col items-start"} key={interval}>
                            <label htmlFor={interval}>{INTERVAL_STYLES[interval].label}</label>
                            <Input
                              className={"block w-full"}
                              id={interval}
                              min={MIN_MINUTES}
                              step={1}
                              type={"number"}
                              value={durations[interval] / 60}
                              onChange={(event) => {
                                const value = parseInt(event.target.value, 10);
                                if (!isNaN(value)) {
                                  const seconds = Math.max(value * 60, MIN_MINUTES * 60);
                                  if (currentInterval === interval) {
                                    setTimeLeft(Math.min(seconds, timeLeft));
                                  }
                                  setDuration(interval, seconds);
                                }
                              }}
                            />
                          </div>
                        );
                      },
                    )}
                  </div>
                </fieldset>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </Card>
    </Main>
  );
}
