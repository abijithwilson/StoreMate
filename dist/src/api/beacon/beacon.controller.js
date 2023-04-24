"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeaconController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const beacon_dto_1 = require("../dto/beacon.dto");
const beacon_service_1 = require("./beacon.service");
const K = require("../../shared/constants");
const jwt_decorator_1 = require("../../decorator/jwt.decorator");
const rxjs_1 = require("rxjs");
const message_dto_1 = require("../dto/message.dto");
const validation_pipe_1 = require("../../pipes/validation-pipe");
const roles_decorator_1 = require("../../decorator/roles.decorator");
const roles_dto_1 = require("../dto/roles.dto");
let BeaconController = class BeaconController {
    constructor(beaconService) {
        this.beaconService = beaconService;
    }
    createBeacon(body, jwtBody) {
        return this.beaconService.createBeacon(body, jwtBody);
    }
    deleteBeacon(id) {
        return this.beaconService.deleteBeacon(id);
    }
    updateBeacon(id, body, jwtBody) {
        return this.beaconService.updateBeacon(id, body, jwtBody);
    }
    fetchBeaconList(param) {
        return this.beaconService.fetchBeaconList(param);
    }
    identifySectionAndStore(id) {
        return this.beaconService.fetchStoreAndSectionOfBeacon(id);
    }
    recordUserVisit(body, jwtBody) {
        return this.beaconService.recordUserVisit(body, jwtBody);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.HttpCode)(200),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: beacon_dto_1.CreateBeaconDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Create new Beacon' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.Created.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [beacon_dto_1.CreateBeaconDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BeaconController.prototype, "createBeacon", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Delete Beacon' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.DELETE.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], BeaconController.prototype, "deleteBeacon", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBody)({ type: beacon_dto_1.BeaconUpdateDto }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Update beacon details' }),
    (0, swagger_1.ApiOkResponse)({
        description: K.ERROR_CODES.UPDATED.message,
        type: message_dto_1.MessageDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Invalid id' }),
    __param(0, (0, common_1.Param)('id', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, beacon_dto_1.BeaconUpdateDto, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BeaconController.prototype, "updateBeacon", null);
__decorate([
    (0, common_1.Get)(),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.SUPER_ADMIN),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Fetch beacon list' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched beacon list',
        type: beacon_dto_1.FetchBeaconListResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [beacon_dto_1.FetchBeaconListPaginationDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], BeaconController.prototype, "fetchBeaconList", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe({ transform: true })),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({ description: 'Identify store and section of beacon' }),
    (0, swagger_1.ApiOkResponse)({
        description: 'Successfully fetched',
        type: beacon_dto_1.StoreAndSectionOfBeaconResponseDto
    }),
    (0, swagger_1.ApiUnauthorizedResponse)({
        description: K.ERROR_CODES.UNAUTHORIZED.message
    }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", rxjs_1.Observable)
], BeaconController.prototype, "identifySectionAndStore", null);
__decorate([
    (0, common_1.Patch)('visit-store'),
    (0, roles_decorator_1.Roles)(roles_dto_1.UserRoles.USER),
    (0, common_1.UsePipes)(new validation_pipe_1.CustomValidationPipe()),
    (0, swagger_1.ApiBearerAuth)(),
    (0, swagger_1.ApiOperation)({
        description: ' Recording user entry to the store/section using Beacon'
    }),
    (0, swagger_1.ApiBody)({ type: beacon_dto_1.UserVisitUpdateDTO }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully updated', type: message_dto_1.MessageDto }),
    (0, swagger_1.ApiUnauthorizedResponse)({ description: K.ERROR_CODES.UNAUTHORIZED.message }),
    (0, swagger_1.ApiInternalServerErrorResponse)({
        description: K.ERROR_CODES.DEFAULT.message
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: K.ERROR_CODES.BADREQUEST.message }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, jwt_decorator_1.JwtBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [beacon_dto_1.UserVisitUpdateDTO, Object]),
    __metadata("design:returntype", rxjs_1.Observable)
], BeaconController.prototype, "recordUserVisit", null);
BeaconController = __decorate([
    (0, swagger_1.ApiTags)('Beacon'),
    (0, common_1.Controller)('beacon'),
    __metadata("design:paramtypes", [beacon_service_1.BeaconService])
], BeaconController);
exports.BeaconController = BeaconController;
//# sourceMappingURL=beacon.controller.js.map