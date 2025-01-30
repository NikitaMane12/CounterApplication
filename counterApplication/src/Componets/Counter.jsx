import { useEffect, useState } from "react";
import { BehaviorSubject, interval } from "rxjs";
import { map, takeWhile } from "rxjs/operators";
import "./counter.css";

// Create a BehaviorSubject to store the counter value
const counter$ = new BehaviorSubject(0);

const Counter = () => {
  const [count, setCount] = useState(0);
  const [isAutoIncrement, setIsAutoIncrement] = useState(false);

  useEffect(() => {
    // Subscribe to counter$ and update state
    const subscription = counter$.subscribe(setCount);

    return () => subscription.unsubscribe();
  }, []);

  const incrementCounter = () => {
    if (count < 100) counter$.next(count + 1);
  };

  const decrementCounter = () => {
    if (count > 0) counter$.next(count - 1);
  };

  const resetCounter = () => {
    counter$.next(0);
    setIsAutoIncrement(false);
  };

  const toggleAutoIncrement = () => {
    setIsAutoIncrement((prev) => !prev);
  };

  useEffect(() => {
    let autoIncrementSub;

    if (isAutoIncrement) {
      autoIncrementSub = interval(500)
        .pipe(
          map(() => counter$.value + 1),
          takeWhile((val) => val <= 100)
        )
        .subscribe((val) => counter$.next(val));
    }

    return () => autoIncrementSub?.unsubscribe();
  }, [isAutoIncrement]);

  return (
    <div className="container">
      <h1> Counter App</h1>
      <h2>{count}</h2>
      <button className="decrement" onClick={decrementCounter}>
        Decrement
      </button>
      <button className="increment" onClick={incrementCounter}>
        Increment
      </button>
      <br />
      <button className="reset" onClick={resetCounter}>
        Reset
      </button>
      <br />
      <button className="auto" onClick={toggleAutoIncrement}>
        {isAutoIncrement ? "Stop Auto" : "Start Auto"}
      </button>
    </div>
  );
};

export default Counter;
