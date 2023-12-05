import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  async findClient(user): Promise<object> {
    return user;
  }
}
