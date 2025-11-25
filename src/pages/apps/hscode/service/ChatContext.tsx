import { fetchMessages, sendChat } from "api/mockAPIChat";
import React, { createContext, useContext, useState, useRef, useEffect } from "react";
import { ContentPart, Message } from "types/pages/hscode";
import { formatDateTimeStamp } from "utils/formatDate";
import { getRandomInt } from "utils/number";

interface ChatContextType {
  messages: Message[];
  responseLoading: boolean;
  handleSend: (text: string) => Promise<void>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [responseLoading, setResponseLoading] = useState(false);
  const mounted = useRef(false);

  // Lấy lịch sử khi lần đầu mount
  useEffect(() => {
    if (mounted.current) return;
    mounted.current = true;

    (async () => {
      try {
        const initial = await fetchMessages();
        setMessages(initial);
      } catch (e) {
        console.error("Fetch messages failed:", e);
      }
    })();
  }, []);

  const handleSend = async (text: string) => {
    const newContent: ContentPart = { type: "text", text };

    const userMsg: Message = {
      id: getRandomInt(1_000_000_000_000_000),
      role: "user",
      content: newContent,
      time: formatDateTimeStamp(new Date().getTime()),
    };

    setMessages((prev) => [...prev, userMsg]);
    setResponseLoading(true);

    try {
      const reply: Message = await sendChat(text);

      // Nếu reply là text => typing effect
      if (reply.content.type === "text") {
        const emptyReply: Message = {
          ...reply,
          content: { type: "text", text: "" },
        };
        setMessages((prev) => [...prev, emptyReply]);

        let index = 0;
        const fullText = reply.content.text;
        const interval = setInterval(() => {
          index++;
          setMessages((prev) => {
            const updated = [...prev];
            updated[updated.length - 1] = {
              ...reply,
              content: { type: "text", text: fullText.slice(0, index) },
            };
            return updated;
          });

          if (index >= fullText.length) clearInterval(interval);
        }, 10); // tốc độ typing
      } else {
        setMessages((prev) => [...prev, reply]);
      }
    } catch (e) {
      console.error("Send chat failed:", e);
    } finally {
      setResponseLoading(false);
    }
  };



  return (
    <ChatContext.Provider value={{ messages, responseLoading, handleSend }}>
      {children}
    </ChatContext.Provider>
  );
};

// Custom hook để dùng gọn hơn
export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat phải được dùng bên trong <ChatProvider>");
  }
  return context;
};
