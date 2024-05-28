import { ReactNode, createContext, useContext, useReducer } from "react";

export type Timer = {
  name: string;
  duration: number;
};
type TimersState = {
  isRunning: boolean;
  timer: Timer[];
};
const initialValue: TimersState = {
  isRunning: true,
  timer: [],
};
type TimerContextValue = TimersState & {
  AddTimer: (timerData: Timer) => void;
  StartTimer: () => void;
  StopTimer: () => void;
};
export const TimerContext = createContext<TimerContextValue | null>(null);
type TimerProviderProps = {
  children: ReactNode;
};
type AddTimerAction = {
  type: "ADD_TIMER";
  payload: Timer;
};
type StartTimerAction = {
  type: "START_TIMER";
};
type StopTimerAction = {
  type: "STOP_TIMER";
};
type Action = StartTimerAction | StopTimerAction | AddTimerAction;
function timersReducer(state: TimersState, action: Action): TimersState {
  if (action.type === "START_TIMER") {
    return {
      ...state,
      isRunning: true,
    };
  }
  if (action.type === "STOP_TIMER") {
    return {
      ...state,
      isRunning: false,
    };
  }
  if (action.type === "ADD_TIMER") {
    return {
      ...state,
      timer: [
        ...state.timer,
        { name: action.payload.name, duration: action.payload.duration },
      ],
    };
  }
  return state;
}
export default function TimerContextProvider(prop: TimerProviderProps) {
  const [timersState, dispatch] = useReducer(timersReducer, initialValue);
  const ctx: TimerContextValue = {
    isRunning: timersState.isRunning,
    timer: timersState.timer,
    AddTimer(timerData) {
      dispatch({ type: "ADD_TIMER", payload: timerData });
    },
    StopTimer() {
      dispatch({ type: "STOP_TIMER" });
    },
    StartTimer() {
      dispatch({ type: "START_TIMER" });
    },
  };
  return (
    <TimerContext.Provider value={ctx}>{prop.children}</TimerContext.Provider>
  );
}
export function UseTimersContext() {
  const timerCtx = useContext(TimerContext);
  if (timerCtx === null) {
    throw new Error("Timers context is null");
  }
  return timerCtx;
}
