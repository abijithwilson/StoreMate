import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('status')
@ApiTags('Health')
export class HealthController {
  @Get()
  statusCheck(): boolean {
    return true;
  }
}
