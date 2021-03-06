export default interface IEncryptedConfig {
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
    readonly keyDerivationConfig: {
        /** Libsodium identifier for the hashing algorithm and version used (defaults to Argon2Id) */
        readonly algorithm: number;
        /** Length in bytes of the derived encryption key/hash */
        readonly length: number;
        /** Salt for Libsodium, base64 encoded */
        readonly salt: string;
        /** OPSLIMIT parameter for Libsodium, denoting the number of CPU cycles to perform */
        readonly opsLimit: number;
        /** MEMLIMIT parameter for Libsodium, denoting the max amount of RAM the function will utilize */
        readonly memLimit: number;
    };
}
