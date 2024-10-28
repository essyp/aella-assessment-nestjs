import * as crypto from 'crypto';
export class CryptograpyUtil {
  public static toBase64(str: string) {
    return Buffer.from(str, 'binary').toString('base64');
  }
  public static fromBase64(str: string) {
    return Buffer.from(str, 'base64').toString('binary');
  }








  public static generateSHA512(input: string): string {
    const hash = crypto.createHash('sha512');
    hash.update(input);
    // hash.update(input, 'utf-8');
    return hash.digest('hex').toString();
  }

  public static generateSHA256RAW(input) {
    const hash = crypto.createHash('sha256');
    hash.update(input, 'utf-8');
    return hash.digest('hex').toString();
  }
}
