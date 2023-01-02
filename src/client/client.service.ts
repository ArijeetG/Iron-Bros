import { Injectable, HttpException } from '@nestjs/common';
import { IClient } from './client.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Client, ClientDocument } from './client.schema';
import { Model } from 'mongoose';
import { HttpStatus } from '@nestjs/common/enums';
import { ConfigService } from '@nestjs/config';
import TwilioSmsService from 'src/twilio/twilio.service';

@Injectable()
export class ClientService {
  constructor(
    @InjectModel(Client.name) private clientModel: Model<ClientDocument>,
    private twilioSmsService: TwilioSmsService,
  ) {}

  async registerClient(client: IClient) {
    const createdClient = new this.clientModel(client);
    try {
      const response = await createdClient.save();
      console.log(response);

      // Send sms
      await this.twilioSmsService.sendMessage(
        '+91-7585887582',
        'Khushi erom dekhte hoi!!',
      );
      return true;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
