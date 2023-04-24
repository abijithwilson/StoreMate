import { Observable } from 'rxjs';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { LocationService } from './location.service';
import { MessageDto } from '../dto/message.dto';
import { ERROR_CODES } from 'src/shared/constants';
import { Public } from 'src/guards/public.guard';

@ApiTags('Location')
@Controller('location')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}
 
 
  @Get('country')
  @ApiOperation({ description: 'Fetch country' })
  @ApiOkResponse({ description: 'Successfully Fetched', type: MessageDto })
  @ApiInternalServerErrorResponse({ description: ERROR_CODES.DEFAULT.message })
  @Public()
  fetchCountry(): Observable<MessageDto | Record<null, null>> {
    return this.locationService.fetchCountry();
  }

  @Get(':countryId/state')
  @ApiOperation({ description: 'Fetch state' })
  @ApiOkResponse({ description: 'Successfully Fetched', type: MessageDto })
  @ApiInternalServerErrorResponse({ description: ERROR_CODES.DEFAULT.message })
  @Public()
  fetchState(
    @Param('countryId', new ParseIntPipe()) countryId: number
  ): Observable<MessageDto | Record<null, null>> {
    return this.locationService.fetchState(countryId);
  }

  @Get(':stateId/district')
  @ApiOperation({ description: 'Fetch District' })
  @ApiOkResponse({ description: 'Successfully Fetched', type: MessageDto })
  @ApiInternalServerErrorResponse({ description: ERROR_CODES.DEFAULT.message })
  @Public()
  fetchDistrict(
    @Param('stateId', new ParseIntPipe()) stateId: number
  ): Observable<MessageDto | Record<null, null>> {
    return this.locationService.fetchDistrict(stateId);
  }
}
