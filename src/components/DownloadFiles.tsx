import React from "react";
import IDownloadFilesProps from "./IDownloadFilesProps";
import DownloadFilesImpl from "./DownloadFilesImpl";
import Empty from "./empty";

export default function DownloadFiles(props: IDownloadFilesProps): JSX.Element {
  const { downloadData } = props;
  return downloadData.length > 0 ? (
    <DownloadFilesImpl downloadData={downloadData} />
  ) : (
    <Empty />
  );
}
