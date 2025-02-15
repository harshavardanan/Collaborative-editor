import { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Code,
  List,
  ListOrdered,
  Heading,
  Download,
} from "lucide-react";
import jsPDF from "jspdf";

export default function TextEditor() {
  const [showMenu, setShowMenu] = useState(false);
  const [commandIndex, setCommandIndex] = useState(0);

  const editor = useEditor({
    extensions: [StarterKit, Underline],
    content:
      localStorage.getItem("editorContent") ||
      "<p>Type '/' for commands...</p>",
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      setShowMenu(text.endsWith("/"));

      // Auto-save to LocalStorage
      localStorage.setItem("editorContent", editor.getHTML());
    },
  });

  const commands = [
    {
      name: "Heading 1",
      action: () => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
      icon: <Heading size={16} />,
    },
    {
      name: "Heading 2",
      action: () => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
      icon: <Heading size={16} />,
    },
    {
      name: "Bullet List",
      action: () => editor?.chain().focus().toggleBulletList().run(),
      icon: <List size={16} />,
    },
    {
      name: "Ordered List",
      action: () => editor?.chain().focus().toggleOrderedList().run(),
      icon: <ListOrdered size={16} />,
    },
    {
      name: "Code Block",
      action: () => editor?.chain().focus().toggleCodeBlock().run(),
      icon: <Code size={16} />,
    },
  ];

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!showMenu) return;

      if (event.key === "ArrowDown") {
        setCommandIndex((prev) => (prev + 1) % commands.length);
        event.preventDefault();
      } else if (event.key === "ArrowUp") {
        setCommandIndex(
          (prev) => (prev - 1 + commands.length) % commands.length
        );
        event.preventDefault();
      } else if (event.key === "Enter") {
        commands[commandIndex].action();
        setShowMenu(false);
        event.preventDefault();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [showMenu, commandIndex]);

  // Save content to backend
  const saveToBackend = async () => {
    if (!editor) return;
    const content = editor.getHTML();

    await fetch("http://localhost:5000/save", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });

    alert("Content saved successfully!");
  };

  // Load content from backend
  const loadFromBackend = async () => {
    const response = await fetch("http://localhost:5000/load");
    const data = await response.json();
    editor?.commands.setContent(data.content || "");
  };

  // Export to Markdown
  const exportMarkdown = () => {
    if (!editor) return;
    const markdown = editor.getText();
    const blob = new Blob([markdown], { type: "text/markdown" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "document.md";
    a.click();
  };

  // Export to HTML
  const exportHTML = () => {
    if (!editor) return;
    const html = editor.getHTML();
    const blob = new Blob([html], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "document.html";
    a.click();
  };

  // Download as PDF
  const exportPDF = () => {
    if (!editor) return;
    const doc = new jsPDF();
    doc.text(editor.getText(), 10, 10);
    doc.save("document.pdf");
  };

  if (!editor) return <div className="text-center p-4">Loading Editor...</div>;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow-md relative">
      {/* Toolbar */}
      <div className="border-b p-2 flex space-x-2 bg-gray-100 rounded-t-lg">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded-md ${
            editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <Bold size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded-md ${
            editor.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <Italic size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded-md ${
            editor.isActive("underline") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className="p-2 rounded-md hover:bg-gray-200"
        >
          <List size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className="p-2 rounded-md hover:bg-gray-200"
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className="p-2 rounded-md hover:bg-gray-200"
        >
          <Heading size={16} />
        </button>
      </div>

      {/* Editor Content */}
      <div className="p-4">
        <EditorContent
          editor={editor}
          className="prose max-w-none focus:outline-none"
        />
      </div>

      {/* Slash Command Menu */}
      {showMenu && (
        <div className="absolute bg-gray-900 text-white p-2 rounded-lg shadow-lg w-48 mt-2">
          {commands.map((cmd, index) => (
            <button
              key={cmd.name}
              onClick={() => {
                cmd.action();
                setShowMenu(false);
              }}
              className={`flex items-center space-x-2 p-2 w-full text-left rounded-md ${
                commandIndex === index ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              {cmd.icon}
              <span>{cmd.name}</span>
            </button>
          ))}
        </div>
      )}

      {/* Save & Export Buttons */}
      <div className="flex justify-between p-4 border-t bg-gray-100 rounded-b-lg">
        <button
          onClick={exportPDF}
          className="p-2 bg-red-500 text-white rounded-md flex items-center"
        >
          <Download size={16} className="mr-1" /> PDF
        </button>
      </div>
    </div>
  );
}
