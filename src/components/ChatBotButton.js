import React, { useState, useEffect, useRef } from "react";
import notificationSound from "../assets/notification.mp3";

import axios from "axios";
const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY;
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "llama-3.1-8b-instant";
const systemMessage = {
    role: "system",
    content: `
You are a helpful assistant for CasinoTree, an affiliate website that provides 
real-time information about online casinos. Your role is to answer user queries 
about casinos, games, bonuses, and promotions. Provide concise, accurate, 
and friendly answers under 80 words. Include details about bonuses if relevant. 

Contact info for support:
Email: support@casinotree.com
Phone: +44 7537 105417

Always keep responses professional but approachable, suitable for users looking 
for casino reviews, bonuses, and latest offers.
`
};

const ChatBotButton = () => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const [userInteracted, setUserInteracted] = useState(false);
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi! How can I help you?", sender: "bot" },
    ]);
    const [input, setInput] = useState("");

    const lastMessagesLength = useRef(messages.length);

    useEffect(() => {
        const handleUserInteract = () => {
            if (!userInteracted) {
                setUserInteracted(true);
                setShowNotification(true);
                const audio = new Audio(notificationSound);
                audio.play().catch(() => { });
                setTimeout(() => setShowNotification(false), 8000);
            }
        };

        document.addEventListener("click", handleUserInteract);
        document.addEventListener("keydown", handleUserInteract);
        document.addEventListener("scroll", handleUserInteract);

        return () => {
            document.removeEventListener("click", handleUserInteract);
            document.removeEventListener("keydown", handleUserInteract);
            document.removeEventListener("scroll", handleUserInteract);
        };
    }, [userInteracted]);


    useEffect(() => {
        const lastMessage = messages[messages.length - 1];
        if (lastMessage && lastMessage.sender === "bot" && messages.length > lastMessagesLength.current) {
            const audio = new Audio(notificationSound);
            audio.play().catch(() => { });
            setShowNotification(true);
            setTimeout(() => setShowNotification(false), 5000);
        }
        lastMessagesLength.current = messages.length;
    }, [messages]);

    const handleToggleChat = () => {
        setOpen(!open);
        if (!open) setShowNotification(false);
    };

    const formatAIReply = (text) => {
        if (!text) return "";

        // Split by double line breaks for paragraphs
        const paragraphs = text.split(/\n{2,}/).map(p => p.trim()).filter(p => p);

        // Within each paragraph, split by lines or "•" for bullets
        return paragraphs.map(paragraph => {
            const lines = paragraph.split(/\n|•/).map(l => l.trim()).filter(l => l);
            if (lines.length > 1) {
                return lines.map(line => `• ${line}`).join("\n"); // bullets
            }
            return paragraph; // single line paragraph
        }).join("\n\n"); // separate paragraphs
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = { id: Date.now(), text: input, sender: "user" };
        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setLoading(true);

        try {
            const fullHistory = [...messages, userMessage];
            const groqMessages = fullHistory.map(m => ({
                role: m.sender === "user" ? "user" : "assistant",
                content: m.text,
            }));

            const res = await fetch(GROQ_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${GROQ_API_KEY}`,
                },
                body: JSON.stringify({
                    model: MODEL,
                    messages: [systemMessage, ...groqMessages],
                    temperature: 0.7,
                }),
            });

            const data = await res.json();
            let aiReply = data.choices?.[0]?.message?.content || "Sorry, no response received.";

            // Format reply for proper display
            aiReply = formatAIReply(aiReply);

            setMessages(prev => [...prev, { id: Date.now() + 1, text: aiReply, sender: "bot" }]);
        } catch (err) {
            console.error("Groq AI Error:", err);
            setMessages(prev => [
                ...prev,
                { id: Date.now() + 1, text: "Sorry, I couldn't process your message.", sender: "bot" },
            ]);
        }

        setLoading(false);
    };


    return (
        <>
            <div className="fixed bottom-6 right-6 z-[9999]">
                {showNotification && !open && (
                    <div className="absolute -top-20 right-0 w-64 bg-white shadow-lg rounded-2xl p-3 text-sm text-gray-800 animate-slide-in border border-gray-200">
                        Hi! Need help? Click here to chat with us!
                    </div>
                )}

                <button
                    onClick={handleToggleChat}
                    className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 transition-all duration-300"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="white"
                        strokeWidth="2"
                    >
                        <path d="M8 10h.01M12 10h.01M16 10h.01M21 12c0 4.418-4.03 8-9 8a9.77 9.77 0 01-4-.8L3 20l1.1-3.3A7.64 7.64 0 013 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                </button>
            </div>

            {open && (
                <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-3xl shadow-2xl p-4 flex flex-col z-[9999]">
                    {/* Header */}
                    <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
                        <h2 className="text-xl font-bold text-gray-800">Chat Support</h2>
                        <button onClick={() => setOpen(false)} className="text-gray-500 hover:text-gray-700 transition">
                            ✖
                        </button>
                    </div>

                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto px-2 space-y-3">
                        {messages.map(msg => (
                            <div
                                key={msg.id}
                                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                            >
                                <div
                                    className={`max-w-[70%] px-4 py-2 rounded-2xl break-words 
  ${msg.sender === "user"
                                            ? "bg-gradient-to-br from-pink-500 to-red-500 text-white rounded-br-none"
                                            : "bg-gray-100 text-gray-800 rounded-bl-none"}`}
                                >
                                    {msg.text.split("\n").map((line, i) => (
                                        <p key={i}>{line}</p>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Input */}
                    <div className="flex items-center gap-3 mt-3">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && handleSend()}
                            placeholder="Type a message..."
                            className="flex-1 border border-gray-300 rounded-2xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
                        />
                        <button
                            onClick={handleSend}
                            className="bg-gradient-to-br from-pink-500 to-red-500 text-white px-5 py-2 rounded-2xl shadow hover:scale-105 transition-all"
                        >
                            Send
                        </button>
                    </div>
                </div>
            )}

            <style>
                {`
          @keyframes slide-in {
            0% { transform: translateY(10px); opacity: 0; }
            100% { transform: translateY(0); opacity: 1; }
          }
          .animate-slide-in {
            animation: slide-in 0.5s ease-out;
          }

          /* Scrollbar styling */
          ::-webkit-scrollbar {
            width: 6px;
          }
          ::-webkit-scrollbar-thumb {
            background-color: rgba(156, 163, 175, 0.5);
            border-radius: 3px;
          }
        `}
            </style>
        </>
    );
};

export default ChatBotButton;
