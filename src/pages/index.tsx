import React, { useState } from "react";
import AppStatusEnum from "../components/AppStatusEnum";
import HandleSubmit from "../components/handleSubmit";
import Layout from "../components/layout";
import SEO from "../components/seo";
import AppStatus from "../components/AppStatus";
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
        setStatusMessage("Error :" + JSON.stringify(reason));
      });
  };

  return (
    <Layout>
      <SEO title="Home" />
      <AppStatus
        status={status}
        statusClassName={statusClassName}
        statusMessage={statusMessage}
        submitHandler={submitHandler}
      />
    </Layout>
  );
};

export default IndexPage;
