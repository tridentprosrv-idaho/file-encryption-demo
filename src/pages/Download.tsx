import React, { useState } from "react";
import AppStatusEnum from "../components/AppStatusEnum";
import Layout from "../components/layout";
import SEO from "../components/seo";
import DownloadComponent from "components/DownloadComponent";
const DownloadPage = () => {
  const [statusClassName, setStatusClassName] = useState("neutral-status");
  const [statusMessage, setStatusMessage] = useState("Loading Files...");
  const [status, setStatus] = useState(AppStatusEnum.Loading);
  /*
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatusClassName("loading-status");
    setStatus(AppStatusEnum.Loading);
    setStatusMessage("Uploading files...");
    HandleSubmit()
      .then(() => {
        setStatus(AppStatusEnum.Success);
        setStatusClassName("success-status");
        setStatusMessage("Your files have been uploaded");
      })
      .catch((reason: any) => {
        setStatus(AppStatusEnum.Error);
        setStatusClassName("error-status");
        setStatusMessage("Error :" + JSON.stringify(reason));
      });
  };*/

  return (
    <Layout>
      <SEO title="Download Files" />
      <DownloadComponent
        status={status}
        statusClassName={statusClassName}
        statusMessage={statusMessage}
      />
    </Layout>
  );
};

export default DownloadPage;
