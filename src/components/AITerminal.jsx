import { useState, useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

// 1. THE NEW TYPEWRITER COMPONENT
// This takes the massive text block and types it out like a hacker terminal
const TypewriterMessage = ({ text }) => {
  // We use a ref to bypass React's render cycle completely
  const spanRef = useRef(null);

  useEffect(() => {
    let i = 0;
    let timeout;

    // Clear the span when it first loads
    if (spanRef.current) {
      spanRef.current.textContent = "";
    }

    const typeChar = () => {
      if (i < text.length) {
        // Directly mutate the DOM. ZERO React re-renders.
        if (spanRef.current) {
          spanRef.current.textContent += text.charAt(i);
        }
        i++;
        timeout = setTimeout(typeChar, 15);
      }
    };

    typeChar();

    return () => clearTimeout(timeout);
  }, [text]);

  return <span ref={spanRef} />;
};

const AITerminal = () => {
  const containerRef = useRef(null);
  const chatRef = useRef(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    {
      role: "ai",
      text: "Hi, I am Cadbury. Ask me anything about Master Prateek's tech stack, his experience, or what he's building right now.",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  // Set the live backend URL here
  const BACKEND_URL =
    import.meta.env.VITE_BACKEND_URL ||
    "https://portfolio-backend-xbtz.onrender.com";

  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { y: 50, opacity: 0, scale: 0.98 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
          },
        },
      );
    },
    { scope: containerRef },
  );

  // 2. THE MUTATION OBSERVER (Auto-Scroll Fix)
  // Because the text is typing dynamically, standard auto-scroll breaks.
  // This observer watches the DOM and pushes the scrollbar down every time a new letter appears.
  useEffect(() => {
    const chatEl = chatRef.current;
    if (!chatEl) return;

    const observer = new MutationObserver(() => {
      chatEl.scrollTop = chatEl.scrollHeight;
    });

    observer.observe(chatEl, {
      childList: true,
      subtree: true,
      characterData: true,
    });

    return () => observer.disconnect();
  }, []);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg = input;
    setInput("");
    setMessages((prev) => [...prev, { role: "user", text: userMsg }]);
    setIsTyping(true);

    // --- THE TRACKING HOOK ---
    // This sends a custom event to your Google Analytics dashboard
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", "cadbury_prompt_sent", {
        event_category: "AI_Interaction",
        event_label: "User asked Cadbury a question",
      });
    }

    try {
      // THE FIX: Pointing the fetch call to your live Render backend
      const response = await fetch(`${BACKEND_URL}/ask-prateek-ai`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg }),
      });

      const data = await response.json();

      setIsTyping(false);
      setMessages((prev) => [...prev, { role: "ai", text: data.reply }]);
    } catch (error) {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "Connection to server lost. I am offline." },
      ]);
    }
  };

  return (
    <section
      id="cadbury"
      style={{
        backgroundColor: "#000000",
        padding: "clamp(40px, 8vw, 100px) 20px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <style>
        {`
          @keyframes pulse-opacity {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }
          .dot-1 { animation: pulse-opacity 1.4s infinite; }
          .dot-2 { animation: pulse-opacity 1.4s infinite 0.2s; }
          .dot-3 { animation: pulse-opacity 1.4s infinite 0.4s; }
        `}
      </style>

      {/* THE NEW HEADING */}
      <div style={{ textAlign: "center", marginBottom: "40px" }}>
        <h2
          style={{
            fontSize: "clamp(2rem, 5vw, 3rem)",
            fontWeight: "900",
            color: "#ffffff",
            marginBottom: "10px",
            letterSpacing: "-0.02em",
          }}
        >
          Hi, I am <span style={{ color: "#3496F7" }}>Cadbury.</span>
        </h2>
        <p
          style={{
            color: "#a3a3a3",
            fontSize: "1.1rem",
            fontWeight: "500",
            letterSpacing: "0.5px",
          }}
        >
          Master Prateek's Assistant. Ask me anything about him.
        </p>
      </div>

      <div
        ref={containerRef}
        style={{
          width: "100%",
          maxWidth: "900px",
          backgroundColor: "#0a0a0a",
          border: "1px solid rgba(255, 255, 255, 0.1)",
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.8)",
        }}
      >
        <div
          style={{
            backgroundColor: "#111",
            padding: "12px 20px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#ef4444",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#eab308",
            }}
          />
          <div
            style={{
              width: "12px",
              height: "12px",
              borderRadius: "50%",
              backgroundColor: "#22c55e",
            }}
          />
          {/* UPDATED TERMINAL TITLE */}
          <span
            style={{
              marginLeft: "10px",
              color: "#666",
              fontSize: "0.85rem",
              fontFamily: "monospace",
            }}
          >
            cadbury ~ terminal
          </span>
        </div>

        <div
          ref={chatRef}
          data-lenis-prevent="true"
          style={{
            height: "350px",
            overflowY: "auto",
            overscrollBehavior: "contain",
            padding: "24px",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
        >
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                maxWidth: "80%",
                backgroundColor:
                  msg.role === "user" ? "#3496F7" : "rgba(255,255,255,0.05)",
                color: "#fff",
                padding: "12px 16px",
                borderRadius: "12px",
                borderBottomRightRadius: msg.role === "user" ? "4px" : "12px",
                borderBottomLeftRadius: msg.role === "ai" ? "4px" : "12px",
                fontFamily: msg.role === "ai" ? "monospace" : "inherit",
                fontSize: "0.95rem",
                lineHeight: "1.6",
                whiteSpace: "pre-wrap",
              }}
            >
              {/* 3. CONDITIONAL RENDERING */}
              {/* If it's an AI message, pass it to the Typewriter. If it's the user, just render it instantly. */}
              {msg.role === "ai" ? (
                <TypewriterMessage text={msg.text} />
              ) : (
                msg.text
              )}
            </div>
          ))}

          {/* 4. THE "THINKING" STATE */}
          {isTyping && (
            <div
              style={{
                alignSelf: "flex-start",
                color: "#a3a3a3",
                fontFamily: "monospace",
                padding: "12px 16px",
                display: "flex",
                alignItems: "center",
                gap: "4px",
                fontSize: "0.9rem",
              }}
            >
              <span style={{ color: "#3496F7", marginRight: "8px" }}>
                {">"}
              </span>
              Cadbury is analyzing request
              <span
                className="dot-1"
                style={{ fontSize: "1.2rem", lineHeight: "0" }}
              >
                .
              </span>
              <span
                className="dot-2"
                style={{ fontSize: "1.2rem", lineHeight: "0" }}
              >
                .
              </span>
              <span
                className="dot-3"
                style={{ fontSize: "1.2rem", lineHeight: "0" }}
              >
                .
              </span>
            </div>
          )}
        </div>

        <form
          onSubmit={handleSend}
          style={{
            borderTop: "1px solid rgba(255,255,255,0.05)",
            padding: "16px",
            display: "flex",
            gap: "12px",
          }}
        >
          <span
            style={{
              color: "#3496F7",
              fontSize: "1.2rem",
              fontWeight: "bold",
              alignSelf: "center",
            }}
          >
            {">"}
          </span>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about my MERN experience..."
            style={{
              flex: 1,
              backgroundColor: "transparent",
              border: "none",
              color: "#fff",
              fontSize: "1rem",
              outline: "none",
              fontFamily: "monospace",
            }}
          />
          <button
            type="submit"
            style={{
              backgroundColor: "rgba(255,255,255,0.1)",
              color: "#fff",
              border: "none",
              padding: "8px 16px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "600",
              transition: "background 0.2s",
            }}
          >
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default AITerminal;
