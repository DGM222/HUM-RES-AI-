import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Input } from './ui/input';
import { 
  MessageCircle, 
  Send, 
  Bot, 
  User, 
  Clock, 
  HelpCircle,
  Lightbulb,
  FileText,
  DollarSign,
  Calendar,
  Shield,
  Phone
} from 'lucide-react';
import { Separator } from './ui/separator';

interface ChatMessage {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
  isTyping?: boolean;
}

interface SuggestedQuestion {
  id: string;
  text: string;
  category: string;
  icon: any;
}

const suggestedQuestions: SuggestedQuestion[] = [
  {
    id: 'paycheck',
    text: 'When will I receive my last paycheck?',
    category: 'Exit Process',
    icon: DollarSign
  },
  {
    id: 'benefits',
    text: 'What happens to my health insurance?',
    category: 'Benefits',
    icon: Shield
  },
  {
    id: 'pto',
    text: 'Will I be paid for unused vacation days?',
    category: 'Benefits',
    icon: Calendar
  },
  {
    id: 'equipment',
    text: 'When do I need to return company equipment?',
    category: 'Exit Process',
    icon: FileText
  },
  {
    id: 'cobra',
    text: 'How do I sign up for COBRA coverage?',
    category: 'Benefits',
    icon: Shield
  },
  {
    id: 'reference',
    text: 'Can I get a reference letter?',
    category: 'General',
    icon: FileText
  },
  {
    id: 'contact',
    text: 'Who should I contact for questions?',
    category: 'General',
    icon: Phone
  },
  {
    id: 'documents',
    text: 'What documents will I receive?',
    category: 'Exit Process',
    icon: FileText
  }
];

const botResponses: Record<string, string> = {
  paycheck: "Your final paycheck will be processed on your last day of employment and will include compensation through your final work day. You'll receive it via direct deposit within 1-2 business days, or by check if you don't have direct deposit set up. This will also include any accrued, unused vacation time as per company policy.",
  
  benefits: "Your health insurance benefits will continue through the end of the month in which your employment ends. You'll receive information about COBRA continuation coverage by mail within 14 days of your termination date. COBRA allows you to continue your current health coverage for up to 18 months.",
  
  pto: "Yes, you will be paid for any accrued, unused vacation time according to company policy. This will be included in your final paycheck. Please note that sick leave is not paid out upon termination as per our employee handbook.",
  
  equipment: "All company equipment must be returned by your last day of work. This includes your laptop, monitor, keyboard, mouse, phone, ID badge, access cards, and any other company property. HR will provide you with a checklist and coordinate the return process.",
  
  cobra: "You'll receive COBRA enrollment information by mail within 14 days of your termination. You'll have 60 days from the date coverage ends to elect COBRA coverage. Contact our benefits administrator at benefits@company.com or call (555) 123-4567 for assistance with enrollment.",
  
  reference: "Yes, you can request a reference letter from HR. We provide employment verification letters that include your job title, employment dates, and salary information. For more detailed references, you may also reach out to your direct supervisor. Contact HR at hr@company.com to request documentation.",
  
  contact: "For questions about your final pay and benefits, contact HR at hr@company.com or (555) 123-4567. For COBRA questions, contact our benefits team at benefits@company.com. For general employment verification, use hr@company.com. Our team is available Monday-Friday, 9 AM to 5 PM.",
  
  documents: "You'll receive several documents including: your final pay stub, COBRA enrollment information, unemployment benefits information, any applicable severance documentation, and a summary of your final benefits. Most documents will be mailed to your home address within 2 weeks of your last day."
};

