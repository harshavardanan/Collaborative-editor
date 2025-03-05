import React, { useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import Table from "@tiptap/extension-table";
import TableRow from "@tiptap/extension-table-row";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TextAlign from "@tiptap/extension-text-align";
import TextStyle from "@tiptap/extension-text-style";
import { Color } from "@tiptap/extension-color";
import Highlight from "@tiptap/extension-highlight";

interface TextEditorProps {
  editorData: string;
  setEditorData: (data: string) => void;
}

export default function TextEditor({
  editorData,
  setEditorData,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: "Write something amazing...",
      }),
      Underline,
      Link.configure({
        openOnClick: false,
      }),
      Image,
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableCell,
      TableHeader,
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      Highlight.configure({
        multicolor: true,
      }),
    ],
    content: editorData,
    onUpdate: ({ editor }) => {
      setEditorData(editor.getHTML());
    },
  });

  useEffect(() => {
    if (editor && editorData !== editor.getHTML()) {
      editor.commands.setContent(editorData);
    }
  }, [editorData]);

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-50 p-4">
      <div className="w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        {/* Toolbar */}
        <div className="flex flex-wrap gap-2 border-b pb-4">
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={`p-2 rounded ${
              editor.isActive("bold") ? "bg-blue-500 text-white" : "bg-gray-200"
            }`}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={`p-2 rounded ${
              editor.isActive("italic")
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            className={`p-2 rounded ${
              editor.isActive("underline")
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Underline
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            className={`p-2 rounded ${
              editor.isActive("heading", { level: 1 })
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            H1
          </button>
          <button
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            className={`p-2 rounded ${
              editor.isActive("heading", { level: 2 })
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            H2
          </button>
          <button
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            className={`p-2 rounded ${
              editor.isActive("bulletList")
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Bullet List
          </button>
          <button
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            className={`p-2 rounded ${
              editor.isActive("orderedList")
                ? "bg-blue-500 text-white"
                : "bg-gray-200"
            }`}
          >
            Numbered List
          </button>
          <button
            onClick={() => editor.chain().focus().setColor("#ff0000").run()}
            className="p-2 rounded bg-gray-200"
          >
            Red Text
          </button>
          <button
            onClick={() =>
              editor.chain().focus().setHighlight({ color: "#ffff00" }).run()
            }
            className="p-2 rounded bg-gray-200"
          >
            Highlight
          </button>
        </div>
        <EditorContent
          editor={editor}
          className="prose prose-sm sm:prose lg:prose-lg xl:prose-xl focus:outline-none border-none w-full"
        />
        <div className="flex justify-end text-sm text-gray-500">
          {editor.getText().length} characters
        </div>
      </div>
    </div>
  );
}
