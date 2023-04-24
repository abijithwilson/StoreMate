import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { StoreHelperService } from 'src/helper/store.helper';
import { SectionController } from './section.controller';
import { SectionService } from './section.service';
@Module({
  imports: [DatabaseModule],
  controllers: [SectionController],
  providers: [SectionService,StoreHelperService],
})
export class SectionModule{
}