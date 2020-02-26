import AppStatusEnum from "./AppStatusEnum";

export default interface IAppStatusProps{
    statusClassName: string;
    statusMessage: string;
    status: AppStatusEnum;
    submitHandler: (event: React.FormEvent<HTMLFormElement>) =>void;
}