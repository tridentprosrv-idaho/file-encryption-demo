import {
  AnonymousCredential,
  BlobServiceClient,
  newPipeline,
} from "@azure/storage-blob";

import IStoreBlob from "./IStoreBlob";

export default async function StoreBlob(props: IStoreBlob): Promise<void> {
  const { data } = props;
  const account = process.env.GATSBY_AZURE_BLOB_ACCOUNT;//config.account;
  const accountSAS = process.env.GATSBY_AZURE_BLOB_ACCOUNT_SAS;//config.accountSAS;
  const pipeline = newPipeline(new AnonymousCredential(), {
    // httpClient: MyHTTPClient, // A customized HTTP client implementing IHttpClient interface
    retryOptions: { maxTries: 4 }, // Retry options
    userAgentOptions: { userAgentPrefix: "FileEncryptionDemo V1.0.0" }, // Customized telemetry string
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
    try {
      const createContainerResponse = await containerClient.create();
      console.log(
        `Create container ${containerName} successfully`,
        createContainerResponse.requestId
      );
    } catch (error) {
      handleError(error, "Container creation problem: ");
    }
  }

  try {
    const blobName = "newblob" + new Date().getTime();
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(
      data,
      Buffer.byteLength(data)
    );
    console.log("Uploaded data" + JSON.stringify(uploadBlobResponse));
  } catch (error) {
    handleError(error, "Blob creation problem: ");
  }
}
function handleError(error: any, messagePrefix: string) {
  const errorMessage = messagePrefix + error.toString();
  console.log(errorMessage);
  throw new Error(errorMessage);
}
