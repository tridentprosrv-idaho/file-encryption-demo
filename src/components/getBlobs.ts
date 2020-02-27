import {
    AnonymousCredential,
    BlobServiceClient,
    newPipeline,
    BlobItem,
  } from "@azure/storage-blob";
 
  import config from "../config.json";
  
  export default async function GetBlob(): Promise<BlobItem[]> {
    const blobs: BlobItem[] = [];
    const account = config.account;
    const accountSAS = config.accountSAS;
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
      throw new Error("Missing Container")
    }
  
    try {
      
      let blobIter = containerClient.listBlobsFlat();
      let blobItem = await blobIter.next();
      while(!blobItem.done){
          blobs.push(blobItem.value);          
          blobItem = await blobIter.next();
      }
      return blobs;
    } catch (error) {
      handleError(error, "Blob creation problem: ");
    }
  }
  function handleError(error: any, messagePrefix: string) {
    const errorMessage = messagePrefix + JSON.stringify(error);
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
  