import { navigate } from "@reach/router";
import React, { ReactNode } from "react";
import { SortNavbar } from "../../../components";
import useWindowSize from "../../../hooks/useWindowSize";

type HomepageLayoutProps = {
  children: ReactNode;
  path: string;
};

type WindowSize = {
  width: number;
  heigt: number;
};

const HomepageLayout = ({ children }: HomepageLayoutProps) => {
  const windowSize: WindowSize = useWindowSize();

  return (
    <>
      <div className="container container__homepage">
        <h1>Movie App</h1>
        <br />
        <div className="search-bar">
          <input
            type="text"
            onFocus={() => navigate("/searchmovies", { replace: true })}
            placeholder="Search for movies"
          />
        </div>
      </div>
      <div className={windowSize.width < 560 ? "" : "container"}>
        <SortNavbar />
      </div>
      <div className="container">
        <br />
        {children}
        <br />
      </div>
    </>
  );
};

export default HomepageLayout;
