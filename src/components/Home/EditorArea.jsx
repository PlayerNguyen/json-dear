import Editor from "@monaco-editor/react";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setError, setRawTree, setTree } from "../../slices/HomeSlice";

const EditorArea = ({ className }) => {
  // const []

  const { tree, error, rawTree } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const handleOnChange = (context) => {
    try {
      const changedTree = JSON.parse(context);
      dispatch(setTree(changedTree));
      // Reset the error state
      dispatch(setError(undefined));
    } catch (err) {
      dispatch(setError(err));
    } finally {
      dispatch(setRawTree(context));
    }
  };

  return (
    <div className="flex flex-col gap-3">
      <div className="text-error-content h-8">
        {error !== undefined && <span>Error detector: {error.message}</span>}
      </div>

      <div>
        <Editor
          value={rawTree}
          defaultValue={JSON.stringify(tree, null, 2)}
          theme="vs-dark"
          defaultLanguage="json"
          onChange={handleOnChange}
          className={className}
        />
      </div>
    </div>
  );
};

export default EditorArea;
