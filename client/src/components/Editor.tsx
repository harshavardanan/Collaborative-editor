import React from "react";
import ReactQuill, { Quill } from "react-quill";
import "react-quill/dist/quill.snow.css";

// Uncomment and install the necessary package if you need image resize functionality
// import ImageResize from "quill-image-resize-module";
// Quill.register("modules/imageResize", ImageResize);

interface EditorProps {
  value: string;
  content: (value: string) => void;
}

const Editor: React.FC<EditorProps> = ({ value, content }) => {
  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
      ["color", "script", "video"],
    ],
    // imageResize: {
    //   displaySize: true,
    // },
  };

  return <ReactQuill modules={modules} value={value} onChange={content} />;
};

export default Editor;
