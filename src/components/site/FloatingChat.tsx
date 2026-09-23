import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Phone, Calendar, CheckCircle2, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { createChatSession, sendChatMessage, getChatSessionById, ChatMessage } from "@/lib/leads-store";
import { toast } from "sonner";
import logoImg from "@/assets/logo-mark.png";
import { useLanguage } from "@/hooks/useLanguage";
import { SITE_CONFIG } from "@/config/site-config";

export function FloatingChat() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socketRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 1. Retrieve localStorage session ONLY when user opens chat (not on page load)
  useEffect(() => {
    if (!isOpen) return; // don't fetch until the chat is opened
    const storedId = localStorage.getItem("southern-chat-session-id");
    const storedName = localStorage.getItem("southern-chat-client-name");
    const storedEmail = localStorage.getItem("southern-chat-client-email");
    if (storedId && !sessionId) {
      setSessionId(storedId);
      if (storedName) setName(storedName);
      if (storedEmail) setEmail(storedEmail);

      // Load conversation history from database — only on first open
      getChatSessionById(storedId).then((session) => {
        if (session) {
          setMessages(session.messages || []);
        }
      });
    }
  }, [isOpen]);

  // 2. Establish Socket.io connection when session is active
  useEffect(() => {
    if (!sessionId) return;

    // Connect to the current window's origin
    const socket = io({
      transports: ["websocket", "polling"],
      autoConnect: true
    });
    socketRef.current = socket;

    // Join room for the session
    socket.emit("join-session", sessionId);

    // Listen for incoming messages
    socket.on("message", (msg: ChatMessage) => {
      setMessages((prev) => {
        if (prev.some((m) => m.id === msg.id)) return prev;
        return [...prev, msg];
      });
    });

    return () => {
      socket.disconnect();
    };
  }, [sessionId]);

  // 3. Scroll to the bottom of the chat dynamically
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    let activeId = sessionId;
    let clientName = name.trim();
    let clientEmail = email.trim();

    if (!activeId) {
      if (!clientName) {
        toast.error("Please enter your name to start the chat.");
        return;
      }
      if (!clientEmail || !clientEmail.includes("@")) {
        toast.error("Please enter a valid email address to start the chat.");
        return;
      }
    }

    const userText = message.trim();
    const tempId = "msg-client-opt-" + Date.now();
    const tempTimestamp = new Date().toISOString();

    const optimisticMsg: ChatMessage = {
      id: tempId,
      sender: "client",
      text: userText,
      timestamp: tempTimestamp
    };

    // Optimistically show message immediately in chat window so text is never hidden or delayed
    setMessages((prev) => [...prev, optimisticMsg]);
    setMessage("");
    setIsSubmitting(true);

    try {
      if (!activeId) {
        const session = await createChatSession(clientName, "Nashville", clientEmail, "");
        activeId = session.id;
        setSessionId(activeId);
        setName(clientName);
        setEmail(clientEmail);
        localStorage.setItem("southern-chat-session-id", activeId);
        localStorage.setItem("southern-chat-client-name", clientName);
        localStorage.setItem("southern-chat-client-email", clientEmail);

        const tempSocket = socketRef.current || io();
        tempSocket.emit("session-created", { sessionId: activeId, clientName, clientEmail });
      }

      const updatedSession = await sendChatMessage(activeId, "client", userText);
      if (updatedSession) {
        const lastMsg = updatedSession.messages[updatedSession.messages.length - 1];

        if (socketRef.current) {
          socketRef.current.emit("send-message", {
            ...lastMsg,
            sessionId: activeId
          });
        }

        setMessages(updatedSession.messages || []);
      }
    } catch (err) {
      console.error("Failed to send chat message:", err);
      toast.error("Message could not be sent. Please try again.");
      setMessage(userText); // Restore input text
      setMessages((prev) => prev.filter((m) => m.id !== tempId));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem("southern-chat-session-id");
    localStorage.removeItem("southern-chat-client-name");
    localStorage.removeItem("southern-chat-client-email");
    setSessionId(null);
    setName("");
    setEmail("");
    setMessage("");
    setMessages([]);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end pointer-events-none">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="pointer-events-auto mb-4 w-[310px] sm:w-[360px] h-[520px] max-h-[calc(100vh-100px)] bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="shrink-0 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-4 text-white flex justify-between items-center border-b border-amber-500/30">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center select-none overflow-hidden p-1 border-2 border-amber-500 shadow-md">
                    <img src={logoImg} alt="Southern Storm Shelters Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-amber-400 border-2 border-slate-900" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-sm tracking-wide text-white">Storm Shelter Support</span>
                  <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider">Project Consultation · Nashville & 100-Mi Radius</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {sessionId && (
                  <button
                    onClick={handleClearChat}
                    title="Start New Chat"
                    className="text-white/80 hover:text-white transition text-[10px] bg-white/10 hover:bg-white/20 px-2 py-1 rounded cursor-pointer font-bold uppercase tracking-wider"
                  >
                    New Chat
                  </button>
                )}
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition p-1 hover:bg-white/10 rounded-lg cursor-pointer"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Chat Area */}
            <div className="flex-1 min-h-0 p-4 overflow-y-auto bg-slate-50/50 flex flex-col gap-3 overscroll-contain">
              {/* Default Welcome Message */}
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center select-none shrink-0 overflow-hidden p-0.5 border border-slate-200 shadow-sm">
                  <img src={logoImg} alt="Southern Logo" className="w-full h-full object-contain" />
                </div>
                <div className="bg-white border border-slate-200/80 rounded-2xl rounded-tl-none p-3 shadow-sm text-left max-w-[82%]">
                  <p className="text-xs text-slate-800 font-semibold leading-relaxed">
                    {t(
                      "Hi! Welcome to Southern Storm Shelters LLC. We protect families across Nashville, TN and a 100-mile radius with engineered underground shelters. How can we help you today?",
                      "¡Hola! Bienvenido a Southern Storm Shelters LLC. Protegemos a las familias en Nashville, TN y un radio de 100 millas con refugios subterráneos certificados. ¿Cómo podemos ayudarle hoy?"
                    )}
                  </p>
                </div>
              </div>

              {/* Dynamic Conversation Messages */}
              {messages.map((msg) => {
                const isAdmin = msg.sender === "admin";
                return (
                  <div
                    key={msg.id}
                    className={`flex gap-2.5 items-start ${isAdmin ? "" : "flex-row-reverse"}`}
                  >
                    {isAdmin ? (
                      <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center select-none shrink-0 overflow-hidden p-0.5 border border-slate-200 shadow-sm">
                        <img src={logoImg} alt="Southern Logo" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-amber-600 border border-amber-500 flex items-center justify-center select-none shrink-0 text-[10px] font-black text-white capitalize">
                        {name.charAt(0) || "V"}
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-3 shadow-sm text-left max-w-[80%] border ${
                        isAdmin
                          ? "bg-white border-slate-200 text-slate-900 rounded-tl-none"
                          : "bg-gradient-to-r from-amber-600 to-amber-700 text-white border-amber-600 rounded-tr-none"
                      }`}
                    >
                      <p className="text-xs font-semibold leading-relaxed whitespace-pre-wrap break-words">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Form Actions */}
            <div className="shrink-0 px-4 pb-4 pt-2 border-t border-slate-100 bg-white flex flex-col gap-2">
              {!sessionId ? (
                <>
                  <div className="grid grid-cols-1">
                    <a
                      href={`tel:${SITE_CONFIG.phoneRaw}`}
                      className="flex items-center justify-center gap-2 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-xl py-1.5 px-2 text-xs font-extrabold text-amber-900 transition"
                    >
                      <Phone className="h-3.5 w-3.5 text-amber-700 shrink-0" /> Call {SITE_CONFIG.phone}
                    </a>
                  </div>

                  <form onSubmit={handleSend} className="mt-1 flex flex-col gap-1.5">
                    <input
                      type="text"
                      required
                      placeholder="Name *"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                    <input
                      type="email"
                      required
                      placeholder="Email *"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Message *"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 px-3 py-2 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                    />
                    <button
                      type="submit"
                      disabled={isSubmitting || !message.trim() || !name.trim() || !email.trim()}
                      className="w-full mt-0.5 flex items-center justify-center gap-2 py-2 px-3 rounded-xl text-white font-bold text-xs bg-amber-600 hover:bg-amber-700 transition disabled:opacity-50 cursor-pointer shadow-sm"
                    >
                      {isSubmitting ? (
                        <span>Starting Chat...</span>
                      ) : (
                        <>
                          <span>Start Live Chat</span>
                          <Send className="h-3 w-3" />
                        </>
                      )}
                    </button>
                  </form>
                </>
              ) : (
                <form onSubmit={handleSend} className="relative flex items-center">
                  <input
                    type="text"
                    required
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 pl-3 pr-10 py-2.5 text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim()}
                    className="absolute right-1.5 p-2 rounded-lg text-white bg-amber-600 hover:bg-amber-700 transition disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    <Send className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label={isOpen ? "Close Chat" : "Open Chat"}
        className="pointer-events-auto relative h-12 w-12 sm:h-13 sm:w-13 rounded-full bg-gradient-to-br from-amber-500 via-amber-600 to-amber-700 text-white flex items-center justify-center shadow-[0_10px_25px_-5px_rgba(217,119,6,0.5)] hover:shadow-[0_15px_30px_-5px_rgba(217,119,6,0.6)] transition-all duration-300 focus:outline-none select-none cursor-pointer border-2 border-amber-300/40"
      >
        <span className="absolute inset-0 rounded-full bg-amber-500 opacity-25 animate-ping -z-10" />
        {isOpen ? (
          <X className="h-5 w-5 text-white transition-transform duration-200" />
        ) : (
          <div className="relative flex items-center justify-center">
            <MessageCircle className="h-5 w-5 sm:h-6 sm:w-6 text-white fill-white/15 transition-transform duration-200" />
            <span className="absolute -top-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400 border-2 border-amber-600" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
