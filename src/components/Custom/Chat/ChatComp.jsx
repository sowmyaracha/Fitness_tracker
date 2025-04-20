import React, { useState, useEffect, useRef } from "react";
import useAuth from "../../../hooks/useAuth";

const ChatComp = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [conversations, setConversations] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const { auth } = useAuth();
  const messagesEndRef = useRef(null);
  const currUser = JSON.parse(auth.user);

  const currId = currUser.id;
  useEffect(() => {
    scrollToBottom();
  }, [messages, selectedUser]);
  useEffect(() => {
    fetchConversations();
    fetchUsers();
  }, []);
  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
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

  const fetchConversations = async () => {
    try {
      const response = await fetch(`${apiUrl}/api/common/get-last-message`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });
      const data = await response.json();
      setConversations(data);
      console.log("Conversations", data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const fetchConversation = async (userId) => {
    if (!userId) {
      console.error("User ID is required for fetching conversation");
      return;
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
      setMessages(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !selectedUser) return;

    const newMessage = {
      receiver_id: String(selectedUser.id),
      content: inputMessage,
    };

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
      await fetchConversations();
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  const updateUnreadMessagesToRead = (userId) => {
    // Update unread messages to "read" when conversation is opened
    setConversations((prevConversations) =>
      prevConversations.map((conv) =>
        conv.receiver.id === userId ? { ...conv, unreadMessages: 0 } : conv
      )
    );
  };

  const handleUserClick = (user) => {
    setSearchQuery("");
    setShowAutocomplete(false);
    setSelectedUser(user);
    fetchConversation(user.id);
    updateUnreadMessagesToRead(user.id);
  };

  const filteredUsers = searchQuery.trim()
    ? users.filter(
        (user) =>
          user.first_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.email.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar with user list */}
          <div className="col-xl-3 col-lg-4">
            <div className="card">
              <div className="card-body">
                <h5 className="mb-0">Chats</h5>
                <hr />
                {/* Search input */}
                <div className="search-container position-relative mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search User"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setShowAutocomplete(true);
                    }}
                    onFocus={() => setShowAutocomplete(true)}
                  />
                  {/* Autocomplete dropdown */}
                  {showAutocomplete && filteredUsers.length > 0 && (
                    <div className="autocomplete-dropdown">
                      {filteredUsers.map((user) => (
                        <div
                          key={user.id}
                          className="autocomplete-item d-flex align-items-center py-2 cursor-pointer border-bottom"
                          onClick={() => handleUserClick(user)}
                        >
                          <img
                            src={
                              user.profilePic ||
                              "/assets/images/profile/download.png"
                            }
                            alt={user.first_name}
                            className="rounded-circle shadow-sm border border-dark me-2"
                            width="40"
                          />
                          <div className="ms-3">
                            <h6 className="mb-0">{user.first_name}</h6>
                            <p className="mb-0 text-muted">{user.email}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Displaying conversations */}
                <div
                  className="chat-list"
                  style={{ height: "60vh", overflowY: "auto" }}
                >
                  {conversations.map((conv) => (
                    <div
                      key={conv.id}
                      className="chat-user d-flex align-items-center py-3 border-bottom"
                      onClick={() => handleUserClick(conv.receiver)}
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={
                          conv.receiver.profilePic ||
                          "/assets/images/profile/download.png"
                        }
                        alt={conv.receiver.first_name}
                        className="rounded-circle shadow-sm border border-dark"
                        width="40"
                      />
                      <div className="ms-3 flex-grow-1">
                        <h6 className="mb-0">{conv.receiver.first_name}</h6>
                        <p className="mb-0 text-muted text-truncate">
                          {conv.content}
                        </p>
                      </div>
                      <div className="d-flex flex-column align-items-end">
                        <small className="text-muted">
                          {new Date(conv.created_at).toLocaleDateString()}
                        </small>
                        {conv.unreadMessages > 0 && (
                          <span className="badge bg-primary mt-1">
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
                      src={
                        selectedUser.profilePic ||
                        "/assets/images/profile/download.png"
                      }
                      alt={selectedUser.first_name}
                      className="rounded-circle shadow-sm border border-dark"
                      width="40"
                    />
                    <h6 className="mb-0 ms-3">{selectedUser.first_name}</h6>
                  </div>
                )}
              </div>

              {/* Chat messages */}
              {/* <div
                className="card-body"
                style={{ height: "400px", overflowY: "auto" }}
              >
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`chat-message ${
                      message.sender_id === selectedUser.id
                        ? "text-start"
                        : "text-end"
                    } py-3`}
                  >
                    <p className="mb-2">
                      <img
                        src={
                          message.sender_id === selectedUser.id
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
              </div> */}
              <div
                className="card-body "
                style={{
                  height: "400px",
                  overflowY: "auto",
                  scrollBehavior: "smooth",
                }}
              >
                {Array.isArray(messages) &&
                  messages.map((message, index) => {
                    const isSender = parseInt(message.sender_id) === currId; // Compare with selectedUser ID to check if the current message is from the logged-in user
                    return (
                      <div
                        key={index}
                        className={`chat-message py-3 ${
                          isSender ? "text-end" : "text-start"
                        }`}
                        style={{ display: "flex", flexDirection: "column" }}
                      >
                        <div
                          className={`d-flex ${
                            isSender
                              ? "justify-content-end"
                              : "justify-content-start"
                          }`}
                        >
                          <img
                            src={
                              isSender
                                ? currUser.profilePic
                                : message.sender.profilePic
                            } // Use selectedUser for receiver's pic and auth.user for sender's pic
                            alt={
                              isSender
                                ? currUser.first_name
                                : message.sender.first_name
                            }
                            className={`rounded-circle shadow-sm ${
                              isSender ? "ms-2" : "me-2"
                            }`}
                            width="50"
                            height={50}
                          />
                          <p
                            className={`mb-2 ${
                              isSender ? "text-end" : "text-start"
                            }`}
                            style={{
                              backgroundColor: isSender ? "#f1f1f1" : "#f1f1f1",
                              color: isSender ? "black" : "black",
                              padding: "8px 12px",
                              borderRadius: "20px",
                              maxWidth: "75%",
                            }}
                          >
                            {message.content}
                            <small
                              className="d-block mt-1 text-muted"
                              style={{ fontSize: "0.65rem" }}
                            >
                              {new Date(message.created_at).toLocaleTimeString(
                                [],
                                { hour: "2-digit", minute: "2-digit" }
                              )}
                            </small>
                          </p>
                        </div>
                        <small
                          className={`${
                            isSender ? "text-end" : "text-start"
                          } text-muted`}
                        >
                          {new Date(message.created_at).toLocaleDateString()}
                        </small>
                      </div>
                    );
                  })}
                <div ref={messagesEndRef} />
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

export default ChatComp;
