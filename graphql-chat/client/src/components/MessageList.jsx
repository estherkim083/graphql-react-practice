import { useEffect, useRef } from "react";

function MessageList({ user, messages }) {
  const containerRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      // scroll to bottom to make the last message visible
      container.scrollTo(0, container.scrollHeight);
    }
  }, [messages]);

  return (
    <div ref={containerRef} className="chatbox" style={{ overflowY: "auto" }}>
      {messages.map((message, index) => (
        <MessageRow
          key={message.id}
          index={index === messages.length - 1}
          user={user}
          message={message}
        />
      ))}
    </div>
  );
}

function MessageRow({ user, message, index }) {
  return (
    <div
      className={
        message.from === user.id
          ? "chatbox__messages__sender"
          : "chatbox__messages__receiver"
      }
    >
      <div className="chatbox__messages__user-message">
        <div
          className="chatbox__messages__user-message--ind-message"
          style={index ? { marginBottom: "100px" } : {}}
        >
          <p className="name">{message.from}</p>
          <br />
          <p className="message">{message.text}</p>
        </div>
      </div>
    </div>
  );
}

export default MessageList;
