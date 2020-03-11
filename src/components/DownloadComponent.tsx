import React  from "react";
import AppStatusEnum from "./AppStatusEnum";
import Loading from "./loading";
import Fail from "./fail";
import IDownloadComponentProps from "./IDownloadComponentProps";
import IBlobDataUrl from "./IBlobDataUrl";

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
      renderLogic = () => downloadData.length > 0 ? <section className="download-files">
        {
          downloadData.map( (data:IBlobDataUrl, index:number)=> <article key={"download"+index.toString()}>
            <h3>{data.name}</h3>
            <iframe src={data.dataUrl} />
          </article>)
        }
      </section>: <h2>No files to download</h2>;
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
