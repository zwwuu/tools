"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { IconPointer } from "@tabler/icons-react";
import clsx from "clsx";

import { ENGINES } from "~/app/r/lmstfy/data";
import Anchor from "~/components/Anchor";
import Heading from "~/components/Typography/Heading";
import { tools } from "~/data/tools/base";
import seo from "~/lib/seo";

export default function LmstfyPage() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const submitRef = useRef<HTMLButtonElement | null>(null);
  const [step, setStep] = useState(0);
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");
  const [engine, setEngine] = useState<(typeof ENGINES)[keyof typeof ENGINES]>(ENGINES.google);
  const [redirect, setRedirect] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      if (searchRef.current && cursorRef.current && submitRef.current) {
        await move(cursorRef.current, searchRef.current);
        searchRef.current.focus();
        for (const letter of query) {
          await new Promise((resolve) => setTimeout(resolve, Math.random() * 200 + 100));
          searchRef.current.value += letter;
          searchRef.current.scrollLeft = searchRef.current.scrollWidth;
        }
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStep(step + 1);
        await move(cursorRef.current, submitRef.current);
        submitRef.current.focus();
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStep(step + 1);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        setStep(step + 1);
        await new Promise((resolve) => setTimeout(resolve, 1000));

        if (redirect) {
          submitRef.current.click();
        }
      }
    })();
  }, [searchParams]);

  useEffect(() => {
    const q = searchParams.get("q");
    if (q) {
      const params = Buffer.from(q, "base64").toString();
      const query = JSON.parse(params);
      setQuery(query.q);
      setEngine(query.engine ? ENGINES[query.engine as keyof typeof ENGINES] || ENGINES.google : ENGINES.google);
      setRedirect(query.redirect);
      setMessage(query.message);
    }
  }, [searchParams]);

  const move = (cursor: HTMLDivElement, target: HTMLElement) => {
    return new Promise((resolve) => {
      const diffX = target.getBoundingClientRect().left + target.clientWidth / 2 - cursor.getBoundingClientRect().left;
      const diffY = target.getBoundingClientRect().top + target.clientHeight / 2 - cursor.getBoundingClientRect().top;

      const steps = 60;
      const stepX = diffX / steps;
      const stepY = diffY / steps;

      let step = 0;
      const interval = setInterval(frame, 1000 / 60);

      function frame() {
        if (step >= steps) {
          clearInterval(interval);
          resolve(undefined);
        } else {
          step++;
          cursor.style.top = (parseFloat(cursor.style.top) || 0) + stepY + "px";
          cursor.style.left = (parseFloat(cursor.style.left) || 0) + stepX + "px";
        }
      }
    });
  };

  return (
    <div className={"container relative"}>
      <div ref={cursorRef} className="absolute left-0 top-0">
        <IconPointer aria-hidden />
      </div>
      <div className="space-y-4">
        <Anchor href={engine.url} title={engine.name} prefetch={false} rel="noopener noreferrer" target="_blank">
          <Image src={engine.logo.src} alt={engine.name} width={engine.logo.width} height={engine.logo.height} />
        </Anchor>
        <form
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <input className={clsx("block w-full", engine.inputClassNames)} type="text" ref={searchRef} />
          <button className={clsx("item-center inline-flex", engine.submitClassNames)} type="submit" ref={submitRef}>
            {engine.submit}
          </button>
        </form>

        {step === 0 && (
          <div role="alert">
            <Heading as="h2">Step 1</Heading>
            <p>
              Visit{" "}
              <Anchor href={engine.url} isExternal prefetch={false}>
                {engine.url}
              </Anchor>{" "}
              on your browser.
            </p>
          </div>
        )}

        {step === 1 && (
          <div role="alert">
            <Heading as="h2">Step 2</Heading>
            <p>Type your question</p>
          </div>
        )}

        {step === 2 && (
          <div role="alert">
            <Heading as="h2">Step 3</Heading>
            <p>
              Click on the <em>{}</em> button
            </p>
          </div>
        )}

        {step === 3 && (
          <div role="alert">
            <Heading as="h2">Message from sender</Heading>
            <blockquote>
              <p>{message}</p>
            </blockquote>
          </div>
        )}
      </div>
    </div>
  );
}
