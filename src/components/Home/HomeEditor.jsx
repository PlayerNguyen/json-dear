import React, { Suspense } from "react";
import { HiClipboardCopy, HiEye, HiOutlineArchive } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { setRawTree } from "../../slices/HomeSlice";
const EditorArea = React.lazy(() => import("./EditorArea"));

function HomeEditor() {
  const { rawTree, tree } = useSelector((state) => state.home);
  const dispatch = useDispatch();

  const handleMinify = () => {
    dispatch(setRawTree(JSON.stringify(tree, null, 0)));
  };

  const handleReadable = () => {
    dispatch(setRawTree(JSON.stringify(tree, null, 2)));
  };

  const handleCopy = () => {
    // Handle copy into clipboard here
    navigator.clipboard.writeText(rawTree);
    toast("Successfully copied into clipboard");
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="mt-3 flex flex-row gap-2">
        <button
          className="btn btn-xs flex flex-row gap-3 items-center"
          onClick={handleMinify}
        >
          <i>
            <HiOutlineArchive />
          </i>
          Minify
        </button>
        <button
          className="btn btn-xs flex flex-row gap-3 items-center"
          onClick={handleReadable}
        >
          <i>
            <HiEye />
          </i>
          Readable
        </button>

        <button
          className="btn btn-xs flex flex-row gap-3 items-center"
          onClick={handleCopy}
        >
          <i>
            <HiClipboardCopy />
          </i>
          Copy
        </button>
      </div>
      <Suspense fallback={<div>Code editor initializing</div>}>
        <EditorArea className={"h-[80vh]"} />
      </Suspense>
    </div>
  );
}

export default HomeEditor;
