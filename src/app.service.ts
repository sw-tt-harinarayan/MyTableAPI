import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  checkServer(): object {
    return { statusCode: 200, message: 'Server is working fine.' };
  }
}
