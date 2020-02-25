import nanoid from "nanoid"

export default class UserEncryptionKey {
  public static GetKey(): string {
    const key = localStorage.getItem("whoisidaho_file_encryption_key")
      ? localStorage.getItem("whoisidaho_file_encryption_key")
      : nanoid();
    localStorage.setItem("whoisidaho_file_encryption_key", key);
    return key;
  }
}
