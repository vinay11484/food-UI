import { createContext, useEffect, useState } from "react";
const TimerContext = createContext({
  timer: new Date().toLocaleTimeString(),
});

const TimerContextProvider = ({ children }) => {
  const [timer, setTimer] = useState(new Date().toLocaleTimeString());
  useEffect(() => {
    const timerId = setInterval(() => {
      setTimer(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  return (
    <TimerContext.Provider value={{ timer }}>{children}</TimerContext.Provider>
  );
};

export default TimerContext;
export { TimerContextProvider };
