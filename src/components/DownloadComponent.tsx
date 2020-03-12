import React  from "react";
import AppStatusEnum from "./AppStatusEnum";
import Loading from "./loading";
import Fail from "./fail";
import IDownloadComponentProps from "./IDownloadComponentProps";
import DownloadFiles from "./DownloadFiles";

export default function DownloadComponent(props: IDownloadComponentProps): JSX.Element {
  const { downloadData, status, statusClassName, statusMessage  } = props;

  let renderLogic: () => JSX.Element = () => <Loading />;
  switch (status) {
    case AppStatusEnum.Loading:
      renderLogic = () => <Loading />;
      break;
    case AppStatusEnum.Error:
      renderLogic = () => <Fail />;
      break;
    case AppStatusEnum.Success:
      renderLogic = () => <DownloadFiles downloadData={downloadData} />;
      break;
    default:
      break;
  }
  return (
    <React.Fragment>
      <span className={statusClassName}>{statusMessage}</span>
      {renderLogic()}
    </React.Fragment>
  );
}
