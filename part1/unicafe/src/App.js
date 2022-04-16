import { useState } from "react";

const Button = ({ feedback, state, setState }) => {
  return <button onClick={() => setState(state + 1)}>{feedback}</button>;
};

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ state }) => {
  let all = state.good + state.neutral + state.bad;
  let average = (state.good * 1 + 0 + state.bad * -1) / all;
  let positive = (state.good / all) * 100;

  if (!all) return <div>No feedback given</div>;

  return (
    <table>
      <tbody>
        <StatisticLine text={"good"} value={state.good} />
        <StatisticLine text={"neutral"} value={state.neutral} />
        <StatisticLine text={"bad"} value={state.bad} />
        <StatisticLine text={"all"} value={all} />
        <StatisticLine text={"average"} value={average} />
        <StatisticLine text={"positive"} value={positive + " %"} />
      </tbody>
    </table>
  );
};

function App() {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  let statistics = { good, neutral, bad };

  return (
    <>
      <h1>give feedback</h1>
      <Button feedback="good" state={good} setState={setGood} />
      <Button feedback="neutral" state={neutral} setState={setNeutral} />
      <Button feedback="bad" state={bad} setState={setBad} />
      <h2>statistics</h2>
      <Statistics state={statistics} />
    </>
  );
}

export default App;
