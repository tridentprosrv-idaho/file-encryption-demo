import { AnonymousCredential, BlobServiceClient, ContainerItem, newPipeline } from "@azure/storage-blob";
import IStoreBlob from "./IStoreBlob";

export default async function StoreBlob(props: IStoreBlob): Promise<void> {
  const { data } = props;
  const account = "fileencryptiondemo";
  const accountSas = "?sv=2019-02-02&ss=b&srt=sco&sp=rwdlac&se=2020-02-28T01:37:10Z&st=2020-02-27T17:37:10Z&sip=172.18.108.209&spr=https,http&sig=ibJpF2yO9UYo4YjKLW6TX7lm500F6VWVILKiUNKCmrk%3D";
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

  const containerName = `demo`;
  let demoContainer: ContainerItem | null = null;
  let iter = await blobServiceClient.listContainers();
  for await (const container of iter) {
    if (container.name === containerName) {
      demoContainer = container;
    }
  }
  const containerClient = blobServiceClient.getContainerClient(containerName);
  if (null === demoContainer) {
    // create container
    // Create a container

    const createContainerResponse = await containerClient.create();
    console.log(
      `Create container ${containerName} successfully`,
      createContainerResponse.requestId
    );
  }

  const blobName = "newblob" + new Date().getTime();
  const blockBlobClient = containerClient.getBlockBlobClient(blobName);
  const uploadBlobResponse = await blockBlobClient.upload(
    data,
    Buffer.byteLength(data)
  );
  console.log("Uploaded data" + JSON.stringify(uploadBlobResponse));
}
