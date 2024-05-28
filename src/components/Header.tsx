import { UseTimersContext } from "../Store/Timer_context.tsx";
import Button from "./UI/Button.tsx";

export default function Header() {
  const { isRunning, StartTimer, StopTimer } = UseTimersContext();
  return (
    <header>
      <h1>ReactTimer</h1>

      <Button onClick={isRunning ? StopTimer : StartTimer}>
        {isRunning ? "Running" : "Stop"} Timers
      </Button>
    </header>
  );
}
