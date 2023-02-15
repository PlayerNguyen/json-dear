import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import FastJson from "fast-json";

const EditorArea = ({ onMount }) => {
  const [deserialized, setDeserialized] = useState(undefined);

  useEffect(() => {
    console.log(deserialized);
  }, [deserialized]);
  const handleCodeChange = (e) => {
    // console.log(e);
    // console.time("");
    // new FastJson().write(e);
    // console.timeEnd("");
    setDeserialized(JSON.parse(e));
  };
  return (
    <Editor
      className="w-full h-full"
      defaultLanguage="json"
      onChange={handleCodeChange}
      onMount={onMount}
    />
  );
};

export default EditorArea;
