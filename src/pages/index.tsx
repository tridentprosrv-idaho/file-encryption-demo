import React, { useState } from "react";
import { BallSpinFadeLoader } from "react-pure-loaders";
import AppStatusEnum from "../components/AppStatusEnum";
import Fail from "../components/fail";
import FileInputRef from "../components/FileInputRef";
import HandleSubmit from "../components/handleSubmit";
import Layout from "../components/layout";
import SEO from "../components/seo";
import Success from "../components/success";
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

  let renderLogic: () => JSX.Element = () => (
    <form onSubmit={submitHandler}>
      <input
        multiple={true}
        type={"file"}
        ref={FileInputRef.GetRef()}
        id={"encrypted-file"}
      />
      <button type="submit">Submit</button>
    </form>
  );
  switch (status) {
    case AppStatusEnum.Loading:
      renderLogic = () => (
        <div className="loading">
          <BallSpinFadeLoader color={"#8B008B"} loading={true} />
        </div>
      );
      break;
    case AppStatusEnum.Error:
      renderLogic = () => <Fail />;
      break;
    case AppStatusEnum.Success:
      renderLogic = () => <Success />;
      break;
    default:
      break;
  }

  return (
    <Layout>
      <SEO title="Home" />
      <span className={statusClassName}>{statusMessage}</span>
      {renderLogic()}
    </Layout>
  );
};

export default IndexPage;
