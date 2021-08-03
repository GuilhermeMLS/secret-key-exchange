import { Injectable } from '@nestjs/common';

@Injectable()
export class DiffieHellman {
  private readonly secretKey: string;

  constructor() {
    this.secretKey = 'FOO';
  }

  public generateCommonSecret(serverSecretKey: string): string {
    return this.secretKey + serverSecretKey;
  }
}
