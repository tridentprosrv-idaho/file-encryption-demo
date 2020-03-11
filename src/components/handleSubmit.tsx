import FileInputRef from "./FileInputRef";
import Zip from "./zip";
import { encrypt } from "./encrypt";
import IEncryptedConfig from "./IEncryptedConfig";
import StoreBlob from "./storeBlob";

export default async function HandleSubmit(): Promise<void> {
  const fileInputElement = FileInputRef.GetFileInput();
  if (null != fileInputElement) {
    try {
      const zipFileData: string = await Zip(fileInputElement.files);
      const encryptedData: IEncryptedConfig = await encrypt(zipFileData);
      const blob: string = JSON.stringify(encryptedData);
      StoreBlob({ data: blob });
    } catch (error) {
      console.log("Handle Submit failed: " + error.toString());
    }
  }
}
