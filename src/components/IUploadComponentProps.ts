import AppStatusEnum from "./AppStatusEnum";

export default interface IUploadComponentProps{
    statusClassName: string;
    statusMessage: string;
    status: AppStatusEnum;
    submitHandler: (event: React.FormEvent<HTMLFormElement>) =>void;
}