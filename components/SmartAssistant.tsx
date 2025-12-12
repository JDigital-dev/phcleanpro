import React, { useState, useRef, useEffect } from 'react';
import { getAIResponse } from '../services/geminiService';

const SmartAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([
    { text: "Hello! I'm Chioma. Ask me about our cleaning services in Port Harcourt!", isUser: false }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { text: userMsg, isUser: true }]);
    setInput('');
    setIsLoading(true);

    const aiMsg = await getAIResponse(userMsg);
    setMessages(prev => [...prev, { text: aiMsg, isUser: false }]);
    setIsLoading(false);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-green-600 hover:bg-green-700 text-white rounded-full p-4 shadow-lg flex items-center gap-2 transition-transform hover:scale-105"
        >
          <i className="fas fa-robot text-xl"></i>
          <span className="font-medium hidden md:inline">Ask Chioma</span>
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-2xl w-80 md:w-96 flex flex-col border border-slate-200 overflow-hidden">
          <div className="bg-green-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
              <div className="bg-white/20 p-2 rounded-full">
                <i className="fas fa-robot"></i>
              </div>
              <div>
                <h3 className="font-bold text-sm">PH Cleaning Assistant</h3>
                <p className="text-xs text-green-100">Online</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white hover:text-green-200">
              <i className="fas fa-times"></i>
            </button>
          </div>

          <div className="h-80 overflow-y-auto p-4 bg-slate-50 space-y-3">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.isUser ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[80%] rounded-lg p-3 text-sm ${
                  msg.isUser 
                    ? 'bg-green-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                }`}>
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-slate-100 rounded-lg p-3 text-xs text-slate-500 italic">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="p-3 bg-white border-t border-slate-100">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Ask about prices..."
                className="flex-1 border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-green-600 text-white rounded-md px-3 py-2 hover:bg-green-700 disabled:opacity-50"
              >
                <i className="fas fa-paper-plane"></i>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SmartAssistant;