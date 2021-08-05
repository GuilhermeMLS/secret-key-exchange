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
    return 'Hello World from Client!';
  }

  async startCommuncation(request: RequestType): Promise<string> {
    console.log('[Client] 🔥 COMMUNICATION STARTED 🔥');
    console.log('[Client] Message: ' + request.message);
    const publicKeyPayload = {
      publicKey: this.diffieHellman.generatePublicKey(),
    };
    console.log('[Client] 🔑 Public Key: ' + publicKeyPayload.publicKey);
    const response = await firstValueFrom(
      this.httpService.post(
        'http://localhost:3000/public-key',
        publicKeyPayload,
      ),
    );
    console.log('[Client] POST /public-key response:');
    console.log(response.data);
    const serverPublicKey = response.data.publicKey;
    console.log('[Client] 🔑 Server public key: ' + serverPublicKey);
    const commonKey = this.diffieHellman.generateCommonKey(serverPublicKey);
    console.log('[Client] 🔑 Common Key: ' + commonKey);
    // TODO: cipher message with the common key
    // TODO: send the ciphered message to server
    return undefined;
  }
}
