import { Module } from '@nestjs/common';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Client, ClientSchema } from './client.schema';
import TwilioSmsService from 'src/twilio/twilio.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Client.name, schema: ClientSchema }]),
  ],
  controllers: [ClientController],
  providers: [ClientService, TwilioSmsService],
})
export class ClientModule {}
