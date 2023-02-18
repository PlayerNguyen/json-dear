import React, { useState } from "react";
import { HiArrowRight, HiChevronDown, HiChevronLeft } from "react-icons/hi";
import { useSelector } from "react-redux";

function TokenUnit({ data }) {
  // console.log(data);
  return (
    <div>
      {String(data)} <span className="text-gray-600">({typeof data})</span>
    </div>
  );
}

function TokenObjectPair({ keyName, value }) {
  return typeof value === "object" ? (
    <div className="">
      <span className="text-info">{keyName}: </span>
      <div className="ml-4">
        <MinifiedView data={value} />
      </div>
    </div>
  ) : (
    <div className="flex flex-row gap-2">
      <span className="text-accent">{keyName}</span>
      <span className="text-base-100"> {": "} </span>
      <span className="">
        <MinifiedView data={value} />
      </span>
    </div>
  );
}

function TokenArrayItem({ idx, data }) {
  return typeof data === "object" ? (
    // Break-line, use for array or another object
    <>
      <div>{idx}:</div>
      <div className="ml-2 pl-2 border-l border-gray-600">
        <MinifiedView data={data} />
      </div>
    </>
  ) : (
    // Inline, use for non-object types
    <div className="flex flex-row items-center gap-2">
      <div className="text-base">{idx}</div>
      <div>
        <HiArrowRight />
      </div>
      <div>
        <MinifiedView data={data} />
      </div>
    </div>
  );
}

function TokenArray({ data }) {
  const [expand, setExpand] = useState(false);

  if (!data || !Array.isArray(data)) {
    throw new Error("Unexpected data value");
  }

  const handleOnChange = (e) => {
    setExpand(e.target.checked);
  };

  return (
    <div className="token-array-wrapper">
      <div className="flex flex-row items-center">
        <span className="text-warning">array[{data.length}]</span>
        <label className="swap swap-rotate">
          <input type="checkbox" onChange={handleOnChange} />

          <i className="swap-off">
            <HiChevronLeft />
          </i>

          <i className="swap-on">
            <HiChevronDown />
          </i>
        </label>
      </div>
      {expand && (
        <div className="ml-4">
          {data.map((datum, idx) => {
            {
              /* return <MinifiedView data={datum} key={idx} />; */
            }
            return <TokenArrayItem data={datum} key={idx} idx={idx} />;
          })}
        </div>
      )}
    </div>
  );
}

function TokenObject({ data }) {
  return (
    <div>
      {Object.keys(data).map((keyItem, idx) => {
        return (
          <>
            <TokenObjectPair
              keyName={keyItem}
              value={data[keyItem]}
              key={idx}
            />
          </>
        );
      })}
    </div>
  );
}

function MinifiedView({ data }) {
  // If data is an array
  if (Array.isArray(data)) {
    return (
      <>
        <TokenArray data={data} />
      </>
    );
  }

  // if data is an object
  if (typeof data === "object") {
    return (
      <>
        <TokenObject data={data} />
      </>
    );
  }

  return <TokenUnit data={data} />;
  // return (
  //   <div className="">
  //     <div>Hi = world</div>
  //     <div>
  //       <span>array[9]</span>
  //       <div className="ml-4 border-l-2">
  //         <div>[0] = a</div>
  //         <div>[1] = b</div>

  //         <div className="ml-4 border-l-2">
  //           <div>array[0] = a</div>
  //           <div>array[1] = b</div>
  //           <div className="ml-4 border-l-2">
  //             <div>array[0] = a</div>
  //             <div>array[1] = b</div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //   </div>
  // );
}

function HomeMinifiedView() {
  const { tree, rawTree } = useSelector((state) => state.home);
  return (
    <div className="flex flex-col">
      {/* Title */}
      <div>Minified tree view</div>
      <div className="px-2 py-2 rounded-xl flex flex-row gap-2">
        <span>Root: </span>
        {tree !== undefined && <MinifiedView data={tree} />}
      </div>
    </div>
  );
}

export default HomeMinifiedView;
