import {
  Controller,
  Post,
  Body,
  HttpException,
  HttpStatus,
  Put,
  Param,
} from '@nestjs/common';
import { IClient } from './client.dto';
import { ClientService } from './client.service';

@Controller('/client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post('/register')
  async registerClient(@Body() body: IClient) {
    if (
      !body.name ||
      !body.dob ||
      !body.amountPaid ||
      !body.package ||
      !body.phoneNo
    )
      throw new HttpException('missing parameters', HttpStatus.BAD_REQUEST);

    const registerClientResponse = await this.clientService.registerClient(
      body,
    );
    if (registerClientResponse.success)
      return {
        success: true,
        response: registerClientResponse.data,
      };
    else
      throw new HttpException(
        registerClientResponse.message,
        HttpStatus.BAD_REQUEST,
      );
  }

  @Put('/:CLIENT_PHONE')
  async updateClient(
    @Param('CLIENT_PHONE') phone: string,
    @Body() client: IClient,
  ) {
    console.log(phone);

    const response = await this.clientService.modifyClient(
      parseInt(phone),
      client,
    );
    if (response.success) {
      return { success: true };
    } else
      throw new HttpException(
        response.message || 'something went wrong',
        HttpStatus.BAD_REQUEST,
      );
  }
}
