import { generateEncryptionKey } from "symmetric-encrypt";

import IEncryptedConfig from "./IEncryptedConfig";
import UserEncryptionKey from "./UserEncryptionKey";

export async function  encrypt(data:string): Promise<IEncryptedConfig>{
    const encryptHelper = await generateEncryptionKey(UserEncryptionKey.GetKey());
    return encryptHelper(data);
}