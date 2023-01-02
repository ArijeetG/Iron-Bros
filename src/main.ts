import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { ConfigService } from '@nestjs/config';

// Import firebase-admin
import * as admin from 'firebase-admin';
import { ServiceAccount } from 'firebase-admin';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  // Set the config options
  const adminConfig: ServiceAccount = {
    projectId: configService.get<string>('FIREBASE_PROJECT_ID'),
    clientEmail: configService.get<string>('FIREBASE_CLIENT_EMAIL'),
    privateKey: configService
      .get<string>('FIREBASE_PRIVATE_KEY')
      .replace(/\\n/gm, '\n'),
  };

  // Initialise firebase-admin
  admin.initializeApp({
    credential: admin.credential.cert(adminConfig),
  });

  app.enableCors();

  await app.listen(3000);
}
bootstrap();
