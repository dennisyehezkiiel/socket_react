import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./component/Chat";

const socket = io.connect("http://localhost:4001");

function App() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = (e) => {
    e.preventDefault();
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <>
      {!showChat ? (
        <div className="flex h-screen">
          <div className="flex flex-col m-auto">
            <form className="flex justify-center" onSubmit={joinRoom}>
              <div className="flex flex-col space-y-2">
                <div className="flex justify-center">
                  <p className="text-2xl font-bold">Join a chat</p>
                </div>
                <input
                  type="text"
                  placeholder="Name"
                  className="border-green-300 border-2 rounded-md p-4"
                  onChange={(event) => setUsername(event.target.value)}
                />
                <input
                  type="text"
                  placeholder="Room ID"
                  className="border-green-300 border-2 rounded-md p-4"
                  onChange={(event) => setRoom(event.target.value)}
                />
                <button
                  className="bg-green-400 p-2 rounded-md shadow-md shadow-green-600/50 hover:shadow-green-500/50 hover:bg-green-300 text-white font-bold"
                  type="submit"
                >
                  Let's Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      ) : (
        <Chat socket={socket} username={username} room={room} />
      )}
    </>
  );
}

export default App;
