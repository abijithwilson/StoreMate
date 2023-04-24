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
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { ProductService } from './product.service';
import * as K from '../../shared/constants';
import {
  CreateProductBodyDto,
  CreateProductSku,
  FetchSingleProductDetailsResponseDto,
  MessageColourDto,
  MessageSizeDto,
  ProductCreateDto,
  UpdateProductSku,
  UpdateProductDto,
  ProductFetchResponseDto,
  FetchAllProductsPagination,
  FetchSingleColourAndSizeSkuDetails,
  MessageCategoryDto,
  FetchProductOffersResponseDto,
  FetchProductOffersDto,
  FetchStoreWiseSingleProductDetailsResponseDto,
  CsvProductDto
} from '../dto/product.dto';
import { File } from 'src/decorator/file.decorator';
import { JwtBody } from 'src/decorator/jwt.decorator';
import { Observable } from 'rxjs';
import { MessageDto } from '../dto/admin.dto';
import { CustomValidationPipe } from 'src/pipes/validation-pipe';
import { Roles } from 'src/decorator/roles.decorator';
import { UserRoles } from '../dto/roles.dto';
import { Public } from 'src/guards/public.guard';
import { UploadGuard } from 'src/guards/upload.guard';

@ApiTags('Product')
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('size')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN, UserRoles.USER)
  @ApiOperation({ description: 'Fetch available sizes of the product' })
  @ApiOkResponse({ description: 'Successfully Fetched', type: MessageSizeDto })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @Public()
  fetchProductSize(): Observable<MessageDto | Record<null, null>> {
    return this.productService.fetchProductSize();
  }

  @Get('colour')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN, UserRoles.USER)
  @ApiOperation({ description: 'Fetch available colour of the product' })
  @ApiOkResponse({
    description: 'Successfully Fetched',
    type: MessageColourDto
  })
  @ApiBearerAuth()
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @Public()
  fetchProductcolour(): Observable<MessageDto | Record<null, null>> {
    return this.productService.fetchProductcolour();
  }

  @Get('category')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN, UserRoles.USER)
  @ApiOperation({ description: 'Fetch available category of the product' })
  @ApiOkResponse({
    description: 'Successfully Fetched',
    type: MessageCategoryDto
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @Public()
  fetchProductCategory(): Observable<MessageDto | Record<null, null>> {
    return this.productService.fetchProductCategory();
  }

  @Delete(':id')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete Product' })
  @ApiOkResponse({ description: 'Successfully deleted', type: MessageDto })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  deleteProduct(
    @Param('id', ParseIntPipe) id: number
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.deleteProduct(id);
  }

  @Delete(':id/sku')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Delete SKU details of product' })
  @ApiOkResponse({ description: 'Successfully deleted', type: MessageDto })
  @ApiUnauthorizedResponse({
    description: K.ERROR_CODES.UNAUTHORIZED.message
  })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: 'Invalid id' })
  deleteSkuDetails(@Param('id', ParseIntPipe) id: number) {
    return this.productService.deleteSkuDetails(id);
  }

  @Patch(':id/edit')
  @Roles(UserRoles.SUPER_ADMIN)
  @HttpCode(200)
  @ApiBody({ type: UpdateProductDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update product details' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  editProductDetails(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: UpdateProductDto,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.editProductDetails(id, body, jwtBody);
  }

  @Post()
  @Roles(UserRoles.SUPER_ADMIN)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: CreateProductBodyDto })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create new product' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: ProductCreateDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  createProduct(
    @Body() body: CreateProductBodyDto,
    @JwtBody() jwtBody
  ): Observable<ProductCreateDto | Record<null, null>> {
    return this.productService.createProduct(body, jwtBody);
  }

  @Patch('sku')
  @Roles(UserRoles.SUPER_ADMIN)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: UpdateProductSku })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Update SKU details of product' })
  @ApiOkResponse({
    description: K.ERROR_CODES.UPDATED.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  updateSkuDetails(
    @Body() body: UpdateProductSku,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.updateSkuDetails(body, jwtBody);
  }

  @Post('sku')
  @Roles(UserRoles.SUPER_ADMIN)
  @HttpCode(200)
  @UsePipes(new CustomValidationPipe({ transform: true }))
  @ApiBody({ type: CreateProductSku })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create SKU details of product' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  createSkuDetails(
    @Body() body: CreateProductSku,
    @JwtBody() jwtBody
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.createSkuDetails(body, jwtBody);
  }

  @Get(':id')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get single product details' })
  @ApiOkResponse({
    description: 'Successfully fetched single product details',
    type: FetchSingleProductDetailsResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getSingleProductSkuDetails(
    @Param('id', new ParseIntPipe()) id: number,
    @Query() param: FetchSingleColourAndSizeSkuDetails
  ): Observable<FetchSingleProductDetailsResponseDto | Record<null, null>> {
    return this.productService.getSingleProductSkuDetails(id, param);
  }

  @Get()
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get all product details' })
  @UsePipes(new CustomValidationPipe())
  @ApiOkResponse({
    description: 'Successfully fetched all product details',
    type: ProductFetchResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getStoreDetails(
    @Query() param: FetchAllProductsPagination
  ): Observable<MessageDto | Record<null, null>> {
    return this.productService.getAllProductDetails(param);
  }

  @Get(':productId/store/:storeId')
  @Roles(UserRoles.SUPER_ADMIN, UserRoles.STORE_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get single product details for store admin' })
  @ApiOkResponse({
    description: 'Successfully fetched single product details',
    type: FetchStoreWiseSingleProductDetailsResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  getStoreAdminSingleProductSkuDetails(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @JwtBody() jwtBody,
    @Query() param: FetchSingleColourAndSizeSkuDetails
  ): Promise<
    FetchStoreWiseSingleProductDetailsResponseDto | Record<null, null>
  > {
    return this.productService.fetchStoreWiseProductSkus(
      productId,
      storeId,
      jwtBody,
      param
    );
  }

  @Get(':productId/store/:storeId/offers')
  @Roles(UserRoles.USER, UserRoles.STORE_ADMIN, UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get single product offers' })
  @ApiOkResponse({
    description: 'Successfully fetched single product offers',
    type: FetchProductOffersResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchProductOffers(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Param('storeId', new ParseIntPipe()) storeId: number,
    @Query() param: FetchProductOffersDto
  ): Observable<FetchProductOffersResponseDto | Record<null, null>> {
    return this.productService.fetchProductOffers(productId, storeId, param);
  }

  @Post('csv')
  @Roles(UserRoles.SUPER_ADMIN)
  @UseGuards(UploadGuard)
  @HttpCode(200)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary'
        }
      }
    }
  })
  @ApiBearerAuth()
  @ApiOperation({ description: 'Create new product' })
  @ApiOkResponse({
    description: K.ERROR_CODES.Created.message,
    type: MessageDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  productBulkUpload(
    @File(new ValidationPipe({ validateCustomDecorators: true }))
      file: CsvProductDto,
    @JwtBody() jwtBody
  ): Promise<MessageDto> {
    return this.productService.productBulkUpload(file, jwtBody);
  }

  @Get(':productId/offers')
  @Roles(UserRoles.SUPER_ADMIN)
  @ApiBearerAuth()
  @ApiOperation({ description: 'Get single product offers' })
  @ApiOkResponse({
    description: 'Successfully fetched single product offers',
    type: FetchProductOffersResponseDto
  })
  @ApiUnauthorizedResponse({ description: K.ERROR_CODES.UNAUTHORIZED.message })
  @ApiInternalServerErrorResponse({
    description: K.ERROR_CODES.DEFAULT.message
  })
  @ApiBadRequestResponse({ description: K.ERROR_CODES.BADREQUEST.message })
  fetchProductWiseOffers(
    @Param('productId', new ParseIntPipe()) productId: number,
    @Query() param: FetchProductOffersDto
  ): Observable<FetchProductOffersResponseDto | Record<null, null>> {
    return this.productService.fetchProductWiseOffers(productId, param);
  }
}
