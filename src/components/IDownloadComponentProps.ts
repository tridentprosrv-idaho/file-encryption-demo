import AppStatusEnum from "./AppStatusEnum";
import IBlobDataUrl from "./IBlobDataUrl";

export default interface IDownloadComponentProps{
    downloadData?: IBlobDataUrl[];
    statusClassName: string;
    statusMessage: string;
    status: AppStatusEnum;
}