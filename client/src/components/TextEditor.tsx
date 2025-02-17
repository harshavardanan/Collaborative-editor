import React, { useEffect } from "react";

interface TextEditorProps {
  editorData: string;
  setEditorData: (data: string) => void;
}

export default function TextEditor({
  editorData,
  setEditorData,
}: TextEditorProps) {
  // Handle typing changes and propagate to parent component (and server)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setEditorData(newText); // Update the text content in the parent component
  };

  // Ensure component reflects changes from `editorData`
  useEffect(() => {
    // Whenever `editorData` changes, it will update the textarea automatically
  }, [editorData]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <div className="w-full md:w-1/2 lg:w-1/3 bg-white rounded-lg shadow-lg p-6 space-y-4">
        <textarea
          value={editorData} // Ensure it's always using the latest state
          onChange={handleChange} // Propagate changes to parent and server
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
