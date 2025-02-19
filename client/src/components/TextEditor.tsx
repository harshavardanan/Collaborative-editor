import React, { useEffect } from "react";

interface TextEditorProps {
  editorData: string;
  setEditorData: (data: string) => void;
}

export default function TextEditor({
  editorData,
  setEditorData,
}: TextEditorProps) {
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setEditorData(newText);
  };

  useEffect(() => {}, [editorData]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg p-6 space-y-4">
        <textarea
          value={editorData} 
          onChange={handleChange} 
          placeholder="Start typing here..."
          rows={12}
          className="w-full h-60 p-4 border-2 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-lg leading-relaxed resize-none"
        />
        <div className="flex justify-end text-sm text-gray-500">
          {editorData.length} characters
        </div>
      </div>
    </div>
  );
}
