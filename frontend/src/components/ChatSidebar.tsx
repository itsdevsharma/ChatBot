import { useState } from "react";
import {
  Search,
  MessageSquare,
  Users,
  Bot,
  Plus,
  MoreVertical,
  Settings,
  User,
  LogOut,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/context/AuthContext";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread?: number;
  type: "individual" | "group" | "ai";
  avatar?: string;
}

interface ChatSidebarProps {
  selectedChatId: string;
  onChatSelect: (chatId: string) => void;
}

const mockChats: Chat[] = [
  {
    id: "ai-1",
    name: "AI Assistant",
    lastMessage: "How can I help you today?",
    time: "Now",
    type: "ai",
  },
  {
    id: "1",
    name: "Sarah Johnson",
    lastMessage: "Thanks for the update!",
    time: "2m ago",
    unread: 2,
    type: "individual",
  },
  {
    id: "group-1",
    name: "Project Team",
    lastMessage: "Meeting at 3 PM",
    time: "10m ago",
    unread: 5,
    type: "group",
  },
  {
    id: "2",
    name: "Michael Chen",
    lastMessage: "Let's catch up tomorrow",
    time: "1h ago",
    type: "individual",
  },
  {
    id: "group-2",
    name: "Design Team",
    lastMessage: "New mockups shared",
    time: "2h ago",
    type: "group",
  },
];

export function ChatSidebar({
  selectedChatId,
  onChatSelect,
}: ChatSidebarProps) {
  const { logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();

  const filteredChats = mockChats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getIcon = (type: Chat["type"]) => {
    switch (type) {
      case "ai":
        return <Bot className="h-4 w-4" />;
      case "group":
        return <Users className="h-4 w-4" />;
      default:
        return <MessageSquare className="h-4 w-4" />;
    }
  };

  const getAvatarColor = (type: Chat["type"]) => {
    switch (type) {
      case "ai":
        return "bg-accent";
      case "group":
        return "bg-primary";
      default:
        return "bg-gradient-primary";
    }
  };

  const handleChatAction = (action: string, chatId: string) => {
    const chat = mockChats.find((c) => c.id === chatId);
    switch (action) {
      case "archive":
        toast({
          title: "Chat archived",
          description: `${chat?.name} moved to archive`,
        });
        break;
      case "delete":
        toast({
          title: "Chat deleted",
          description: `Conversation with ${chat?.name} deleted`,
          variant: "destructive",
        });
        break;
      case "mute":
        toast({
          title: "Notifications muted",
          description: `Muted notifications for ${chat?.name}`,
        });
        break;
    }
  };

  return (
    <div className="flex h-full w-80 flex-col border-r border-border bg-card">
      {/* Header */}
      <div className="border-b border-border p-4">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Messages</h2>
          <div className="flex gap-1">
            <Button
              size="icon"
              variant="ghost"
              className="h-9 w-9"
              onClick={() => {
                toast({
                  title: "New Chat",
                  description: "Select a contact to start chatting",
                });
              }}
            >
              <Plus className="h-5 w-5" />
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="ghost" className="h-9 w-9">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem
                  onClick={() =>
                    toast({
                      title: "Profile",
                      description: "Opening profile settings",
                    })
                  }
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() =>
                    toast({
                      title: "Settings",
                      description: "Opening settings",
                    })
                  }
                >
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    logout(); // ✅ Call the function
                    toast({
                      title: "Logged out",
                      description: "Successfully logged out",
                    });
                  }}
                  className="text-destructive focus:text-destructive"
                >
                  <LogOut className="mr-2 h-4 w-4" onClick={logout} />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search messages..."
            className="pl-9"
          />
        </div>
      </div>

      {/* Chat List */}
      <ScrollArea className="flex-1">
        <div className="p-2">
          {filteredChats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat.id)}
              className={cn(
                "group relative w-full rounded-lg p-3 text-left transition-all hover:bg-secondary",
                selectedChatId === chat.id && "bg-secondary"
              )}
            >
              <div className="flex items-start gap-3">
                {/* Avatar */}
                <Avatar className={cn("h-12 w-12", getAvatarColor(chat.type))}>
                  <AvatarFallback className="text-white">
                    {getIcon(chat.type)}
                  </AvatarFallback>
                </Avatar>

                {/* Content */}
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-foreground">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-muted-foreground">
                      {chat.time}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="truncate text-sm text-muted-foreground">
                      {chat.lastMessage}
                    </p>
                    {chat.unread && (
                      <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
                        {chat.unread}
                      </span>
                    )}
                  </div>
                </div>

                {/* More Options */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 opacity-0 transition-opacity group-hover:opacity-100"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => handleChatAction("mute", chat.id)}
                    >
                      Mute
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => handleChatAction("archive", chat.id)}
                    >
                      Archive
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleChatAction("delete", chat.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
