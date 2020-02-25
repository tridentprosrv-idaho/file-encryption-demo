import UserEncryptionKey from "./UserEncryptionKey";
import { generateEncryptionKey} from "symmetric-encrypt";
export interface EncryptedConfig {
    /** Encrypted text, base64 encoded */
    readonly ciphertext: string;
    readonly encryptionConfig: {
        /** OpenSSL identifier for the symmetric key encryption algorithm */
        readonly algorithm: string;
        /** Initialization vector, base64 encoded */
        readonly iv: string;
        /** Authentication tag, used to ensure data integrity during decryption, base64 encoded */
        readonly authTag: string;
    };
}

export async function  encrypt(data:string): Promise<EncryptedConfig>{
    const encryptHelper = await generateEncryptionKey(UserEncryptionKey.GetKey());
    return encryptHelper(data);
}