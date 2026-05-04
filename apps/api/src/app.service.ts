import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getRoot() {
    return {
      name: 'LoreSabi API',
      status: 'ok',
      routes: ['/health', '/countries', '/trends', '/search'],
    };
  }
}
