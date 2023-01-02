import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { IClient } from './client.dto';
import { ClientService } from './client.service';

@Controller('/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/register')
  registerClient(@Body() body: IClient) {
    console.log(body);
    if (
      !body.name ||
      !body.dob ||
      !body.amountPaid ||
      !body.package ||
      !body.phoneNo
    )
      throw new HttpException('missing parameters', HttpStatus.BAD_REQUEST);

    return this.clientService.registerClient(body);
  }
}
