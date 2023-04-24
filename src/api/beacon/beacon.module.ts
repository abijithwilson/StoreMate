import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BeaconController } from './beacon.controller';
import { BeaconService } from './beacon.service';

@Module({
  imports: [DatabaseModule],
  controllers: [BeaconController],
  providers: [BeaconService]
})
export class BeaconModule {}
