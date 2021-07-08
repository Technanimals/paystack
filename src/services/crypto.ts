import { createHmac } from 'crypto';

function createData(data: Data) {
  if (typeof data === 'string') {
    return data;
  }

  return JSON.stringify(data);
}
export function getDecrypt(clientSecret: string) {
  return function decrypt(body: Data) {
    const data = createData(body);
    try {
      const hash = createHmac(Algorithm.SHA_512, clientSecret)
        .update(data)
        .digest('hex');
      return hash;
    } catch (error) {
      return;
    }
  };
}

export enum Algorithm {
  SHA_512 = 'sha512',
}

export type Data = Record<string, any> | string;
