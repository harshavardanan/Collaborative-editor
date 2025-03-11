
import { Editor } from "@tinymce/tinymce-react";

interface TextEditorProps {
  editorData: string;
  setEditorData: (data: string) => void;
}

export default function TextEditor({
  editorData,
  setEditorData,
}: TextEditorProps) {
  return (
    <div className="flex justify-center items-center h-full w-full bg-gray-50 p-4">
      <div className="w-full bg-white rounded-lg shadow-lg p-6 space-y-4">
        <Editor
          apiKey="wlwfaiug4zrnnn2z7rmqpk894wl70htq21fwa54fboltqkem" 
          value={editorData}
          onEditorChange={(content) => setEditorData(content)}
          init={{
            height: 500,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen",
              "insertdatetime media table paste code help wordcount",
            ],
            toolbar:
              "undo redo | formatselect | bold italic underline | " +
              "alignleft aligncenter alignright alignjustify | " +
              "bullist numlist outdent indent | link image | removeformat",
          }}
        />
      </div>
    </div>
  );
}
