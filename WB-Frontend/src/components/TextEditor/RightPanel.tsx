import React from "react";
import { X, GripVertical, Sun, Moon, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Switch } from "@/components/ui/switch";

interface RightPanelProps {
  rightPanelWidth: number;
  resizerRef: React.RefObject<HTMLDivElement>;
  rightPanelRef: React.RefObject<HTMLDivElement>;
  chatOpen: boolean;
  toggleChat: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export function RightPanel({
  rightPanelWidth,
  resizerRef,
  rightPanelRef,
  chatOpen,
  toggleChat,
  darkMode,
  toggleDarkMode,
}: RightPanelProps) {
  return (
    <>
      <div
        ref={resizerRef}
        className="w-1 bg-border hover:bg-border/80 cursor-col-resize flex items-center justify-center"
      >
        <GripVertical className="h-6 w-6 text-muted-foreground" />
      </div>

      <div
        ref={rightPanelRef}
        className="bg-muted p-4 relative overflow-hidden"
        style={{ width: `${rightPanelWidth}px` }}
      >
        <div className="flex justify-between items-center pb-4">
          <h3 className="text-foreground font-semibold text-xl">Buddy</h3>
          <div className="flex items-center space-x-4">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2 bg-card p-2 rounded-md">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-foreground" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-foreground" />
                    <Switch
                      checked={darkMode}
                      onCheckedChange={toggleDarkMode}
                    />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Toggle dark mode</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    aria-label="Settings"
                    className="bg-card hover:bg-card/80"
                  >
                    <Settings className="h-5 w-5 text-foreground" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Settings</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="border-b border-border mb-6" />

        <Button
          onClick={toggleChat}
          className="w-full bg-secondary hover:bg-secondary/80 mb-4"
        >
          Open AI Chat
        </Button>

        <div className="mb-4">
          <p className="text-sm text-foreground">
            This is an{" "}
            <span className="underline decoration-destructive decoration-wavy">
              exemple
            </span>{" "}
            of a{" "}
            <span className="underline decoration-yellow-500 decoration-wavy">
              speling
            </span>{" "}
            error and a{" "}
            <span className="underline decoration-muted-foreground">
              stylistic suggestion
            </span>
            .
          </p>
        </div>
        {chatOpen && (
          <div className="absolute inset-0 bg-background p-4 z-10 transition-all duration-300 ease-in-out">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-foreground">AI Chat</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleChat}
                className="bg-secondary hover:bg-secondary/80"
                aria-label="Close AI Chat"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="h-full overflow-y-auto">
              <p className="text-sm mb-2 text-foreground">
                AI: How can I assist you with your writing today?
              </p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
