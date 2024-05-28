import { UseTimersContext } from "../Store/Timer_context";
import Timer from "./Timer";

export default function Timers() {
  const { timer } = UseTimersContext();
  return (
    <ul>
      {timer.map((item) => (
        <li key={item.name}>
          <Timer name={item.name} duration={item.duration} />
        </li>
      ))}
    </ul>
  );
}
