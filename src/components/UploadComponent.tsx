import IUploadComponentProps from "./IUploadComponentProps";
import React from "react";
import FileInputRef from "./FileInputRef";
import AppStatusEnum from "./AppStatusEnum";
import Loading from "./loading";
import Fail from "./fail";
import Success from "./success";

export default function UploadComponent(props: IUploadComponentProps): JSX.Element {
  const { status, statusClassName, statusMessage, submitHandler } = props;

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
      renderLogic = () => <Loading />;
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
    <React.Fragment>
      <span className={statusClassName}>{statusMessage}</span>
      {renderLogic()}
    </React.Fragment>
  );
}
