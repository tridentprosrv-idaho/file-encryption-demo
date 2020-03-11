import { Link } from "gatsby";
import React from "react";
import IHeaderProps from "./IHeaderProps";

export default function Header(props: IHeaderProps): JSX.Element {
  const { siteTitle } = props;
  return (
    <header>
      <div className={"header-container"}>
        <div className="app-title">
          <h1>
            <Link to="/">{siteTitle}</Link>
          </h1>
        </div>
        <div className="app-navigation">
          <ul>
            <li>
              <Link to="/Upload">Upload</Link>
            </li>
            <li>
              <Link to="/Download">Download</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}
