import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProperty, ApiTags } from '@nestjs/swagger';

class HelloWorld {
  @ApiProperty()
  message: string;
}

@Controller()
@ApiTags()
export class AppController {
  @Get()
  @ApiOperation({ summary: 'Get Hello World' })
  @ApiOkResponse({ status: 200, type: HelloWorld })
  getHello(): { message: string } {
    return {
      message: 'Hello World!',
    };
  }
}
