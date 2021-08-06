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
    console.log('[Client] 🔑 Public key: ' + publicKeyPayload.publicKey);
    const serverPublicKeyResponse = await firstValueFrom(
      this.httpService.get('http://localhost:3000/public-key'),
    );
    const serverPublicKey = serverPublicKeyResponse.data.publicKey;
    console.log('[Client] 🔑 Server public key: ' + serverPublicKey);
    const commonKey = this.diffieHellman.generateCommonKey(serverPublicKey);
    console.log('[Client] 🔑 Common key: ' + commonKey);
    const encryptedMessage = this.diffieHellman.encryptMessage(
      commonKey,
      request.message,
    );
    console.log('[Client] Encrypted message: ' + encryptedMessage);
    const sendMessagePayload = {
      encryptedMessage: encryptedMessage,
    };
    await firstValueFrom(
      this.httpService.post('http://localhost:3000/set-client-public-key', {
        clientPublicKey: publicKeyPayload.publicKey,
      }),
    );
    const sendMessageResponse = await firstValueFrom(
      this.httpService.post(
        'http://localhost:3000/message',
        sendMessagePayload,
      ),
    );
    console.log(
      '[Client] Send message response: ' + sendMessageResponse.data.message,
    );
    console.log('[Client] ❌ COMMUNICATION FINISHED ❌');
    return undefined;
  }
}
