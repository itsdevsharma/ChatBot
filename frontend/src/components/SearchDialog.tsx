import { useState } from "react";
import { Search, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";

interface SearchResult {
  id: string;
  text: string;
  time: string;
  sender: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  messages: Array<{
    id: string;
    text: string;
    time: string;
    isOwn: boolean;
    senderName?: string;
  }>;
}

export function SearchDialog({ open, onOpenChange, messages }: SearchDialogProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredResults = messages
    .filter((msg) =>
      msg.text.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .map((msg) => ({
      id: msg.id,
      text: msg.text,
      time: msg.time,
      sender: msg.isOwn ? "You" : msg.senderName || "Other",
    }));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Search Messages</DialogTitle>
          <DialogDescription>
            Search through your conversation history
          </DialogDescription>
        </DialogHeader>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search in messages..."
            className="pl-9 pr-9"
          />
          {searchQuery && (
            <Button
              size="icon"
              variant="ghost"
              className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        <ScrollArea className="h-[400px]">
          {searchQuery ? (
            filteredResults.length > 0 ? (
              <div className="space-y-2">
                {filteredResults.map((result) => (
                  <div
                    key={result.id}
                    className="rounded-lg border border-border p-3 hover:bg-secondary transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{result.sender}</span>
                      <span className="text-xs text-muted-foreground">
                        {result.time}
                      </span>
                    </div>
                    <p className="text-sm text-foreground">{result.text}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                No messages found
              </div>
            )
          ) : (
            <div className="flex h-full items-center justify-center text-muted-foreground">
              Start typing to search
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
