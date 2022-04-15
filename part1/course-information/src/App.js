const Header = (props) => {
  return <p>{props.course}</p>;
};

const Part = (props) => {
  let [part, exercise] = props.info;
  return (
    <p>
      {part} {exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      <Part info={props.info[0]} />
      <Part info={props.info[1]} />
      <Part info={props.info[2]} />
    </div>
  );
};

const Total = ({ parts }) => {
  let total = parts.reduce((a, c) => a + c[1], 0);
  return <p>Number of exercises {total}</p>;
};

const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  const parts = [
    [part1, exercises1],
    [part2, exercises2],
    [part3, exercises3],
  ];

  return (
    <div>
      <Header course={course} />
      <Content info={parts} />
      <Total parts={parts} />
    </div>
  );
};

export default App;
