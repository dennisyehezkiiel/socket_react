import React, { useEffect, useState } from "react";
import { AiOutlineArrowUp } from "react-icons/ai";

function Chat({ socket, username, room }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [message, setMessage] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessage((list) => [...list, messageData]);
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessage((list) => [...list, data]);
    });
  }, [socket]);

  console.log(message);

  return (
    <>
      <div className="flex justify-center h-screen">
        <div className="flex flex-col m-auto w-1/4">
          <div className="chat-header">
            <div className="flex justify-center bg-zinc-900 text-white font-semibold py-2 rounded-t-md">
              <p>Chat Room: {room}</p>
            </div>
          </div>

          <div className="chat-body">
            <div className="fixed w-1/4 flex-col border-2 h-64 overflow-auto">
              {message.map((el, index) => (
                <div
                  key={index}
                  className={
                    username === el.author
                      ? "flex justify-end mr-2"
                      : "flex justify-start ml-2"
                  }
                >
                  <div className="flex flex-col">
                    <div
                      className={
                        username === el.author
                          ? "bg-green-500 w-fit p-2 my-1 rounded-md"
                          : "flex flex-row bg-blue-500 w-fit p-2 my-1 rounded-md"
                      }
                    >
                      <p className="text-xs text-white">{el.message}</p>
                    </div>
                    <div
                      className={
                        username === el.author
                          ? "flex justify-end flex-row space-x-1 pb-2"
                          : "flex justify-start flex-row space-x-1 pb-2"
                      }
                    >
                      <p className="text-xs">{el.time}</p>
                      <p className="text-xs font-bold">{el.author}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="chat-footer py-64">
            <div className="flex justify-between border-2 p-2 rounded-b-md">
              <input
                type="text"
                className="focus:outline-none text-xs w-full"
                placeholder="This is your message"
                onChange={(event) => setCurrentMessage(event.target.value)}
              />
              <button onClick={sendMessage}>
                <AiOutlineArrowUp />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Chat;
