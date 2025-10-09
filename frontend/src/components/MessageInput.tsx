import { useState, useRef } from "react";
import { Send, Paperclip, Smile, Mic, X, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

interface MessageInputProps {
  onSend: (message: string, attachments?: File[]) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");
  const [attachments, setAttachments] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleSend = () => {
    if (message.trim() || attachments.length > 0) {
      onSend(message, attachments);
      setMessage("");
      setAttachments([]);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    // Check file size (max 10MB per file)
    const validFiles = files.filter(file => {
      if (file.size > 10 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds 10MB limit`,
          variant: "destructive",
        });
        return false;
      }
      return true;
    });

    setAttachments(prev => [...prev, ...validFiles]);
    
    if (validFiles.length > 0) {
      toast({
        title: "Files attached",
        description: `${validFiles.length} file(s) ready to send`,
      });
    }

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="border-t border-border bg-card px-6 py-4">
      {/* Attachments Preview */}
      {attachments.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm"
            >
              <ImageIcon className="h-4 w-4 text-muted-foreground" />
              <span className="max-w-[150px] truncate">{file.name}</span>
              <Button
                size="icon"
                variant="ghost"
                className="h-5 w-5"
                onClick={() => removeAttachment(index)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          ))}
        </div>
      )}

      <div className="flex items-end gap-3">
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,.doc,.docx"
          className="hidden"
          onChange={handleFileSelect}
        />
        
        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 flex-shrink-0"
          onClick={() => fileInputRef.current?.click()}
        >
          <Paperclip className="h-5 w-5" />
        </Button>

        <div className="relative flex-1">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            className="min-h-[44px] max-h-32 resize-none pr-10"
            rows={1}
          />
          <Button
            size="icon"
            variant="ghost"
            className="absolute bottom-2 right-2 h-8 w-8"
            onClick={() => {
              toast({
                title: "Emoji picker",
                description: "Feature coming soon!",
              });
            }}
          >
            <Smile className="h-4 w-4" />
          </Button>
        </div>

        <Button
          size="icon"
          variant="ghost"
          className="h-10 w-10 flex-shrink-0"
          onClick={() => {
            toast({
              title: "Voice message",
              description: "Feature coming soon!",
            });
          }}
        >
          <Mic className="h-5 w-5" />
        </Button>

        <Button
          onClick={handleSend}
          size="icon"
          className="h-10 w-10 flex-shrink-0 bg-gradient-primary shadow-md hover:shadow-glow transition-all"
          disabled={!message.trim() && attachments.length === 0}
        >
          <Send className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
