import React, { useState, useRef, useEffect } from "react";
import { Sidebar } from "./Sidebar";
import { MainEditor } from "./MainEditor";
import { RightPanel } from "./RightPanel";
import type { TextEditorState } from "./types";

export default function TextEditor() {
  const [state, setState] = useState<TextEditorState>({
    darkMode: false,
    sidebarExpanded: true,
    chatOpen: false,
    documentName: "Untitled",
    wordCount: 0,
    characterCount: 0,
    saveStatus: "Saved",
    rightPanelWidth: 256,
    fontSize: 16,
    fontFamily: "Arial",
  });

  const resizerRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);

  const [text, setText] = useState("");

  const toggleDarkMode = () => {
    setState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const toggleSidebar = () => {
    setState((prev) => ({ ...prev, sidebarExpanded: !prev.sidebarExpanded }));
  };

  const toggleChat = () => {
    setState((prev) => ({ ...prev, chatOpen: !prev.chatOpen }));
  };

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    const words = newText.trim() ? newText.trim().split(/\s+/).length : 0;
    const chars = newText.length;
    setState((prev) => ({
      ...prev,
      wordCount: words,
      characterCount: chars,
      saveStatus: "Unsaved",
    }));
    setTimeout(
      () => setState((prev) => ({ ...prev, saveStatus: "Saved" })),
      2000
    );
  };

  useEffect(() => {
    const resizer = resizerRef.current;
    const rightPanel = rightPanelRef.current;
    let x = 0;
    let w = 0;

    const mouseDownHandler = (e: MouseEvent) => {
      x = e.clientX;
      const styles = window.getComputedStyle(rightPanel!);
      w = parseInt(styles.width, 10);
      document.addEventListener("mousemove", mouseMoveHandler);
      document.addEventListener("mouseup", mouseUpHandler);
    };

    const mouseMoveHandler = (e: MouseEvent) => {
      const dx = e.clientX - x;
      const newWidth = Math.max(200, Math.min(w - dx, 600));
      setState((prev) => ({ ...prev, rightPanelWidth: newWidth }));
    };

    const mouseUpHandler = () => {
      document.removeEventListener("mousemove", mouseMoveHandler);
      document.removeEventListener("mouseup", mouseUpHandler);
    };

    resizer?.addEventListener("mousedown", mouseDownHandler);

    return () => {
      resizer?.removeEventListener("mousedown", mouseDownHandler);
    };
  }, []);

  return (
    <div className={`flex flex-col h-screen ${state.darkMode ? "dark" : ""}`}>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          sidebarExpanded={state.sidebarExpanded}
          toggleSidebar={toggleSidebar}
        />
        <MainEditor
          handleTextChange={handleTextChange}
          text={text}
          documentName={state.documentName}
          setDocumentName={(name) =>
            setState((prev) => ({ ...prev, documentName: name }))
          }
          inputWidth={state.rightPanelWidth}
          wordCount={state.wordCount}
          characterCount={state.characterCount}
          darkMode={state.darkMode}
          saveStatus={state.saveStatus}
          fontSize={state.fontSize}
          setFontSize={(size) =>
            setState((prev) => ({ ...prev, fontSize: size }))
          }
          fontFamily={state.fontFamily}
          setFontFamily={(font) =>
            setState((prev) => ({ ...prev, fontFamily: font }))
          }
        />
        <RightPanel
          rightPanelWidth={state.rightPanelWidth}
          resizerRef={resizerRef}
          rightPanelRef={rightPanelRef}
          chatOpen={state.chatOpen}
          toggleChat={toggleChat}
          darkMode={state.darkMode}
          toggleDarkMode={toggleDarkMode}
        />
      </div>
    </div>
  );
}
