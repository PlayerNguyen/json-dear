import React, { Suspense } from "react";
const EditorArea = React.lazy(() => import("./EditorArea"));

function HomeEditor() {
  return (
    <div>
      {/* <div className="px-4 py-6 text-xl font-bold">Editor</div> */}
      <Suspense fallback={<div>Code editor initializing</div>}>
        <EditorArea className={"h-[80vh]"} />
      </Suspense>
    </div>
  );
}

export default HomeEditor;
