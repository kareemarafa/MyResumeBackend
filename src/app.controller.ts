import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  server() {
    return 'Server up and running! Happy coding :)'
  }
}
