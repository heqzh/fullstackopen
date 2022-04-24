export const Total = ({ parts }) => {
  let total = parts.reduce((a, c) => a + c.exercises, 0);
  return <b>total of {total} exercises</b>;
};
