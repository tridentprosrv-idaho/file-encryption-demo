import React, { useState, useEffect, useReducer } from "react";
import AppStatusEnum from "../components/AppStatusEnum";
import Layout from "../components/layout";
import SEO from "../components/seo";
import DownloadComponent from "../components/DownloadComponent";
import downloadDecryptUnzip from "../components/downloadDecryptUnzip";
import DecryptProc from "../components/DecryptProc";
import IBlobDataUrl from "components/IBlobDataUrl";
const DownloadPage = () => {
  const [statusClassName, setStatusClassName] = useState("neutral-status");
  const [statusMessage, setStatusMessage] = useState("Loading Files...");
  const [status, setStatus] = useState(AppStatusEnum.Loading);
  const [dataUrls, dispatch] = useReducer(
    (dataUrlArray: IBlobDataUrl[], item: IBlobDataUrl) => [
      ...dataUrlArray,
      item,
    ],
    []
  );

  useEffect(() => {
    setStatusClassName("loading-status");
    setStatus(AppStatusEnum.Loading);
    setStatusMessage("Decrypting and unzipping files...");
    try {
      downloadDecryptUnzip({
        decryptFunc: DecryptProc,
        update: (dataUrl: IBlobDataUrl) => dispatch(dataUrl),
      })
        .then(() => {
          setStatusMessage(
            `Download Complete`
          );
          setStatus(AppStatusEnum.Success);
          setStatusClassName("success-status");
        })
        .catch((reason: any) => {
          const errorMessage = `Error downloading, decrypting, or unzipping: ${reason.toString()}`;
          setStatusMessage(errorMessage);
          setStatus(AppStatusEnum.Error);
          setStatusClassName("error-status");
        });
    } catch (error) {
      const errorMessage = `Error downloading, decrypting, or unzipping: ${error.toString()}`;
      setStatusMessage(errorMessage);
      setStatus(AppStatusEnum.Error);
      setStatusClassName("error-status");
    }
  }, []);
  return (
    <Layout>
      <SEO title="Download Files" />
      <DownloadComponent
        downloadData={dataUrls}
        status={status}
        statusClassName={statusClassName}
        statusMessage={statusMessage}
      />
    </Layout>
  );
};

export default DownloadPage;
