import React, { useState } from "react";
import { HiChevronDown, HiChevronLeft } from "react-icons/hi";
import { useSelector } from "react-redux";

function TreeViewArrayItem({ title, data }) {
  const [isExpanded, setExpanded] = useState(false);

  return (
    <div className="flex flex-col border border-base-300 text-base-content my-2">
      {/* Key render */}
      <div
        className=" cursor-pointer px-4 py-2 shadow-md flex flex-row items-center flex-1"
        onClick={() => setExpanded(!isExpanded)}
      >
        <div className="flex-1">
          <b>{title}</b> <span className="">({typeof data})</span>
        </div>
        {typeof data === "object" && (
          <div className="lowercase text-sm">
            {isExpanded ? <HiChevronDown /> : <HiChevronLeft />}
          </div>
        )}
      </div>
      {/* Small items */}
      {typeof data === "object" ? (
        isExpanded && (
          <div className="pr-1">
            <TreeViewWalker data={data} />
          </div>
        )
      ) : (
        <div className="pl-12 border-l-2 border-secondary text-content-base">
          <TreeViewWalker data={data} />
        </div>
      )}
    </div>
  );
}

function TreeViewObjectValue({ data }) {
  return <div className="font-light text-base-content">{"= " + data}</div>;
}

function TreeViewWalker({ data }) {
  // object is an array
  if (Array.isArray(data)) {
    return (
      <div>
        {/* Array parent */}
        <div className="text-accent font-bold">
          {"[] Array"} <span className="text-xs">({data.length} items)</span>
        </div>

        {data.map((datum, idx) => {
          return <TreeViewArrayItem key={idx} title={idx} data={datum} />;
        })}
      </div>
    );
  }

  // object is not an array
  if (typeof data === "object") {
    const keyList = Object.keys(data);
    // List all keys
    return keyList.map((keyName, _idx) => {
      return (
        <div
          key={_idx}
          className="flex flex-col items-start px-2 py-2 text-sm hover:border-r-2 hover:border-primary transition-all ease-linear"
        >
          {/* Key name */}
          <div className="font-bold mr-4 text-base-content overflow-x-auto overflow-hidden">
            {"{/} " + keyName}
          </div>

          {/* Value */}
          <div className=" border-l-2 border-base-300 pl-4 w-11/12 text-base-content hover:text-base-content">
            <TreeViewWalker data={data[keyName]} />
          </div>
          <br />
        </div>
      );
    });
  } else {
    return <TreeViewObjectValue data={data} />;
  }
}

function TreeViewArea() {
  const { tree, error } = useSelector((state) => state.home);

  return error !== undefined ? (
    <div className="flex flex-col gap-4">
      <div>There was an error in your provided JSON</div>
      <div className="mockup-code">
        <pre data-prefix="?" className="text-error">
          <code>{error.message}</code>
        </pre>
      </div>
    </div>
  ) : (
    <div className="min-h-[80vh] min-w-full overflow-auto w-full transition-all ease-linear">
      <TreeViewWalker data={tree} />
    </div>
  );
}

export default TreeViewArea;
