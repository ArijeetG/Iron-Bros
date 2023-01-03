import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export default class TwilioSmsService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendMessage(receiverPhoneNumber: string, message: string) {
    const senderPhoneNumber = this.configService.get('TWILIO_PHONE_NUMBER');

    return this.twilioClient.messages.create({
      body: message,
      from: senderPhoneNumber,
      to: receiverPhoneNumber,
    });
  }
}
