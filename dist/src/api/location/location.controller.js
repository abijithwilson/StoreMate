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
exports.LocationController = void 0;
const rxjs_1 = require("rxjs");
const swagger_1 = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const location_service_1 = require("./location.service");
const message_dto_1 = require("../dto/message.dto");
const constants_1 = require("../../shared/constants");
const public_guard_1 = require("../../guards/public.guard");
let LocationController = class LocationController {
    constructor(locationService) {
        this.locationService = locationService;
    }
    fetchCountry() {
        return this.locationService.fetchCountry();
    }
    fetchState(countryId) {
        return this.locationService.fetchState(countryId);
    }
    fetchDistrict(stateId) {
        return this.locationService.fetchDistrict(stateId);
    }
};
__decorate([
    (0, common_1.Get)('country'),
    (0, swagger_1.ApiOperation)({ description: 'Fetch country' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully Fetched', type: message_dto_1.MessageDto }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: constants_1.ERROR_CODES.DEFAULT.message }),
    (0, public_guard_1.Public)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], LocationController.prototype, "fetchCountry", null);
__decorate([
    (0, common_1.Get)(':countryId/state'),
    (0, swagger_1.ApiOperation)({ description: 'Fetch state' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully Fetched', type: message_dto_1.MessageDto }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: constants_1.ERROR_CODES.DEFAULT.message }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Param)('countryId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], LocationController.prototype, "fetchState", null);
__decorate([
    (0, common_1.Get)(':stateId/district'),
    (0, swagger_1.ApiOperation)({ description: 'Fetch District' }),
    (0, swagger_1.ApiOkResponse)({ description: 'Successfully Fetched', type: message_dto_1.MessageDto }),
    (0, swagger_1.ApiInternalServerErrorResponse)({ description: constants_1.ERROR_CODES.DEFAULT.message }),
    (0, public_guard_1.Public)(),
    __param(0, (0, common_1.Param)('stateId', new common_1.ParseIntPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", rxjs_1.Observable)
], LocationController.prototype, "fetchDistrict", null);
LocationController = __decorate([
    (0, swagger_1.ApiTags)('Location'),
    (0, common_1.Controller)('location'),
    __metadata("design:paramtypes", [location_service_1.LocationService])
], LocationController);
exports.LocationController = LocationController;
//# sourceMappingURL=location.controller.js.map