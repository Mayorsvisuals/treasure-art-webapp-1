"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Bot, X, Send, Diamond, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateWhatsAppLink } from "@/services/whatsapp";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
};

const initialOptions = [
  "Browse Resin Supplies",
  "Shop Jewelry",
  "Explore Interiors",
  "Custom Projects",
  "Shipping Information",
  "Talk to WhatsApp Support",
];

export function GuidedAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      sender: "bot",
      text: "Welcome to Treasure Arts. How can I assist you in finding your next masterpiece today?",
    },
  ]);
  const [showOptions, setShowOptions] = useState(true);

  const handleOptionClick = (option: string) => {
    // Add user message
    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: option,
    };
    setMessages((prev) => [...prev, userMsg]);
    setShowOptions(false);

    // Simulate guided response
    setTimeout(() => {
      let botResponse = "";
      if (option === "Talk to WhatsApp Support") {
        botResponse =
          "Connecting you to our concierge. Please click the WhatsApp button to continue.";
      } else {
        botResponse = `Excellent choice. I can help you with ${option}. Our new collection just arrived. What specific style are you looking for?`;
      }

      setMessages((prev) => [
        ...prev,
        { id: Date.now().toString(), sender: "bot", text: botResponse },
      ]);

      // Reshow basic options after a bit if not whatsapp
      if (option !== "Talk to WhatsApp Support") {
        setTimeout(() => setShowOptions(true), 1500);
      }
    }, 800);
  };

  return (
    <>
      <motion.button
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5, type: "spring" }}
        onClick={() => setIsOpen(true)}
        className={cn(
          "fixed bottom-6 z-40 w-14 h-14 bg-luxury-black border border-luxury-gold text-luxury-gold rounded-full shadow-2xl flex items-center justify-center hover:bg-luxury-gold hover:text-black transition-all duration-300",
          isOpen ? "hidden" : "md:left-6 right-6 md:right-auto", // positioned left on desktop, right on mobile
        )}
        aria-label="Open Assistant"
      >
        <Bot className="w-6 h-6" />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-6 left-4 right-4 md:left-6 md:right-auto md:w-[380px] z-50 bg-luxury-black border border-luxury-charcoal shadow-[0_0_40px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col h-[500px] max-h-[80vh]"
          >
            {/* Header */}
            <div className="bg-luxury-charcoal/50 p-4 border-b border-luxury-charcoal flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-luxury-gold text-black flex items-center justify-center">
                  <Diamond className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-luxury-paper text-sm">
                    Treasure Arts Concierge
                  </h3>
                  <p className="text-xs text-luxury-gold">Guided Assistant</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-luxury-paper transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 scrollbar-thin scrollbar-thumb-luxury-charcoal">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "max-w-[85%] rounded px-4 py-3 text-sm leading-relaxed",
                    msg.sender === "bot"
                      ? "bg-luxury-charcoal text-luxury-paper self-start rounded-tl-none border-l-2 border-luxury-gold"
                      : "bg-luxury-gold text-black self-end rounded-tr-none font-medium",
                  )}
                >
                  {msg.text}
                </div>
              ))}

              {/* Options */}
              {showOptions && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col gap-2 mt-2"
                >
                  {initialOptions.map((opt, i) => (
                    <button
                      key={i}
                      onClick={() => handleOptionClick(opt)}
                      className="text-xs border border-luxury-charcoal hover:border-luxury-gold text-gray-300 hover:text-luxury-gold py-2 px-4 rounded text-left transition-colors flex items-center justify-between group"
                    >
                      {opt}
                      <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </motion.div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-luxury-charcoal bg-luxury-black">
              <div className="flex items-center justify-between text-xs text-gray-500 text-center">
                <span className="mx-auto flex items-center gap-2">
                  <Bot className="w-3 h-3" /> Automated Store Assistant
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
