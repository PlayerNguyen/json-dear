import React, { useState } from "react";
import "./../styles/tw.css";
import { HiCode } from "react-icons/hi";
import { Link, Route, Routes } from "react-router-dom";
import Home from "../components/Home/Home";
import HomeEditor from "../components/Home/HomeEditor";
import HomeTreeView from "../components/Home/HomeTreeView";
import HomeMinifiedView from "../components/Home/HomeMinifiedView";

function App() {
  const [sideBarItems] = useState(
    Array(30).fill({
      name: "Raw file",
      icon: <HiCode />,
    })
  );

  return (
    <div className="drawer drawer-mobile font-mono">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content">
        {/* Page content here */}
        <Routes>
          <Route path={"/"} element={<Home />}>
            <Route path="" index element={<HomeEditor />}></Route>
            <Route path="/tree-view" element={<HomeTreeView />}></Route>
            <Route path="/minified-view" element={<HomeMinifiedView />} />
          </Route>
        </Routes>
        {/* <label
          htmlFor="my-drawer-2"
          className="btn btn-primary drawer-button lg:hidden"
        >
          Open drawer
        </label> */}
      </div>
      <div className="drawer-side overflow-auto">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <div className="relative bg-base-200">
          <div className="px-6 py-6 sticky top-0 backdrop-blur bg-opacity-90 z-40 shadow-sm font-bold text-2xl">
            <Link to={"/"}>Json Read [::-1]</Link>
          </div>
          <aside className="bg-base-200">
            <ul className="menu w-80 text-base-content">
              {/* Sidebar content */}
              {sideBarItems &&
                sideBarItems.map((item, idx) => {
                  return (
                    <li className="mx-4" key={idx}>
                      <a className="rounded-xl">
                        {item.icon} {item.name}
                      </a>
                    </li>
                  );
                })}
            </ul>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default App;
