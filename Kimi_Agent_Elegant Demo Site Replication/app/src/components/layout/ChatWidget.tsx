import { useState, useEffect } from 'react';
import { MessageCircle, X, ChevronDown, Send, User } from 'lucide-react';

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [showWidget, setShowWidget] = useState(false);
  const [messages, setMessages] = useState([
    { id: 1, sender: 'dennis', text: 'Hi there! 👋 Welcome to WANTECH Solutions. How can I help you today?', time: 'Just now' },
  ]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowWidget(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = { id: messages.length + 1, sender: 'user', text: input, time: 'Just now' };
    setMessages([...messages, newMsg]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: prev.length + 1,
          sender: 'dennis',
          text: "Thanks for your message! I'm currently looking into that for you. Is there anything else I can help with?",
          time: 'Just now',
        },
      ]);
    }, 1500);
  };

  if (!showWidget) return null;

  return (
    <div className="fixed bottom-4 right-4 z-[100]" style={{ fontFamily: 'var(--font-family)' }}>
      {isOpen ? (
        <div
          className="rounded-xl overflow-hidden flex flex-col"
          style={{
            width: '340px',
            height: '420px',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          }}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3"
            style={{ background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)' }}
          >
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                <User size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-medium text-sm">Dennis</div>
                <div className="text-white/70 text-xs">Personal Account Manager</div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1">
                <ChevronDown size={18} />
              </button>
              <button onClick={() => setIsOpen(false)} className="text-white/80 hover:text-white p-1">
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-3 space-y-3">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className="max-w-[80%] rounded-lg px-3 py-2 text-sm"
                  style={{
                    background: msg.sender === 'user' ? 'var(--accent-blue)' : 'var(--card-border)',
                    color: 'white',
                  }}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div
            className="p-3 flex items-center gap-2"
            style={{ borderTop: '1px solid var(--card-border)' }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
              className="flex-1 text-sm px-3 py-2 rounded-lg outline-none"
              style={{
                background: 'var(--input-bg)',
                border: '1px solid var(--input-border)',
                color: 'var(--text-primary)',
              }}
            />
            <button
              onClick={handleSend}
              className="p-2 rounded-lg transition-colors"
              style={{ background: 'var(--accent-blue)' }}
            >
              <Send size={16} className="text-white" />
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 px-4 py-3 rounded-full text-white shadow-lg transition-all hover:scale-105"
          style={{
            background: 'linear-gradient(135deg, #0ea5e9 0%, #0284c7 100%)',
            boxShadow: '0 4px 20px rgba(14, 165, 233, 0.4)',
          }}
        >
          <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
            <User size={16} />
          </div>
          <div className="text-left">
            <div className="text-xs font-medium">Hi there! 👋</div>
            <div className="text-[11px] opacity-80">I&apos;m Dennis, your personal account manager. Click me!</div>
          </div>
          <MessageCircle size={18} className="ml-1 opacity-60" />
        </button>
      )}
    </div>
  );
}
