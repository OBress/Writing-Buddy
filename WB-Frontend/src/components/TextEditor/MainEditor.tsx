import React, { useState, useRef } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TextStyle from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import Highlight from "@tiptap/extension-highlight";
import Color from "@tiptap/extension-color";
import ListItem from "@tiptap/extension-list-item";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import CodeBlock from "@tiptap/extension-code-block";
import Blockquote from "@tiptap/extension-blockquote";
import Heading from "@tiptap/extension-heading";
import FontSize from "tiptap-extension-font-size";

interface MainEditorProps {
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  documentName: string;
  setDocumentName: (name: string) => void;
  inputWidth: number;
  wordCount: number;
  characterCount: number;
  saveStatus: string;
  text: string;
  darkMode: boolean;
  fontSize: number;
  setFontSize: (size: number) => void;
  fontFamily: string;
  setFontFamily: (font: string) => void;
}

export function MainEditor({
  handleTextChange,
  documentName,
  setDocumentName,
  inputWidth,
  wordCount,
  characterCount,
  saveStatus,
  text,
  darkMode,
  fontSize,
  setFontSize,
  fontFamily,
  setFontFamily,
}: MainEditorProps) {
  const [titleInputWidth, setTitleInputWidth] = useState(0);
  const measureRef = useRef<HTMLSpanElement>(null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      FontFamily,
      FontSize,
      Underline,
      TextAlign.configure({
        types: ["heading", "paragraph", "bulletList", "orderedList"],
      }),
      Highlight,
      Color,
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "prose-li:marker:text-foreground",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "prose-li:marker:text-foreground",
        },
      }),
      CodeBlock,
      Blockquote,
      Heading.configure({
        levels: [1, 2, 3],
      }),
    ],
    content: text,
    onUpdate: ({ editor }) => {
      const content = editor.getText();
      const event = {
        target: { value: content },
      } as React.ChangeEvent<HTMLTextAreaElement>;
      handleTextChange(event);
    },
    editorProps: {
      attributes: {
        class:
          "w-full h-full min-h-[calc(100vh-10rem)] focus:outline-none text-foreground prose prose-sm dark:prose-invert max-w-none",
        spellcheck: "false",
      },
    },
  });

  const handleDocNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDocumentName(e.target.value);
    if (measureRef.current) {
      const newWidth = Math.min(
        Math.max(measureRef.current.offsetWidth + 32, 150),
        300
      );
      setTitleInputWidth(newWidth);
    }
  };

  const fontOptions = [
    "Arial",
    "Times New Roman",
    "Courier New",
    "Georgia",
    "Verdana",
    "Inter",
    "Comic Sans MS",
    "Helvetica",
    "Calibri",
    "Roboto",
    "Open Sans",
  ];

  return (
    <div className="flex-1 flex flex-col overflow-auto bg-background">
      <div className="sticky top-0 flex justify-between items-center p-4 border-b border-border bg-background z-10">
        <div className="relative min-w-[150px] max-w-[300px]">
          <span
            ref={measureRef}
            className="invisible absolute whitespace-pre"
            style={{
              fontFamily: "inherit",
              fontSize: "inherit",
              fontWeight: "inherit",
            }}
          >
            {documentName || "Untitled Document"}
          </span>

          <input
            type="text"
            value={documentName}
            placeholder="Untitled Document"
            onChange={handleDocNameChange}
            className="w-full bg-transparent border border-border rounded-md px-1.5 py-0.5 focus:outline-none focus:ring-2 focus:ring-primary/20 text-lg font-semibold text-foreground transition-all duration-200 ease-out overflow-hidden text-ellipsis"
            style={{ width: `${titleInputWidth}px` }}
            aria-label="Document name"
          />
        </div>

        <div className="flex items-center gap-2">
          <select
            value={fontFamily}
            onChange={(e) => {
              setFontFamily(e.target.value);
              editor?.chain().focus().setFontFamily(e.target.value).run();
            }}
            className="bg-background border border-border rounded-md px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-foreground"
          >
            {fontOptions.map((font) => (
              <option
                key={font}
                value={font}
                className="bg-background text-foreground"
              >
                {font}
              </option>
            ))}
          </select>

          <input
            type="number"
            value={fontSize}
            onChange={(e) => {
              const size = Number(e.target.value);
              setFontSize(size);
              editor?.chain().focus().setFontSize(`${size}px`).run();
            }}
            min="8"
            max="72"
            className="bg-background border border-border rounded-md w-16 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-primary/20 text-sm text-foreground"
            aria-label="Font size"
          />

          <div className="flex items-center gap-1 border-l border-border px-2">
            <button
              onClick={() => editor?.chain().focus().toggleBulletList().run()}
              className={`p-1.5 rounded ${
                editor?.isActive("bulletList")
                  ? "bg-primary/20"
                  : "hover:bg-primary/10"
              }`}
              title="Bullet List"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="9" y1="6" x2="20" y2="6" />
                <line x1="9" y1="12" x2="20" y2="12" />
                <line x1="9" y1="18" x2="20" y2="18" />
                <circle cx="4" cy="6" r="2" />
                <circle cx="4" cy="12" r="2" />
                <circle cx="4" cy="18" r="2" />
              </svg>
            </button>
            <button
              onClick={() => editor?.chain().focus().toggleOrderedList().run()}
              className={`p-1.5 rounded ${
                editor?.isActive("orderedList")
                  ? "bg-primary/20"
                  : "hover:bg-primary/10"
              }`}
              title="Numbered List"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="10" y1="6" x2="21" y2="6" />
                <line x1="10" y1="12" x2="21" y2="12" />
                <line x1="10" y1="18" x2="21" y2="18" />
                <path d="M4 6h1v4" />
                <path d="M4 10h2" />
                <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1" />
              </svg>
            </button>
          </div>

          <select
            onChange={(e) =>
              editor?.chain().focus().setTextAlign(e.target.value).run()
            }
            className="bg-background border border-border rounded px-2 py-1 text-sm"
          >
            <option value="left">Left</option>
            <option value="center">Center</option>
            <option value="right">Right</option>
            <option value="justify">Justify</option>
          </select>
        </div>

        <div className="text-sm text-muted-foreground">
          {wordCount} words | {characterCount} characters |{" "}
          {saveStatus || "Not Saved"}
        </div>
      </div>

      <div className="flex-1 h-full p-8">
        <EditorContent editor={editor} className="h-full" />
      </div>
    </div>
  );
}
