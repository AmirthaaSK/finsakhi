import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = "AIzaSyB5KOKJRZBqkg8gMPyp0urZ3IjgX4cxB1g";
const genAI = new GoogleGenerativeAI(apiKey);

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

const SYSTEM_PROMPT = `You are FinSakhi, a friendly and helpful financial literacy assistant designed for rural Indian communities. Your role is to:

1. Teach basic financial concepts in simple, easy-to-understand language
2. Help users understand banking, UPI, ATM usage, and digital payments
3. Explain government schemes and benefits available to them
4. Provide guidance on savings, budgeting, and financial planning
5. Always be patient, supportive, and culturally sensitive
6. Use relatable examples from daily life
7. Encourage safe financial practices
8. NEVER ask for or encourage sharing of personal information like PIN, OTP, Aadhaar, or bank account details

Keep responses concise (2-3 short paragraphs), friendly, and actionable. Use emojis occasionally to make conversations warm and engaging.`;

export class GeminiChatService {
  private model;
  private chat: any = null;

  constructor() {
    this.model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash"
    });
  }

  async startChat(history: Message[] = []) {
    // Add system prompt as first message in history
    const systemMessage = {
      role: 'user',
      parts: [{ text: SYSTEM_PROMPT }]
    };
    
    const systemResponse = {
      role: 'model',
      parts: [{ text: "I understand. I'm FinSakhi, your friendly financial assistant. I'm here to help with banking, savings, UPI, and government schemes. How can I help you today?" }]
    };

    const formattedHistory = [systemMessage, systemResponse];
    
    // Add existing chat history
    history.forEach(msg => {
      if (msg.role !== 'assistant' || msg.content !== "Hello! I'm FinSakhi 👋 Ask me anything about banking, savings, UPI, or government schemes!") {
        formattedHistory.push({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: msg.content }]
        });
      }
    });

    this.chat = this.model.startChat({
      history: formattedHistory,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.7,
      },
    });
  }

  async sendMessage(message: string): Promise<string> {
    try {
      if (!this.chat) {
        await this.startChat();
      }

      const result = await this.chat.sendMessage(message);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error("Error sending message to Gemini:", error);
      
      // Check if it's an API key error
      if (error?.message?.includes('API key')) {
        throw new Error("API configuration error. Please check your API key.");
      }
      
      // Check if it's a quota error
      if (error?.message?.includes('quota')) {
        throw new Error("API quota exceeded. Please try again later.");
      }
      
      throw new Error("Sorry, I couldn't process your message. Please try again.");
    }
  }

  resetChat() {
    this.chat = null;
  }
}

export const geminiChat = new GeminiChatService();
