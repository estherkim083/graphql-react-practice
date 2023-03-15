function MessageInput({ onSend }) {
  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      onSend(event.target.value);
      event.target.value = "";
    }
  };

  return (
    <div className="chatbox-input">
      <div className="control">
        <div className="chatbox-input-form">
          <input
            type="text"
            placeholder="Enter your message"
            onKeyDown={handleKeyPress}
          />
        </div>
      </div>
    </div>
  );
}

export default MessageInput;
