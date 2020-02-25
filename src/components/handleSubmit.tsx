import FileInputRef from "./FileInputRef";
import Zip from "./zip";
import { EncryptedConfig, encrypt } from "./encrypt";
import StoreBlob from "./storeBlob";

export default async function HandleSubmit(): Promise<void> {
  const fileInputElement = FileInputRef.GetFileInput();
  if (null != fileInputElement) {
    try {
      const zipFileData: string = await Zip(fileInputElement.files);
      const encryptedData: EncryptedConfig = await encrypt(zipFileData);
      const blob: string = JSON.stringify(encryptedData);
      StoreBlob({ data: blob });
    } catch (error) {
      console.log("Handle Submit failed: " + JSON.stringify(error));
    }
  }
}
