import { Part } from "./Part";

export const Content = ({ parts }) => {
  return (
    <div>
      {parts.map((part, index) => (
        <Part key={part.id} part={part} />
      ))}
    </div>
  );
};
