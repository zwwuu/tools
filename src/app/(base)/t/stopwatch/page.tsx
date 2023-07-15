"use client";

import { useEffect, useMemo, useState } from "react";
import { IconPlayerPause, IconPlayerPlay } from "@tabler/icons-react";
import clsx from "clsx";

import Main from "~/app/(base)/t/components/Main";
import Button from "~/components/Button";
import { Card, CardBody } from "~/components/Card";
import useInterval from "~/hooks/useInterval";
import useKeyPress from "~/hooks/useKeyPress";
import useTitle from "~/hooks/useTitle";

export default function StopwatchPage() {
  const [_, setTitle] = useTitle();
  const [isActive, setIsActive] = useState(false);
  const [isRunning, setIsRunning] = useState(false);
  const [time, setTime] = useState(0);

  const formattedTime = useMemo(() => {
    const minutes = Math.floor((time / 1000 / 60) % 60);
    const seconds = Math.floor((time / 1000) % 60);
    const milliseconds = Math.floor((time % 1000) / 10);

    return {
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: milliseconds.toString().padStart(2, "0"),
    };
  }, [time]);

  useEffect(() => {
    if (isActive) {
      setTitle(`${formattedTime.minutes}:${formattedTime.seconds}.${formattedTime.milliseconds}`);
    } else {
      setTitle(null);
    }
  }, [isActive, setTitle, formattedTime]);

  useInterval(
    () => {
      setTime((time) => time + 10);
    },
    isActive && isRunning,
    10,
  );

  useKeyPress([" "], {
    onKeyDown: {
      fn: (event) => {
        event.preventDefault();
        if (isActive && isRunning) {
          setIsRunning(false);
        } else {
          setIsActive(true);
          setIsRunning(true);
        }
      },
    },
  });

  useKeyPress(["r"], {
    onKeyDown: {
      fn: (event) => {
        event.preventDefault();
        reset();
      },
    },
  });

  const reset = () => {
    setIsActive(false);
    setIsRunning(false);
    setTime(0);
    setTitle(null);
  };

  return (
    <Main>
      <Card
        className={clsx(
          "relative before:absolute before:inset-0 before:-z-1",
          isActive && "before:shadow-primary",
          isActive && "before:animate-twPulse before:shadow-2xl before:animate-infinite",
        )}
      >
        <CardBody className={"flex flex-col items-center justify-center"}>
          <p className={"mb-4 font-mono font-bold"}>
            <span className={"text-[3rem]"}>{`${formattedTime.minutes}:`}</span>
            <span className={"text-[3rem]"}>{`${formattedTime.seconds}`}</span>
            <span className={"text-xs"}>{`.${formattedTime.milliseconds}`}</span>
          </p>
          <div className={"-m-4 flex flex-wrap items-center justify-center"}>
            <Button
              className={"m-4 uppercase"}
              onClick={() => {
                if (!isActive) {
                  setIsActive(true);
                  setIsRunning(true);
                } else {
                  setIsRunning(!isRunning);
                }
              }}
            >
              {isRunning ? (
                <>
                  <IconPlayerPause className={"mr-1"} size={"1em"} aria-hidden />
                  Stop
                </>
              ) : (
                <>
                  <IconPlayerPlay className={"mr-1"} size={"1em"} aria-hidden />
                  Start
                </>
              )}
            </Button>
            {isActive && (
              <Button className={"m-4 uppercase"} onClick={reset}>
                Reset
              </Button>
            )}
          </div>
        </CardBody>
      </Card>
    </Main>
  );
}
