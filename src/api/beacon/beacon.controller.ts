import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UsePipes
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';

import {
  BeaconUpdateDto,
  CreateBeaconDto,
  FetchBeaconListPaginationDto,
  FetchBeaconListResponseDto,
  StoreAndSectionOfBeaconResponseDto,
  UserVisitUpdateDTO
} from '../dto/beacon.dto';
import { BeaconService } from './beacon.service';
import * as K from '../../shared/constants';
import { JwtBody } from 'src/decorator/jwt.decorator';
import { Observable } from 'rxjs';
import { MessageDto } from '../dto/message.dto';
import { CustomValidationPipe } from 'src/pipes/validation-pipe';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from '../dto/roles.dto';

@ApiTags('Beacon')
@Controller('beacon')
export class BeaconController {
  constructor(private readonly beaconService: BeaconService) {}

  @Post()
  @Roles(UserRoles.SUPER_ADMIN)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: CreateBeaconDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create new Beacon' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  createBeacon(
    @Body() body: CreateBeaconDto,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.beaconService.createBeacon(body, jwtBody);
  }

  @Delete(':id')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete Beacon' })
  @ApiOkResponse({
    description: K.ERROR_CODES.DELETE.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  deleteBeacon(
    @Param('id', ParseIntPipe) id: number
  ): Observable<MessageDto | Record<null, null>> {
    return this.beaconService.deleteBeacon(id);
  }

  @Patch(':id')
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: BeaconUpdateDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update beacon details' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  updateBeacon(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: BeaconUpdateDto,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.beaconService.updateBeacon(id, body, jwtBody);
  }

  @Get()
  @Roles(UserRoles.SUPER_ADMIN)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Fetch beacon list' })
  @ApiOkResponse({
    description: 'Successfully fetched beacon list',
    type: FetchBeaconListResponseDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  fetchBeaconList(
    @Query() param: FetchBeaconListPaginationDto
  ): Observable<FetchBeaconListResponseDto | Record<null, null>> {
    return this.beaconService.fetchBeaconList(param);
  }

  @Get(':id')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBearerAuth()
  @ApiOperation({ description: 'Identify store and section of beacon' })
  @ApiOkResponse({
    description: 'Successfully fetched',
    type: StoreAndSectionOfBeaconResponseDto
  })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  identifySectionAndStore(
    @Param('id') id: string
  ): Observable<StoreAndSectionOfBeaconResponseDto | Record<null, null>> {
    return this.beaconService.fetchStoreAndSectionOfBeacon(id);
  }

  @Patch('visit-store')
  @Roles(UserRoles.USER)
  @UsePipes(new CustomValidationPipe())
  @ApiBearerAuth()
  @ApiOperation({
    description: ' Recording user entry to the store/section using Beacon'
  })
  @ApiBody({ type: UserVisitUpdateDTO })
  @ApiOkResponse({ description: 'Successfully updated', type: MessageDto })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  recordUserVisit(
    @Body() body: UserVisitUpdateDTO,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.beaconService.recordUserVisit(body,jwtBody);
  }
}
