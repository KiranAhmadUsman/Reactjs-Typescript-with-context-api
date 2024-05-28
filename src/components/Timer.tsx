import { useEffect, useRef, useState } from "react";
import {
  UseTimersContext,
  type Timer as TimerProps,
} from "../Store/Timer_context.tsx";
import Container from "./UI/Container.tsx";

export default function Timer(prop: TimerProps) {
  const interval = useRef<number | null>(null);
  const [remainingTime, setRemainingState] = useState(prop.duration * 1000);
  const { isRunning } = UseTimersContext();
  if (remainingTime <= 0 && interval.current) {
    clearInterval(interval.current);
  }
  useEffect(() => {
    let timer: number;
    if (isRunning) {
      timer = setInterval(() => {
        setRemainingState((pre) => pre - 50);
      }, 50);
      interval.current = timer;
    } else if (interval.current) {
      clearInterval(interval.current);
    }

    return () => clearInterval(timer);
  }, [isRunning]);
  const formattedRemainingTime = (remainingTime / 1000).toFixed(2);
  return (
    <Container as="article">
      <h2>{prop.name}</h2>
      <p>
        <progress max={prop.duration * 1000} value={remainingTime} />
      </p>
      <p>{formattedRemainingTime}</p>
    </Container>
  );
}
