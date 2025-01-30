import CounterIntent from "../intent/CounterIntent";
import CounterModel from "../Model/CounterModel";
import "./Counter.css"; // Add this line to import the CSS file

const Counter = () => {
  const { count, autoIncrement, handleIntent } = CounterModel();

  return (
    <div>
      <div className="counter-container">
        <h1>Counter: {count}</h1>
        <div>
          <button onClick={() => handleIntent(CounterIntent.INCREMENT)}>
            +
          </button>
          <button onClick={() => handleIntent(CounterIntent.RESET)}>
            Reset
          </button>
          <button onClick={() => handleIntent(CounterIntent.DECREMENT)}>
            -
          </button>
        </div>
        <div className="auto-toggle">
          <button onClick={() => handleIntent(CounterIntent.TOGGLE_AUTO)}>
            {autoIncrement ? "Stop Auto Increment" : "Start Auto Increment"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Counter;
