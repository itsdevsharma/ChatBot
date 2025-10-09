import { Phone, Video, MoreVertical, Search, Info, Bell, Archive, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface ChatHeaderProps {
  chatName: string;
  chatType: "individual" | "group" | "ai";
  isTyping?: boolean;
  onSearchClick: () => void;
}

export function ChatHeader({ chatName, chatType, isTyping, onSearchClick }: ChatHeaderProps) {
  const [showInfo, setShowInfo] = useState(false);
  const { toast } = useToast();

  const getStatusText = () => {
    if (isTyping) return "typing...";
    if (chatType === "ai") return "AI Assistant";
    if (chatType === "group") return "5 members";
    return "Online";
  };

  const handleMenuAction = (action: string) => {
    switch (action) {
      case "info":
        setShowInfo(true);
        break;
      case "mute":
        toast({
          title: "Notifications muted",
          description: `Muted notifications for ${chatName}`,
        });
        break;
      case "archive":
        toast({
          title: "Chat archived",
          description: `${chatName} moved to archive`,
        });
        break;
      case "delete":
        toast({
          title: "Chat deleted",
          description: `Conversation with ${chatName} deleted`,
          variant: "destructive",
        });
        break;
    }
  };

  return (
    <>
      <div className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-10 w-10 bg-gradient-primary">
            <AvatarFallback className="text-sm font-medium text-white">
              {chatName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="font-semibold text-foreground">{chatName}</h2>
            <p className="text-sm text-muted-foreground">{getStatusText()}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {chatType !== "ai" && (
            <>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10"
                onClick={() => toast({ title: "Calling...", description: "Voice call initiated" })}
              >
                <Phone className="h-5 w-5" />
              </Button>
              <Button
                size="icon"
                variant="ghost"
                className="h-10 w-10"
                onClick={() => toast({ title: "Calling...", description: "Video call initiated" })}
              >
                <Video className="h-5 w-5" />
              </Button>
            </>
          )}
          <Button
            size="icon"
            variant="ghost"
            className="h-10 w-10"
            onClick={onSearchClick}
          >
            <Search className="h-5 w-5" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon" variant="ghost" className="h-10 w-10">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem onClick={() => handleMenuAction("info")}>
                <Info className="mr-2 h-4 w-4" />
                Chat Info
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleMenuAction("mute")}>
                <Bell className="mr-2 h-4 w-4" />
                Mute Notifications
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => handleMenuAction("archive")}>
                <Archive className="mr-2 h-4 w-4" />
                Archive Chat
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleMenuAction("delete")}
                className="text-destructive focus:text-destructive"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Chat
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <Dialog open={showInfo} onOpenChange={setShowInfo}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{chatName}</DialogTitle>
            <DialogDescription>
              {chatType === "ai" && "AI-powered assistant to help with your tasks"}
              {chatType === "group" && "Group chat with 5 members"}
              {chatType === "individual" && "Direct message conversation"}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-center">
              <Avatar className="h-24 w-24 bg-gradient-primary">
                <AvatarFallback className="text-3xl font-bold text-white">
                  {chatName.charAt(0)}
                </AvatarFallback>
              </Avatar>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <span className="font-medium">{getStatusText()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <span className="font-medium capitalize">{chatType}</span>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
