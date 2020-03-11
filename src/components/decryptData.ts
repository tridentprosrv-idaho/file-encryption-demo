import { decrypt } from "symmetric-encrypt";

import IEncryptedConfig from "./IEncryptedConfig";
import UserEncryptionKey from "./UserEncryptionKey";

export default async function decryptData(
  data: IEncryptedConfig
): Promise<string> {
  const { ciphertext, encryptionConfig, keyDerivationConfig } = data;
  return await decrypt(UserEncryptionKey.GetKey(), {
    ciphertext,
    encryptionConfig,
    keyDerivationConfig,
  });
}
