const successStyle = {
  backgroundColor: "chartreuse",
  padding: ".5rem",
  fontSize: "20px",
};

const failureStyle = {
  backgroundColor: "red",
  padding: ".5rem",
  fontSize: "20px",
};

export const Notification = ({ notification }) => {
  if (!notification) return;
  const { message, success } = notification;
  return <div style={success ? successStyle : failureStyle}>{message}</div>;
};
