import React from "react";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  sidebarExpanded: boolean;
  toggleSidebar: () => void;
}

export function Sidebar({ sidebarExpanded, toggleSidebar }: SidebarProps) {
  return (
    <div
      className={`bg-muted transition-all duration-300 ${
        sidebarExpanded ? "w-64" : "w-16"
      }`}
    >
      <div className="p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleSidebar}
          className="bg-secondary hover:bg-secondary/80 text-foreground"
          aria-label={sidebarExpanded ? "Collapse sidebar" : "Expand sidebar"}
        >
          {sidebarExpanded ? <ChevronLeft /> : <ChevronRight />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="mt-4 bg-secondary hover:bg-secondary/80 text-foreground"
          aria-label="Create new document"
        >
          <Plus />
        </Button>
        {sidebarExpanded && (
          <div className="mt-4 space-y-2">
            <div className="bg-card p-2 rounded text-foreground">
              Document 1
            </div>
            <div className="bg-card p-2 rounded text-foreground">
              Document 2
            </div>
            <div className="bg-card p-2 rounded text-foreground">
              Document 3
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
