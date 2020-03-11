import React, { useState } from "react";
import AppStatusEnum from "../components/AppStatusEnum";
import HandleSubmit from "../components/handleSubmit";
import Layout from "../components/layout";
import SEO from "../components/seo";
import UploadComponent from "../components/UploadComponent";
const IndexPage = () => {
  const [statusClassName, setStatusClassName] = useState("neutral-status");
  const [statusMessage, setStatusMessage] = useState("Please Select Files");
  const [status, setStatus] = useState(AppStatusEnum.Initial);
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
        setStatusMessage("Error :" + reason.toString());
      });
  };

  return (
    <Layout>
      <SEO title="Home" />
      <UploadComponent
        status={status}
        statusClassName={statusClassName}
        statusMessage={statusMessage}
        submitHandler={submitHandler}
      />
    </Layout>
  );
};

export default IndexPage;
