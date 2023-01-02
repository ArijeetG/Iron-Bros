import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { MongooseModule } from '@nestjs/mongoose';
import { ClientModule } from './client/client.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://users:Acaspera123@cluster0.0bnj6.mongodb.net/IronBros?retryWrites=true',
    ),
    ClientModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
