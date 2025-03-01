import React, { useState, useEffect } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

interface TextEditorProps {
  editorData: string;
  setEditorData: (data: string) => void;
}

export default function TextEditor({
  editorData,
  setEditorData,
}: TextEditorProps) {
  const editor = useEditor({
    extensions: [StarterKit],
    content: editorData,
    onUpdate: ({ editor }) => {
      setEditorData(editor.getHTML());
    },
  });

  const [userData, setUserData] = useState<any>(null);

  useEffect(() => {
    fetch("http://localhost:5000/auth/user", {
      method: "GET",
      credentials: "include", // Ensures cookies/session are included
    })
      .then((res) => {
        if (!res.ok) throw new Error("User not authenticated");
        return res.json();
      })
      .then((data) => setUserData(data))
      .catch((err) => console.error("Error fetching user:", err));
  }, []);

  console.log(userData);
  useEffect(() => {
    if (editor && editorData !== editor.getHTML()) {
      editor.commands.setContent(editorData);
    }
  }, [editorData]);

  if (!editor) return <p>Loading editor...</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full md:w-2/3 lg:w-1/2 bg-white rounded-lg shadow-lg p-6 space-y-4">
        <EditorContent
          editor={editor}
          className="border border-gray-300 rounded-lg p-4"
        />
        <div className="flex justify-end text-sm text-gray-500">
          {editor.getText().length} characters
        </div>
      </div>
    </div>
  );
}
