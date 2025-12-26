import React, { useState, useEffect } from "react";
import useAuth from "../../../hooks/useAuth";

// A placeholder for the API endpoints

const TestingChat = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const { auth } = useAuth();
  const currId = auth.user.id;
  // const currId = auth.user.id;
  // Fetch conversations (last messages) when the component is mounted
  useEffect(() => {
    fetchConversations();
    fetchUsers();
  }, []);
  const fetchUsers = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/common/get-users`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };
  // Fetch conversations (last messages)
  const fetchConversations = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/common/get-last-message`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      }); // Adjust API endpoint
      const data = await response.json();
      setConversations(data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  // Fetch the conversation messages with a specific user
  const fetchConversation = async (userId) => {
    if (!userId) {
      console.error("User ID is required for fetching conversation");
      return; // Exit the function if userId is undefined or null
    }
    try {
      const response = await fetch(
        `${apiUrl}/api/common/get-convo?user_id=${userId}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },

          credentials: "include",
        }
      );
      const data = await response.json();
      // setMessages(data);
      setMessages(Array.isArray(data) ? data : []);
      console.log("message set", data);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  // Handle sending a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    console.log("Clicked");
    console.log("selected user", selectedUser);
    console.log("input message", inputMessage);
    if (!inputMessage.trim() || !selectedUser) return;

    const newMessage = {
      receiver_id: String(selectedUser.id),
      content: inputMessage,
    };
    console.log("new message", newMessage);
    try {
      const response = await fetch(`${apiUrl}/api/common/send-message`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMessage),
        credentials: "include",
      });

      const data = await response.json();

      // Update the messages state to include the new message
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          id: data.id,
          sender_id: data.sender_id,
          receiver_id: data.receiver_id,
          content: data.content,
          created_at: data.created_at,
          sender: data.sender,
        },
      ]);
      setInputMessage(""); // Reset input message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  // Handle user click to select a conversation
  const handleUserClick = (user) => {
    console.log("user", user);
    setSelectedUser(user);

    fetchConversation(user.id); // Fetch conversation with the selected user
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar with user list */}
          <div className="col-xl-3 col-lg-4">
            <div className="card">
              <div className="card-body">
                <div className="d-flex align-items-center">
                  <h5 className="mb-0">Users</h5>
                </div>
                <hr />
                {/* Displaying list of users */}
                {/* <div className="search-container position-relative mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search users..."
                  />
                
                  <div className="autocomplete-dropdown">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        className="autocomplete-item d-flex align-items-center py-2 cursor-pointer border-bottom"
                        onClick={() =>
                          handleUserClick(conv.receiver, conv.receiver_id)
                        }
                      >
                        <img
                          src={conv.receiver.profilePic}
                          alt={conv.receiver.first_name}
                          className="rounded-circle shadow-sm border border-dark me-2"
                          width="40"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{conv.receiver.first_name}</h6>
                          <p className="mb-0 text-muted">
                            {conv.receiver.email}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div> */}
                <div className="search-container position-relative mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search users..."
                    // onChange={handleSearchChange} // Add a handler for search input
                  />
                  {/* User list */}
                  <div className="autocomplete-dropdown">
                    {users.map((user) => (
                      <div
                        key={user.id}
                        className="autocomplete-item d-flex align-items-center py-2 cursor-pointer border-bottom"
                        onClick={() => handleUserClick(user, user.id)} // Handle user click
                      >
                        <img
                          src={user.profilePic}
                          alt={user.first_name}
                          className="rounded-circle shadow-sm border border-dark me-2"
                          width="40"
                        />
                        <div className="ms-3">
                          <h6 className="mb-0">{user.first_name}</h6>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Displaying conversations */}
                <div
                  className="chat-list"
                  style={{ height: "60vh", overflowY: "auto" }}
                >
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="chat-user d-flex align-items-center py-3 cursor-pointer border-bottom"
                      onClick={() => handleUserClick(conv.receiver)}
                    >
                      <img
                        src={conv.receiver.profilePic}
                        alt={conv.receiver.first_name}
                        className="rounded-circle shadow-sm border border-dark"
                        width="40"
                      />
                      <div className="ms-3 w-50">
                        <h6 className="mb-0">{conv.receiver.first_name}</h6>
                        <p className="mb-0 text-muted text-truncate">
                          {conv.content}
                        </p>
                      </div>
                      {/* <div className="ms-auto">
                        <span className="badge bg-primary">
                          
                          {conv.unreadMessages}
                        </span>
                      </div> */}
                      <div className="ms-auto">
                        {conv.unreadMessages > 0 && (
                          <span className="badge bg-primary">
                            {conv.unreadMessages}
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Chat area */}
          <div className="col-xl-9 col-lg-8">
            <div className="card">
              <div className="card-header">
                {selectedUser && (
                  <div className="d-flex align-items-center">
                    <img
                      src={selectedUser.profilePic}
                      alt={selectedUser.first_name}
                      className="rounded-circle shadow-sm border border-dark"
                      width="40"
                    />
                    <h6 className="mb-0 ms-3">{selectedUser.first_name}</h6>
                  </div>
                )}
              </div>

              {/* Chat messages */}
              <div
                className="card-body"
                style={{ height: "400px", overflowY: "auto" }}
              >
                {Array.isArray(messages) &&
                  messages.map((message, index) => (
                    <div
                      key={index}
                      className={`chat-message ${
                        parseInt(message.sender_id) === selectedUser.id
                          ? "text-start"
                          : "text-end"
                      } py-3`}
                    >
                      <p className="mb-2">
                        <img
                          src={
                            parseInt(message.sender_id) === selectedUser.id
                              ? selectedUser.profilePic
                              : message.sender.profilePic
                          }
                          alt={message.sender_id}
                          className={`rounded-circle ${
                            message.sender_id === currId ? "ms-2" : "me-2"
                          } shadow-sm`}
                          width="30"
                        />
                        {message.content}
                      </p>
                      <small className="text-muted">
                        {new Date(message.created_at).toLocaleDateString()}
                      </small>
                    </div>
                  ))}
              </div>

              {/* Message input */}
              <div className="card-footer">
                <form onSubmit={handleSendMessage}>
                  <div className="input-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                      <i className="fas fa-paper-plane"></i>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestingChat;
