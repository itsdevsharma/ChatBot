import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ChatHeader } from "./ChatHeader";
import { MessageBubble } from "./MessageBubble";
import { MessageInput } from "./MessageInput";
import { SearchDialog } from "./SearchDialog";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  time: string;
  isOwn: boolean;
  senderName?: string;
  attachments?: string[];
}

interface ChatAreaProps {
  chatId: string;
  chatName: string;
  chatType: "individual" | "group" | "ai";
}

const mockMessages: Record<string, Message[]> = {
  "ai-1": [
    {
      id: "1",
      text: "Hello! I'm your AI assistant. How can I help you today?",
      time: "10:30 AM",
      isOwn: false,
    },
    {
      id: "2",
      text: "Hi! Can you help me with some coding questions?",
      time: "10:31 AM",
      isOwn: true,
    },
    {
      id: "3",
      text: "Of course! I'd be happy to help with your coding questions. What would you like to know?",
      time: "10:31 AM",
      isOwn: false,
    },
  ],
  "1": [
    {
      id: "1",
      text: "Hey! How's the project going?",
      time: "9:15 AM",
      isOwn: false,
      senderName: "Sarah",
    },
    {
      id: "2",
      text: "Going great! Just finished the new feature.",
      time: "9:20 AM",
      isOwn: true,
    },
    {
      id: "3",
      text: "That's awesome! Thanks for the update!",
      time: "9:21 AM",
      isOwn: false,
      senderName: "Sarah",
    },
  ],
  "group-1": [
    {
      id: "1",
      text: "Don't forget about the meeting at 3 PM today",
      time: "8:45 AM",
      isOwn: false,
      senderName: "John",
    },
    {
      id: "2",
      text: "Thanks for the reminder!",
      time: "8:50 AM",
      isOwn: true,
    },
    {
      id: "3",
      text: "I'll be there",
      time: "9:00 AM",
      isOwn: false,
      senderName: "Emma",
    },
  ],
};

export function ChatArea({ chatId, chatName, chatType }: ChatAreaProps) {
  const [messages, setMessages] = useState<Message[]>(
    mockMessages[chatId] || []
  );
  const [showSearch, setShowSearch] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = (text: string, attachments?: File[]) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      isOwn: true,
      attachments: attachments?.map(f => f.name),
    };

    setMessages([...messages, newMessage]);

    if (attachments && attachments.length > 0) {
      toast({
        title: "Files sent",
        description: `${attachments.length} file(s) sent successfully`,
      });
    }

    // Simulate AI or other user response
    if (chatType === "ai") {
      setTimeout(() => {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: "I received your message. How else can I assist you?",
          time: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isOwn: false,
        };
        setMessages((prev) => [...prev, aiResponse]);
      }, 1000);
    }
  };

  return (
    <>
      <div className="flex h-full flex-col bg-gradient-subtle">
        <ChatHeader
          chatName={chatName}
          chatType={chatType}
          onSearchClick={() => setShowSearch(true)}
        />

        <ScrollArea className="flex-1 px-6 py-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message.text}
                time={message.time}
                isOwn={message.isOwn}
                senderName={message.senderName}
                chatType={chatType}
                attachments={message.attachments}
              />
            ))}
          </div>
        </ScrollArea>

        <MessageInput onSend={handleSendMessage} />
      </div>

      <SearchDialog
        open={showSearch}
        onOpenChange={setShowSearch}
        messages={messages}
      />
    </>
  );
}
