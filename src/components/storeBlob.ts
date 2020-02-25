import IStoreBlob from "./IStoreBlob";

export default async function StoreBlob(props:IStoreBlob): Promise<void>{
    const { data } = props;
    console.log(data)
}