import React, { useState, useRef, useEffect } from "react";

const ChatComp = () => {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hi! I'm your AI fitness coach 💪 Ask me anything about workouts, diet, nutrition, or fitness goals!",
    },
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || loading) return;

    const userMessage = { role: "user", content: inputMessage };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInputMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.3-70b-versatile",
          messages: [
            {
              role: "system",
              content: "You are an expert AI fitness coach and nutritionist. Help users with workout plans, diet advice, nutrition tips, exercise techniques, and fitness goals. Keep responses concise, friendly, and motivating. Use emojis occasionally.",
            },
            ...updatedMessages.map((m) => ({ role: m.role, content: m.content })),
          ],
          max_tokens: 500,
        }),
      });

      const data = await response.json();
      const aiMessage = {
        role: "assistant",
        content: data.choices[0].message.content,
      };
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I encountered an error. Please try again!" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="content-body">
      <div className="container-fluid">
        <div className="row justify-content-center">
          <div className="col-xl-8 col-lg-10">
            <div className="card" style={{ borderRadius: "16px", overflow: "hidden" }}>
              <div className="card-header d-flex align-items-center" style={{ background: "linear-gradient(135deg, #4CAF50, #45a049)", padding: "16px 20px" }}>
                <div style={{ width: 45, height: 45, borderRadius: "50%", background: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginRight: 12 }}>🤖</div>
                <div>
                  <h5 className="mb-0 text-white fw-bold">AI Fitness Coach</h5>
                  <small className="text-white-50">Powered by Groq AI</small>
                </div>
                <span className="ms-auto badge" style={{ background: "#81C784", color: "white", padding: "6px 12px", borderRadius: 20 }}>● Online</span>
              </div>

              <div className="card-body" style={{ height: "500px", overflowY: "auto", background: "#f8f9fa", padding: "20px", display: "flex", flexDirection: "column", gap: "12px" }}>
                {messages.map((message, index) => (
                  <div key={index} style={{ display: "flex", justifyContent: message.role === "user" ? "flex-end" : "flex-start", alignItems: "flex-end", gap: 8 }}>
                    {message.role === "assistant" && (
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #4CAF50, #45a049)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>🤖</div>
                    )}
                    <div style={{ maxWidth: "75%", padding: "12px 16px", borderRadius: message.role === "user" ? "18px 18px 4px 18px" : "18px 18px 18px 4px", background: message.role === "user" ? "linear-gradient(135deg, #4CAF50, #45a049)" : "white", color: message.role === "user" ? "white" : "#333", boxShadow: "0 2px 8px rgba(0,0,0,0.08)", fontSize: "0.9rem", lineHeight: 1.5, whiteSpace: "pre-wrap" }}>
                      {message.content}
                    </div>
                    {message.role === "user" && (
                      <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#e0e0e0", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>👤</div>
                    )}
                  </div>
                ))}
                {loading && (
                  <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
                    <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #4CAF50, #45a049)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16 }}>🤖</div>
                    <div style={{ padding: "12px 16px", borderRadius: "18px 18px 18px 4px", background: "white", boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}>
                      <div style={{ display: "flex", gap: 4 }}>
                        {[0,1,2].map((i) => (
                          <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: "#4CAF50", animation: "bounce 1.2s infinite", animationDelay: `${i * 0.2}s` }} />
                        ))}
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              <div style={{ padding: "10px 20px", background: "white", borderTop: "1px solid #f0f0f0" }}>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {["💪 Leg workout", "🥗 High protein meal", "🔥 Lose weight fast", "😴 Recovery tips"].map((suggestion) => (
                    <button key={suggestion} onClick={() => setInputMessage(suggestion.split(" ").slice(1).join(" "))} style={{ padding: "4px 12px", borderRadius: 20, border: "1px solid #4CAF50", background: "white", color: "#4CAF50", fontSize: "0.8rem", cursor: "pointer" }}>
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>

              <div className="card-footer" style={{ background: "white", padding: "16px 20px" }}>
                <form onSubmit={handleSendMessage}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <input type="text" className="form-control" placeholder="Ask me about workouts, diet, nutrition..." value={inputMessage} onChange={(e) => setInputMessage(e.target.value)} disabled={loading} style={{ borderRadius: 25, padding: "10px 18px", border: "1px solid #e0e0e0" }} />
                    <button type="submit" disabled={loading || !inputMessage.trim()} style={{ width: 46, height: 46, borderRadius: "50%", background: loading ? "#ccc" : "linear-gradient(135deg, #4CAF50, #45a049)", border: "none", color: "white", fontSize: 18, cursor: loading ? "not-allowed" : "pointer", flexShrink: 0 }}>➤</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes bounce { 0%, 60%, 100% { transform: translateY(0); } 30% { transform: translateY(-6px); } }`}</style>
    </div>
  );
};

export default ChatComp;
