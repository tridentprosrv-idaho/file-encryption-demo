import AppStatusEnum from "./AppStatusEnum";
import { BlobItem } from "@azure/storage-blob";

export default interface IDownloadComponentProps{
    blobs?: BlobItem[];
    statusClassName: string;
    statusMessage: string;
    status: AppStatusEnum;
}