import { NestFactory } from '@nestjs/core';
import { ClientModule } from './client/client.module';
import { ServerModule } from './server/server.module';

async function bootstrap() {
  const server = await NestFactory.create(ClientModule);
  const client = await NestFactory.create(ServerModule);
  await server.listen(3000);
  await client.listen(3001);
}
bootstrap();
