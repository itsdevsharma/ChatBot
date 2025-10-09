import { useState } from "react";
import { ChatSidebar } from "@/components/ChatSidebar";
import { ChatArea } from "@/components/ChatArea";

const chatData: Record<
  string,
  { name: string; type: "individual" | "group" | "ai" }
> = {
  "ai-1": { name: "AI Assistant", type: "ai" },
  "1": { name: "Sarah Johnson", type: "individual" },
  "group-1": { name: "Project Team", type: "group" },
  "2": { name: "Michael Chen", type: "individual" },
  "group-2": { name: "Design Team", type: "group" },
};

const Index = () => {
  const [selectedChatId, setSelectedChatId] = useState("ai-1");
  const selectedChat = chatData[selectedChatId];

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      <ChatSidebar
        selectedChatId={selectedChatId}
        onChatSelect={setSelectedChatId}
      />
      <div className="flex-1">
        <ChatArea
          chatId={selectedChatId}
          chatName={selectedChat.name}
          chatType={selectedChat.type}
        />
      </div>
    </div>
  );
};

export default Index;
