import React, { Suspense } from "react";
// import TreeViewArea from ;
const TreeViewArea = React.lazy(() => import("./TreeViewArea"));
function HomeTreeView() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-row items-center">
        <div className="text-xl font-bold flex-1">Tree view</div>
      </div>

      {/* Tips */}
      {/* <div>
        <span className="text-warning">Tips: </span>
        <ul>
          <li> - Not shown your object id? Scroll it!</li>
        </ul>
      </div> */}

      <div className="mx-2">
        <Suspense fallback={<div>Loading tree view</div>}>
          <TreeViewArea />
        </Suspense>
      </div>
    </div>
  );
}

export default HomeTreeView;
