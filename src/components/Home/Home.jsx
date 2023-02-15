import React, { Suspense, useRef } from "react";
const EditorArea = React.lazy(() => import("./EditorArea"));

function Home() {
  // const editorRef = useRef(null);

  return (
    <div className="home">
      {/* Navbar */}
      <div className="w-full sticky bg-base-200 flex flex-row px-6 py-6 shadow-sm">
        <h1 className="text-2xl font-bold">Load from raw .json file</h1>
      </div>

      {/* Editor Wrapper */}
      <div className="px-6 py-18 gap-6">
        <div className="">Safe area for code editor</div>
        {/* Code Editor */}

        <div className="">
          <div className="relative bg-base-200 min-h-[90vh]">
            <Suspense fallback={<div>Code editor initializing</div>}>
              <EditorArea />
            </Suspense>
          </div>
          <div className="w-1/2">Tree view</div>
        </div>
      </div>
    </div>
  );
}

export default Home;
