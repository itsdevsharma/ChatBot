import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileIcon } from "lucide-react";

interface MessageBubbleProps {
  message: string;
  time: string;
  isOwn: boolean;
  senderName?: string;
  chatType: "individual" | "group" | "ai";
  attachments?: string[];
}

export function MessageBubble({
  message,
  time,
  isOwn,
  senderName,
  chatType,
  attachments,
}: MessageBubbleProps) {
  return (
    <div
      className={cn(
        "flex gap-3 animate-fade-in",
        isOwn ? "flex-row-reverse" : "flex-row"
      )}
    >
      {!isOwn && (
        <Avatar className={cn(
          "h-8 w-8 flex-shrink-0",
          chatType === "ai" ? "bg-accent" : "bg-gradient-primary"
        )}>
          <AvatarFallback className="text-xs text-white">
            {chatType === "ai" ? "AI" : senderName?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
      )}

      <div
        className={cn(
          "flex max-w-[70%] flex-col gap-1",
          isOwn ? "items-end" : "items-start"
        )}
      >
        {!isOwn && senderName && (
          <span className="text-xs font-medium text-muted-foreground">
            {senderName}
          </span>
        )}
        
        {attachments && attachments.length > 0 && (
          <div className="space-y-1">
            {attachments.map((attachment, index) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2",
                  isOwn
                    ? "bg-primary/10 text-foreground"
                    : "bg-card border border-border text-foreground"
                )}
              >
                <FileIcon className="h-4 w-4" />
                <span className="text-sm">{attachment}</span>
              </div>
            ))}
          </div>
        )}
        
        {message && (
          <div
            className={cn(
              "rounded-2xl px-4 py-2.5 shadow-sm",
              isOwn
                ? "bg-gradient-primary text-white"
                : chatType === "ai"
                ? "bg-gradient-accent text-white"
                : "bg-card border border-border text-foreground"
            )}
          >
            <p className="text-sm leading-relaxed">{message}</p>
          </div>
        )}
        
        <span className="text-xs text-muted-foreground">{time}</span>
      </div>
    </div>
  );
}
