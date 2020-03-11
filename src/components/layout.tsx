/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React, { useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./layout.css"
import ILayoutProps from "./ILayoutProps"

export default function Layout(props: ILayoutProps): JSX.Element {
  const { children } = props
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  useEffect(()=>{
    const msalScript  = document.createElement("script");
    msalScript.src = "https://alcdn.msauth.net/lib/1.2.1/js/msal.js";
    msalScript.async = true;
    //msalScript.integrity="sha384-9TV1245fz+BaI+VvCjMYL0YDMElLBwNS84v3mY57pXNOt6xcUYch2QLImaTahcOP";
    msalScript["crossorigin"]="anonymous";
    
    const headElement = document.getElementsByTagName("head")[0];
    headElement.appendChild(msalScript);
  }, [])
  return (
    <>
      <Header siteTitle={data.site.siteMetadata.title} />
      <div className="container">
        <main>{children}</main>
        <footer>© {new Date().getFullYear()} Idaho Edokpayi</footer>
      </div>
    </>
  )
}
