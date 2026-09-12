import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, Phone, Calendar, CheckCircle2, Shield } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { io } from "socket.io-client";
import { createChatSession, sendChatMessage, getChatSessionById, ChatMessage } from "@/lib/leads-store";
import { toast } from "sonner";
import logoImg from "@/assets/logo-mark.png";
import { useLanguage } from "@/hooks/useLanguage";

export function FloatingChat() {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [name, setName] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const socketRef = useRef<any>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // 1. Retrieve localStorage session on mount
  useEffect(() => {
    const storedId = localStorage.getItem("southern-chat-session-id");
    const storedName = localStorage.getItem("southern-chat-client-name");
    if (storedId) {
      setSessionId(storedId);
      if (storedName) setName(storedName);

      // Load conversation history from database
      getChatSessionById(storedId).then((session) => {
        if (session) {
          setMessages(session.messages || []);
        }
      });
    }
  }, []);

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

    if (!activeId && !clientName) {
      toast.error("Please enter your name to start the chat.");
      return;
    }

    setIsSubmitting(true);

    try {
      if (!activeId) {
        const session = await createChatSession(clientName, "Nashville", "", "");
        activeId = session.id;
        setSessionId(activeId);
        setName(clientName);
        localStorage.setItem("southern-chat-session-id", activeId);
        localStorage.setItem("southern-chat-client-name", clientName);

        const tempSocket = socketRef.current || io();
        tempSocket.emit("session-created", { sessionId: activeId, clientName });
      }

      const updatedSession = await sendChatMessage(activeId, "client", message.trim());
      if (updatedSession) {
        const lastMsg = updatedSession.messages[updatedSession.messages.length - 1];

        if (socketRef.current) {
          socketRef.current.emit("send-message", {
            ...lastMsg,
            sessionId: activeId
          });
        }

        setMessages(updatedSession.messages || []);
        setMessage("");
      }
    } catch (err) {
      console.error("Failed to send chat message:", err);
      toast.error("Message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClearChat = () => {
    localStorage.removeItem("southern-chat-session-id");
    localStorage.removeItem("southern-chat-client-name");
    setSessionId(null);
    setName("");
    setMessages([]);
    setIsOpen(false);
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
            className="pointer-events-auto mb-4 w-[290px] sm:w-[350px] bg-white border border-slate-200 rounded-3xl shadow-[0_20px_50px_-12px_rgba(15,23,42,0.25)] overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-[#0b0f15] via-[#111722] to-[#1e0a0d] p-4 text-white flex justify-between items-center border-b border-red-500/40">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center select-none overflow-hidden p-1 border-2 border-red-500 shadow-md">
                    <img src={logoImg} alt="Southern Storm Shelters Logo" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-[#fbbf24] border-2 border-[#0b0f15] animate-pulse" />
                </div>
                <div className="flex flex-col text-left">
                  <span className="font-extrabold text-sm tracking-wide text-white">Storm Shelter Support</span>
                  <span className="text-[10px] text-red-300 font-bold uppercase tracking-wider">Online · Nashville 100-Mile Dispatch</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {sessionId && (
                  <button
                    onClick={handleClearChat}
                    title="Clear Chat History"
                    className="text-white/70 hover:text-white transition text-[10px] bg-white/10 px-2 py-1 rounded cursor-pointer font-bold uppercase tracking-wider"
                  >
                    Reset
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
            <div className="flex-1 p-4 h-[260px] overflow-y-auto bg-slate-50/50 flex flex-col gap-3">
              {/* Default Welcome Message */}
              <div className="flex gap-2.5 items-start">
                <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center select-none shrink-0 overflow-hidden p-0.5 border border-red-200 shadow-sm">
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
                      <div className="w-7 h-7 rounded-xl bg-white flex items-center justify-center select-none shrink-0 overflow-hidden p-0.5 border border-red-200 shadow-sm">
                        <img src={logoImg} alt="Southern Logo" className="w-full h-full object-contain" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 rounded-full bg-[#dc2626] border border-red-400 flex items-center justify-center select-none shrink-0 text-[10px] font-black text-white capitalize">
                        {name.charAt(0) || "V"}
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-3 shadow-sm text-left max-w-[80%] border ${
                        isAdmin
                          ? "bg-white border-slate-200 text-slate-800 rounded-tl-none"
                          : "bg-gradient-to-r from-[#dc2626] to-[#b91c1c] text-white border-[#dc2626] rounded-tr-none"
                      }`}
                    >
                      <p className="text-xs font-semibold leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                );
              })}
              <div ref={chatEndRef} />
            </div>

            {/* Form Actions */}
            <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-white flex flex-col gap-2">
              {!sessionId && (
                <>
                  <div className="text-[10px] font-black uppercase text-slate-400 tracking-wider text-left pl-1">
                    Direct Contact 24/7
                  </div>
                  <div className="grid grid-cols-1 gap-2">
                    <a
                      href="tel:6159912361"
                      className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 border border-red-200 rounded-xl py-2 px-2 text-xs font-extrabold text-[#dc2626] transition"
                    >
                      <Phone className="h-3.5 w-3.5 text-[#dc2626] shrink-0" /> Call 615-991-2361
                    </a>
                  </div>
                </>
              )}

              <form onSubmit={handleSend} className="mt-1 flex flex-col gap-2">
                {!sessionId && (
                  <input
                    type="text"
                    required
                    placeholder="Your Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-base sm:text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#dc2626] transition"
                  />
                )}
                <div className="relative flex items-center">
                  <input
                    type="text"
                    required
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-slate-50/50 pl-3 pr-10 py-2 text-base sm:text-xs font-semibold focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-[#dc2626] transition"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting || !message.trim() || (!sessionId && !name.trim())}
                    className="absolute right-1.5 p-1.5 rounded-lg text-white bg-[#dc2626] hover:bg-[#b91c1c] transition disabled:opacity-50 cursor-pointer shadow-sm"
                  >
                    <Send className="h-3 w-3" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Trigger Button displaying the logo */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Open Chat"
        className="pointer-events-auto relative h-14 w-14 sm:h-16 sm:w-16 rounded-full bg-gradient-to-br from-[#dc2626] via-[#b91c1c] to-[#0b0f15] text-white flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 focus:outline-none select-none cursor-pointer overflow-hidden p-1 border-2 border-red-400"
      >
        <span className="absolute inset-0 rounded-full bg-red-600 opacity-40 animate-ping -z-10" />
        {isOpen ? (
          <X className="h-7 w-7 text-white" />
        ) : (
          <div className="h-full w-full bg-white rounded-full flex items-center justify-center p-1.5 shadow-inner">
            <img src={logoImg} alt="Southern Storm Shelters Logo" className="w-full h-full object-contain" />
          </div>
        )}
      </motion.button>
    </div>
  );
}
