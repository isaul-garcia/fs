import React from "react"

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
  marginBottom: 10,
};

const Notification = ({ notification }) => {
  return (
    <>
      {notification ?
        <div style={style}>{notification}</div>
        :
        null}
    </>
  );
};

export default Notification;