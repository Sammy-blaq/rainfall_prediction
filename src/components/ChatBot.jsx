import { useState, useCallback, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User, Loader2 } from "lucide-react";
import Button from "./ui/Button.jsx";

const CHAT_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/chat`;

export const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your RainWatch farming assistant. Ask me about rainfall predictions, best planting times, or any farming tips for northern Nigeria. 🌾",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const streamChat = useCallback(async (userMessages) => {
    const resp = await fetch(CHAT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY
        }`,
      },
      body: JSON.stringify({ messages: userMessages }),
    });

    if (!resp.ok) {
      const error = await resp.json();
      throw new Error(error.error || "Failed to connect to AI");
    }

    if (!resp.body) throw new Error("No response body");

    const reader = resp.body.getReader();
    const decoder = new TextDecoder();
    let buffer = "";
    let assistantText = "";

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });

      let index;
      while ((index = buffer.indexOf("\n")) !== -1) {
        let line = buffer.slice(0, index).trim();
        buffer = buffer.slice(index + 1);

        if (!line.startsWith("data: ")) continue;

        const json = line.replace("data: ", "");
        if (json === "[DONE]") break;

        try {
          const parsed = JSON.parse(json);
          const chunk = parsed?.choices?.[0]?.delta?.content;

          if (chunk) {
            assistantText += chunk;
            setMessages((prev) => {
              const last = prev[prev.length - 1];
              if (last?.role === "assistant") {
                return prev.map((m, i) =>
                  i === prev.length - 1 ? { ...m, content: assistantText } : m
                );
              }
              return [...prev, { role: "assistant", content: assistantText }];
            });
          }
        } catch {
          break;
        }
      }
    }
  }, []);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", content: input.trim() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput("");
    setIsLoading(true);

    try {
      await streamChat(updatedMessages.slice(1));
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full shadow-elevated flex items-center justify-center transition-all duration-300 hover:scale-105 ${
          isOpen
            ? "bg-muted text-muted-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {isOpen ? <X /> : <MessageCircle />}
      </button>

      {/* Chat window */}
      <div
        className={`fixed bottom-24 right-6 z-50 w-90 max-w-[calc(100vw-3rem)] bg-card rounded-2xl shadow-elevated border border-border overflow-hidden transition-all duration-300 ${
          isOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        {/* Header */}
        <div className="bg-primary text-primary-foreground p-4 flex gap-3">
          <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
            <Bot />
          </div>
          <div>
            <h3 className="font-bold">RainWatch Assistant</h3>
            <p className="text-xs opacity-70">Farming & Weather Help</p>
          </div>
        </div>

        {/* Messages */}
        <div className="h-87.5 overflow-y-auto p-4 space-y-4 bg-muted/30">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex gap-2 ${
                msg.role === "user" ? "flex-row-reverse" : ""
              }`}
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground"
                }`}
              >
                {msg.role === "user" ? <User /> : <Bot />}
              </div>

              <div
                className={`max-w-[75%] px-4 py-2.5 text-sm rounded-2xl ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground rounded-tr-sm"
                    : "bg-card shadow-soft rounded-tl-sm"
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center">
                <Bot />
              </div>
              <div className="bg-card shadow-soft px-4 py-2.5 rounded-2xl">
                <Loader2 className="animate-spin" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-3 border-t bg-card">
          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about farming or weather..."
              className="flex-1 px-4 py-2 rounded-xl bg-muted text-sm outline-none"
              disabled={isLoading}
            />
            <Button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              size="icon"
            >
              <Send />
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
