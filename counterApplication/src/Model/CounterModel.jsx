import { useState, useEffect } from "react";
import CounterIntent from "../intent/CounterIntent";

const CounterModel = () => {
  const [count, setCount] = useState(0);
  const [autoIncrement, setAutoIncrement] = useState(false);

  useEffect(() => {
    let interval;
    if (autoIncrement) {
      interval = setInterval(() => {
        setCount((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [autoIncrement]);

  const actions = {
    [CounterIntent.INCREMENT]: () => setCount((prev) => prev + 1),
    [CounterIntent.DECREMENT]: () => setCount((prev) => Math.max(prev - 1, 0)),
    [CounterIntent.RESET]: () => setCount(0),
    [CounterIntent.TOGGLE_AUTO]: () => setAutoIncrement((prev) => !prev),
  };

  const handleIntent = (intent) => {
    const action = actions[intent];
    if (action) {
      action();
    }
  };

  return { count, autoIncrement, handleIntent };
};

export default CounterModel;
