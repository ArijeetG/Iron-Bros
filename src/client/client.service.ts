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

  async getClient(phone: number) {
    try {
      const client = await this.clientModel.findOne({ phoneNo: phone });
      if (!client)
        return {
          success: false,
          message: 'client not found',
        };
      delete client._id;
      return {
        success: true,
        data: client,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async registerClient(client: IClient) {
    const createdClient = new this.clientModel(client);
    try {
      // Check if client is already registered
      const isClient = await this.getClient(client.phoneNo);
      if (isClient.success)
        return {
          success: false,
          message: 'user exists',
        };

      const response = await createdClient.save();
      delete response._id;

      // Send sms
      await this.twilioSmsService.sendMessage(
        '+91-7908230152',
        'Khushi erom dekhte hoi!!',
      );
      return {
        success: true,
        data: response,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async modifyClient(phone: number, client: IClient) {
    try {
      const isClient = await this.getClient(phone);
      if (!isClient.success)
        return {
          success: false,
          message: 'client not found',
        };

      await this.clientModel.updateOne({ phoneNo: phone }, { ...client });
      return {
        success: true,
      };
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'internal server error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
