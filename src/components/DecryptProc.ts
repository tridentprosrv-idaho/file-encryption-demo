import JSZip from "jszip";

import { contentType } from "mime-types";

import { decrypt } from "symmetric-encrypt";

import IBlobDataUrl from "./IBlobDataUrl";
import IEncryptedConfig from "./IEncryptedConfig";
import UserEncryptionKey from "./UserEncryptionKey";

async function unzip(
  fileName: string,
  file: JSZip.JSZipObject,
  update: (dataUrl: IBlobDataUrl) => void
): Promise<void> {
  const base64Data:string = await file.async("base64");
  const contentTypeFromFile = contentType(fileName) 
  const dataUrl = `data:${contentTypeFromFile||""};base64,${base64Data}`;
  if (!dataUrl) {
    console.log("No data in file!");
  }
  update({
    dataUrl: dataUrl,
    name: fileName,
  });
}

async function DecryptProc(
  encryptedData: IEncryptedConfig,
  update: (dataUrl: IBlobDataUrl) => void
): Promise<void> {
  const dataUrls: IBlobDataUrl[] = [];
  const promisesToKeep: Promise<void>[] = [];
  const data = await decrypt(UserEncryptionKey.GetKey(), encryptedData);
  console.log(`decrypted data to be unzipped: ${data}`);
  const zipFile = new JSZip();
  await zipFile.loadAsync(data);
  zipFile.forEach((relativePath: string, file: JSZip.JSZipObject) => {
    console.log(`processing file: ${relativePath}`)
    promisesToKeep.push(unzip(file.name, file, update));
  });
  await Promise.all(promisesToKeep);
  console.log(JSON.stringify(dataUrls));
}

export default DecryptProc;
