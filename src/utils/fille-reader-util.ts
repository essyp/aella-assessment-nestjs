import * as crypto from 'crypto';
import * as fs from 'fs';
import axios from "axios";
export class FileReaderUtil {
  static readCsvFromBase64(base64String: string) {
    //console.log(base64String);
    // decode base64
    const encodedCsv: any = base64String.startsWith('data')
      ? base64String.split(',')?.pop()
      : base64String;
    //.slice(base64String.length - 2, base64String.length - 1)
    // console.log('encoded string\n ');
    // console.log(encodedCsv);
    const decodedBase64String = Buffer.from(encodedCsv, 'base64').toString();

    // const filename = decodedBase64String.match(/filename="(.*).csv/)[1];
    // console.log(filename);

    return decodedBase64String;
  }

  static fileExists(file1: string, file2: string): boolean {
    const hash1 = crypto.createHash('md5').update(file1).digest('hex');
    const hash2 = crypto.createHash('md5').update(file2).digest('hex');

    return hash1 == hash2;
  }

  static readCsvFromFile(filepath: string){
    return filepath;
    return axios.get(filepath)
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          throw new Error(`Error reading CSV from URL: ${error.message}`);
        });
  }
}
