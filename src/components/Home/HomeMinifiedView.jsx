import React, { useState } from "react";
import { HiArrowRight, HiChevronDown, HiChevronLeft } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

/**
 * Test if the provide string is url or not.
 * @param {*} provider a string to check
 * @returns true if the provider string is url, false otherwise
 */
function isUrl(provider) {
  const matcher = new RegExp(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/
  );
  return matcher.test(provider);
}

function TokenUnit({ data }) {
  console.log(typeof data);
  return (
    <div className="flex flex-row gap-2">
      {typeof data === "string" ? (
        // String with url
        isUrl(data) ? (
          <Link to={data} target="_blank">
            <span className="text-green-600 underline">'{String(data)}'</span>
          </Link>
        ) : (
          // String with non-url
          <span className="text-green-600">'{String(data)}'</span>
        )
      ) : typeof data === "number" ? ( // Represent a number
        <span className="text-indigo-600">{String(data)}</span>
      ) : (
        // Any other type
        <span className="">{String(data)}</span>
      )}

      <span className="text-gray-600">({typeof data})</span>
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
      <span className="text-neutral-400"> {": "} </span>
      <span className="">
        <MinifiedView data={value} />
      </span>
    </div>
  );
}

function TokenArrayItem({ idx, data }) {
  return typeof data === "object" ? (
    // Break-line, use for array or another object
    <div>
      <div>{idx}:</div>
      <div className="ml-2 pl-2 border-l border-gray-600">
        <MinifiedView data={data} />
      </div>
    </div>
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
  const [limit, setLimit] = useState(100);
  const JUMP_STEP_SIZE = 100; // The number of items will show on one-click
  // const [page, setPage] = useState(0);

  if (!data || !Array.isArray(data)) {
    throw new Error("Unexpected data value");
  }

  const handleOnChange = (e) => {
    setExpand(e.target.checked);
  };

  const handleLoadMoreItems = (e) => {
    setLimit((l) => l + JUMP_STEP_SIZE);
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
          {data
            .filter((_i, _idx) => _idx < limit)
            .map((datum, idx) => {
              {
                /* return <MinifiedView data={datum} key={idx} />; */
              }
              return <TokenArrayItem data={datum} key={idx} idx={idx} />;
            })}

          {limit < data.length && (
            <button
              className="btn btn-ghost btn-sm"
              onClick={handleLoadMoreItems}
            >
              Load more...
            </button>
          )}
        </div>
      )}
    </div>
  );
}

function TokenObject({ data }) {
  const dataKeys = Object.keys(data);
  return (
    <div>
      {dataKeys.length === 0 ? (
        <div className="b-gray-600">Empty object</div>
      ) : (
        <>
          {dataKeys.map((keyItem, idx) => {
            return (
              <TokenObjectPair
                keyName={keyItem}
                value={data[keyItem]}
                key={idx}
              />
            );
          })}
        </>
      )}
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
}

function HomeMinifiedView() {
  const { tree, rawTree } = useSelector((state) => state.home);

  return (
    <div className="flex flex-col">
      {/* Title */}
      <div className="font-bold text-2xl">Minified tree view</div>
      <div className=" py-2 rounded-xl flex flex-row gap-2 w-full overflow-auto">
        <span>Root: </span>
        <div>{tree !== undefined && <MinifiedView data={tree} />}</div>
      </div>
    </div>
  );
}

export default HomeMinifiedView;
