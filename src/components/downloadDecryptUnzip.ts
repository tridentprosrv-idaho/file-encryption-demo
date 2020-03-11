import {
  AnonymousCredential,
  BlobServiceClient,
  newPipeline,
} from "@azure/storage-blob";

import IBlobDataUrl from "./IBlobDataUrl";
import IEncryptedConfig from "./IEncryptedConfig";
interface IDecryptFunc {
  (
    encryptedData: IEncryptedConfig,
    update: (dataUrl: IBlobDataUrl) => void
  ): Promise<void>;
}

export default async function downloadDecryptUnzip(options: {
  decryptFunc: IDecryptFunc;
  update: (dataUrl: IBlobDataUrl) => void;
}): Promise<void> {
  const { decryptFunc, update } = options;
  const account = process.env.GATSBY_AZURE_BLOB_ACCOUNT; //config.account;
  const accountSAS = process.env.GATSBY_AZURE_BLOB_ACCOUNT_SAS; //config.accountSAS;
  const pipeline = newPipeline(new AnonymousCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    retryOptions: { maxTries: 4 }, // Retry options
    userAgentOptions: { userAgentPrefix: "AdvancedSample V1.0.0" }, // Customized telemetry string
    keepAliveOptions: {
      // Keep alive is enabled by default, disable keep alive by setting false
      enable: false,
    },
  });
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net${accountSAS}`,
    pipeline
  );

  const containerName = "demo";

  const containerClient = blobServiceClient.getContainerClient(containerName);
  const exists = await containerClient.exists();
  if (!exists) {
    throw new Error("Missing Container");
  }

  try {
    let blobIter = containerClient.listBlobsFlat();
    let blobIteratorItem = await blobIter.next();
    while (!blobIteratorItem.done) {
      const blobItem = blobIteratorItem.value;
      const blobName = blobItem.name;
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      const response = await blockBlobClient.download();
      const remoteBlobData = await response.blobBody;
      const decryptBlobReader = new FileReader();
      decryptBlobReader.onload = () => {
        const text: string = decryptBlobReader.result as string;
        const encryptedConfig: IEncryptedConfig = JSON.parse(text);
        decryptFunc(encryptedConfig, update);
      };
      decryptBlobReader.readAsText(remoteBlobData);

      blobIteratorItem = await blobIter.next();
    }
  } catch (error) {
    handleError(error, "Blob creation problem: ");
  }
}
function handleError(error: any, messagePrefix: string) {
  const errorMessage = messagePrefix + error.toString();
  console.log(errorMessage);
  throw new Error(errorMessage);
}
