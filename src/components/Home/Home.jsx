import React, { useState } from "react";
import { HiViewList } from "react-icons/hi";
import { Link, Outlet, useLocation } from "react-router-dom";

function Home() {
  const location = useLocation();
  const [tabs] = useState([
    {
      value: "Editor",
      url: "/",
    },
    {
      value: "Tree view",
      url: "/tree-view",
    },
    {
      value: "Minified view",
      url: "/minified-view",
    },
  ]);

  return (
    <div className="home">
      {/* Navbar */}
      <div className="w-full sticky bg-base-200 flex flex-row px-6 py-6 shadow-sm top-0 z-50 items-center gap-4">
        <div className="lg:hidden">
          <label className="btn btn-ghost btn-md text-xl" htmlFor="main-drawer">
            <HiViewList />
          </label>
        </div>
        <div>
          <h1 className="text-xl font-bold">.json</h1>
        </div>
      </div>

      {/* Editor Wrapper */}
      <div className="flex flex-col max-h-[calc(100vh-64px)]">
        {/* Export each tab for interaction */}
        <div className="tabs">
          {tabs.map((tab, idx) => {
            // If active, add tab-active into classList
            let classList = "tab";
            if (location.pathname === tab.url) {
              classList += " tab-active";
            }

            // Render the tab of items
            return (
              <Link className={classList} key={idx} to={tab.url}>
                {tab.value}
              </Link>
            );
          })}
        </div>

        {/* Export body */}
        <div className="px-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Home;
