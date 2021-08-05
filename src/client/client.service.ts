import { Injectable } from '@nestjs/common';
import { RequestType } from './types/request.type';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { DiffieHellman } from '../diffie-hellman/diffie-hellman';

@Injectable()
export class ClientService {
  constructor(
    private httpService: HttpService,
    private readonly diffieHellman: DiffieHellman,
  ) {}

  getHello(): string {
    const serverKey = ' BAR';
    const commonSecret = this.diffieHellman.generateCommonKey(serverKey);
    return 'Hello World from Client!' + commonSecret;
  }

  async startCommuncation(request: RequestType): Promise<string> {
    const publicKeyPayload = {
      publicKey: this.diffieHellman.generatePublicKey(),
    };
    const response = await firstValueFrom(
      this.httpService.post(
        'http://localhost:3000/public-key',
        publicKeyPayload,
      ),
    );
    console.log(response.data);
    const serverPublicKey = response.data.publicKey;
    const commonKey = this.diffieHellman.generateCommonKey(serverPublicKey);
    // TODO: cipher message with the common key
    // TODO: send the ciphered message to server
    return undefined;
  }
}
