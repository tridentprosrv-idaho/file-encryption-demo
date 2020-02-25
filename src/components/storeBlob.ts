import IStoreBlob from "./IStoreBlob";
import { BlobServiceClient, ContainerItem } from "@azure/storage-blob";

export default async function StoreBlob(props: IStoreBlob): Promise<void> {
  const { data } = props;
  const account = "fileencryptiondemo";
  const blobServiceClient = new BlobServiceClient(
    `https://${account}.blob.core.windows.net`
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
  const uploadBlobResponse = await blockBlobClient.upload(data, Buffer.byteLength(data));
  console.log("Uploaded data" +JSON.stringify(uploadBlobResponse));
}
