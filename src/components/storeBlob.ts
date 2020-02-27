import {
  AnonymousCredential,
  BlobServiceClient,
  newPipeline,
} from "@azure/storage-blob";
import IStoreBlob from "./IStoreBlob";

export default async function StoreBlob(props: IStoreBlob): Promise<void> {
  const { data } = props;
  const account = "fileencryptiondemo";
  const accountSas =
    "?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2020-02-28T05:33:53Z&st=2020-02-27T21:33:53Z&spr=https&sig=IO8fzCjZ8fECMTPCU%2FIaGJ3BxLiFqhQLB4flikbtfUA%3D";
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
    `https://${account}.blob.core.windows.net${accountSas}`,
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
  const errorMessage = messagePrefix + JSON.stringify(error);
  console.log(errorMessage);
  throw new Error(errorMessage);
}