export function EmployeeChatbot() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      content: "Hello! I'm here to help answer your questions about the exit process, benefits, and other HR-related topics. How can I assist you today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for specific keywords and return appropriate responses
    if (lowerMessage.includes('paycheck') || lowerMessage.includes('salary') || lowerMessage.includes('final pay')) {
      return botResponses.paycheck;
    } else if (lowerMessage.includes('health insurance') || lowerMessage.includes('medical') || lowerMessage.includes('insurance')) {
      return botResponses.benefits;
    } else if (lowerMessage.includes('vacation') || lowerMessage.includes('pto') || lowerMessage.includes('time off')) {
      return botResponses.pto;
    } else if (lowerMessage.includes('equipment') || lowerMessage.includes('laptop') || lowerMessage.includes('return')) {
      return botResponses.equipment;
    } else if (lowerMessage.includes('cobra')) {
      return botResponses.cobra;
    } else if (lowerMessage.includes('reference') || lowerMessage.includes('recommendation')) {
      return botResponses.reference;
    } else if (lowerMessage.includes('contact') || lowerMessage.includes('reach') || lowerMessage.includes('call')) {
      return botResponses.contact;
    } else if (lowerMessage.includes('documents') || lowerMessage.includes('paperwork')) {
      return botResponses.documents;
    } else if (lowerMessage.includes('benefits')) {
      return "I can help you with various benefits questions. Are you asking about health insurance, retirement plans, COBRA coverage, or something else specific?";
    } else if (lowerMessage.includes('exit') || lowerMessage.includes('termination') || lowerMessage.includes('leaving')) {
      return "I can help guide you through the exit process. This typically includes returning company equipment, final paycheck processing, benefits transition, and documentation. What specific aspect would you like to know about?";
    } else if (lowerMessage.includes('thank') || lowerMessage.includes('thanks')) {
      return "You're welcome! I'm here to help make your transition as smooth as possible. Is there anything else you'd like to know?";
    } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
      return "Hello! I'm here to help with any questions about your exit process, benefits, or other HR matters. What would you like to know?";
    } else {
      return "I understand you're asking about something specific. While I can help with common exit process and benefits questions, for detailed or unique situations, I recommend contacting HR directly at hr@company.com or (555) 123-4567. They'll be able to provide personalized assistance for your situation.";
    }
  };

  const handleSendMessage = async (messageContent?: string) => {
    const content = messageContent || inputValue.trim();
    if (!content) return;

    // Add user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const botResponse: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: generateBotResponse(content),
        sender: 'bot',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
  };

  const handleSuggestedQuestion = (question: SuggestedQuestion) => {
    handleSendMessage(question.text);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const groupedSuggestions = suggestedQuestions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = [];
    }
    acc[question.category].push(question);
    return acc;
  }, {} as Record<string, SuggestedQuestion[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">HR Assistant</h1>
        <p className="text-muted-foreground">
          Get instant answers to your questions about the exit process, benefits, and more
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-4">
        {/* Suggested Questions Sidebar */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lightbulb className="h-5 w-5" />
              Quick Questions
            </CardTitle>
            <CardDescription>
              Click any question to get started
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(groupedSuggestions).map(([category, questions]) => (
              <div key={category}>
                <h4 className="text-sm font-semibold mb-2 text-muted-foreground">{category}</h4>
                <div className="space-y-2">
                  {questions.map((question) => (
                    <Button
                      key={question.id}
                      variant="outline"
                      size="sm"
                      className="w-full justify-start text-left h-auto py-2 px-3"
                      onClick={() => handleSuggestedQuestion(question)}
                    >
                      <question.icon className="h-4 w-4 mr-2 flex-shrink-0" />
                      <span className="text-xs">{question.text}</span>
                    </Button>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Chat Interface */}
        <Card className="lg:col-span-3">
          <CardHeader>
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarFallback>
                  <Bot className="h-5 w-5" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  HR Assistant Chat
                </CardTitle>
                <CardDescription>
                  Ask questions about exit process, benefits, and more
                </CardDescription>
              </div>
              <div className="ml-auto">
                <Badge variant="secondary" className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Online
                </Badge>
              </div>
            </div>
          </CardHeader>
          
          <CardContent className="p-0">
            {/* Messages Area */}
            <div className="h-96 overflow-y-auto px-6 pb-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex items-start gap-3 ${
                    message.sender === 'user' ? 'flex-row-reverse' : 'flex-row'
                  }`}
                >
                  <Avatar className="h-8 w-8 flex-shrink-0">
                    <AvatarFallback className={
                      message.sender === 'user' 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-muted'
                    }>
                      {message.sender === 'user' ? (
                        <User className="h-4 w-4" />
                      ) : (
                        <Bot className="h-4 w-4" />
                      )}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className={`flex flex-col max-w-[80%] ${
                    message.sender === 'user' ? 'items-end' : 'items-start'
                  }`}>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.sender === 'user'
                        ? 'bg-blue-500 text-white'
                        : 'bg-muted'
                    }`}>
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    </div>
                    <span className="text-xs text-muted-foreground mt-1">
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </span>
                  </div>
                </div>
              ))}
              
              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex items-start gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-muted">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg px-4 py-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            <Separator />

            {/* Input Area */}
            <div className="p-6">
              <div className="flex items-center gap-2">
                <div className="flex-1 relative">
                  <Input
                    ref={inputRef}
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your question here..."
                    className="pr-12"
                    disabled={isTyping}
                  />
                </div>
                <Button 
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || isTyping}
                  size="sm"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                For complex questions or immediate assistance, contact HR at hr@company.com or (555) 123-4567
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Help Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5" />
            How to Use the HR Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 text-sm">
            <div>
              <h4 className="font-semibold mb-2">Quick Questions</h4>
              <p className="text-muted-foreground">
                Click on any suggested question in the sidebar to get instant answers to common HR topics.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Ask Anything</h4>
              <p className="text-muted-foreground">
                Type your own questions about exit process, benefits, payroll, or other HR matters in the chat.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">Need More Help?</h4>
              <p className="text-muted-foreground">
                For complex situations or immediate assistance, contact our HR team directly for personalized support.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}