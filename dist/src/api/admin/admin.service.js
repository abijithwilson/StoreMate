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
exports.AdminService = void 0;
const admin_dto_1 = require("./../dto/admin.dto");
const admin_query_1 = require("./../db-queries/admin.query");
const mail_service_1 = require("../../mail/mail.service");
const store_dto_1 = require("./../dto/store.dto");
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const database_service_1 = require("../../database/database.service");
const admin_dto_2 = require("../dto/admin.dto");
const utils_service_1 = require("../../utils/utils.service");
const K = require("../../shared/constants");
const constants_1 = require("../../shared/constants");
const admin_query_2 = require("../db-queries/admin.query");
const config_1 = require("@nestjs/config");
const jwt_1 = require("@nestjs/jwt");
const configuration_1 = require("../../config/configuration");
const format = require("pg-format");
const offer_dto_1 = require("../dto/offer.dto");
const offer_query_1 = require("../db-queries/offer.query");
const section_dto_1 = require("../dto/section.dto");
const crypto_1 = require("crypto");
const pbkdf2 = require("pbkdf2");
const auth_dto_1 = require("../dto/auth.dto");
let AdminService = class AdminService {
    constructor(databaseService, configService, jwtService, mailService, config) {
        this.databaseService = databaseService;
        this.configService = configService;
        this.jwtService = jwtService;
        this.mailService = mailService;
        this.config = config;
    }
    adminProfileUpdate(id, body, jwtBody) {
        body['updatedBy'] = jwtBody.id;
        const updateQueryAndValue = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.ADMIN,
            primaryKey: K.PRIMARY_KEYS.ADMIN,
            keysToIgnore: constants_1.KEYS_TO_IGNORE_IN_ADMIN_UPDATE,
            whereCondition: `admin_id=${id} AND is_deleted = false`,
            columnData: body
        });
        return this.databaseService
            .rawQuery(updateQueryAndValue.query, updateQueryAndValue.data, admin_dto_2.AdminIdDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'Updated admin detail successfully' };
        }));
    }
    fetchAdminProfile(id) {
        return this.databaseService
            .rawQuery(admin_query_2.fetchAdminProfile, [id], admin_dto_2.AdminDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Admin Profile retrieved successfully',
                data: result[0]
            };
        }));
    }
    getAllStoreAdminDetails(param) {
        const { offset, limit, storeName, adminName, countryId, districtId, stateId } = param;
        const { query, dataValue } = (0, admin_query_2.listAllStoreAdminQuery)(adminName, storeName, countryId, stateId, districtId, limit, offset);
        return this.databaseService
            .rawQuery(query, dataValue, admin_dto_2.FetchAllStoreAdminDetail)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Store admin detail Fetched successfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    fetchStoreAdminProfile(id) {
        return this.databaseService
            .rawQuery(admin_query_2.StoreAdminProfileFetchQuery, [id], admin_dto_2.AdminIdDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length != 0) {
                return {
                    message: 'Store admin profile retrieved successfully',
                    data: result[0]
                };
            }
            else {
                throw new common_1.NotFoundException();
            }
        }));
    }
    deleteStoreAdminDetails(param) {
        const { storeAdminId } = param;
        const valueString = `${storeAdminId.join(',')}`;
        const query = (0, admin_query_2.deleteStoreAdminQuery)(valueString);
        return this.databaseService.rawQuery(query, [], admin_dto_2.AdminIdDto).pipe((0, rxjs_1.map)((result) => {
            return {
                message: result.length === storeAdminId.length ?
                    'Deleted all entries successfully' :
                    'Partial deletion occured'
            };
        }));
    }
    storeAdminProfileUpdate(id, body, jwtBody) {
        body['updatedBy'] = jwtBody.id;
        const { firstName, lastName, phone, countryId, stateId, address, assignedStoreId, unassignedStoreId } = body;
        const assignedStoreIdValues = assignedStoreId ? assignedStoreId.join() : '';
        const unAssignedStoreIdValues = unassignedStoreId ?
            unassignedStoreId.join() :
            null;
        let updateProfileQuery = admin_query_2.StoreAdminProfileUpdateQuery;
        if (assignedStoreId != null &&
            assignedStoreId.length > 0 &&
            unassignedStoreId != null &&
            unassignedStoreId.length > 0) {
            updateProfileQuery += `, ${(0, admin_query_2.AssignedStoresQuery)(assignedStoreIdValues)}
        , ${(0, admin_query_2.DeleteStoresQuery)(unAssignedStoreIdValues)}
         ${admin_query_2.statementQuery}`;
        }
        else if (assignedStoreId != null && assignedStoreId.length > 0) {
            updateProfileQuery += `, ${(0, admin_query_2.AssignedStoresQuery)(assignedStoreIdValues)}
          ${admin_query_2.statementQuery}`;
        }
        else if (unassignedStoreId != null && unassignedStoreId.length > 0) {
            updateProfileQuery += ` , ${(0, admin_query_2.DeleteStoresQuery)(unAssignedStoreIdValues)} 
            ${admin_query_2.statementQuery}`;
        }
        else {
            updateProfileQuery += `${admin_query_2.statementQuery}`;
        }
        return this.databaseService
            .rawQuery(updateProfileQuery, [
            id,
            phone,
            countryId,
            stateId,
            address,
            jwtBody.id,
            firstName,
            lastName
        ], admin_dto_2.StoreAdminUpdateDto)
            .pipe((0, rxjs_1.map)(() => {
            return { message: 'Updated admin detail successfully' };
        }));
    }
    async inviteStoreAdmin(inviteBody, jwtBody) {
        const { firstName, email, storeId } = inviteBody;
        const assignedStoreIdValues = storeId.join();
        const insertQuery = (0, admin_query_1.storeAdminInviteQuery)(assignedStoreIdValues);
        const adminInviteQuery = await (0, rxjs_1.firstValueFrom)(this.databaseService
            .rawQuery(insertQuery, [firstName, email, jwtBody.id], store_dto_1.StoreAdminInviteDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                data: resultData
            };
        })));
        const adminId = adminInviteQuery.data[0].adminId;
        const payload = { username: email, userId: adminId };
        const jwtToken = this.jwtService.sign(payload, {
            expiresIn: this.config.jwt.admin_invitation_expire_in,
            secret: this.config.jwt.forgot_password_secret
        });
        const url = `${this.config.mail.admin_redirect_link}?type=${K.USERTYPE.STORE_ADMIN}&name=${firstName}&token=${jwtToken}`;
        return this.mailService.sendLinkToAdminEmail(email, firstName, url);
    }
    getofferDetails(id) {
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.OFFER,
            columnData: K.SELECT_OFFER_DETAILS,
            whereCondition: `offer_id=${id} and is_deleted=false`
        });
        return this.databaseService.rawQuery(query, [], admin_dto_2.OfferFetchDto).pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Offer Detail fetched Successfully',
                data: result[0]
            };
        }));
    }
    updateOfferDetails(body, id, jwtBody) {
        body['updatedBy'] = jwtBody.id;
        const { query, data } = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.OFFER,
            primaryKey: K.PRIMARY_KEYS.OFFER,
            columnData: body,
            whereCondition: `offer_id=${id}`,
            keysToIgnore: []
        });
        return this.databaseService.rawQuery(query, data, admin_dto_2.OfferId).pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Offer Detail updated Successfully'
            };
        }));
    }
    createOfferDtails(body, jwtBody) {
        const { id } = jwtBody;
        body['updatedBy'] = id;
        const { query, value } = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.OFFER, K.PRIMARY_KEYS.OFFER, body, []);
        const finalQuery = format(query, value);
        return this.databaseService.rawQuery(finalQuery, [], admin_dto_2.OfferId).pipe((0, rxjs_1.map)(() => {
            return { message: 'Created offer successfully' };
        }));
    }
    deleteOffer(id) {
        return this.databaseService.rawQuery(admin_query_1.deleteOfferQuery, [id], admin_dto_2.OfferId).pipe((0, rxjs_1.map)(() => {
            return { message: 'Deleted offer successfully' };
        }));
    }
    fetchOfferList(body) {
        const { sortField, sortOrder, searchName, limit, offset } = body;
        if (sortField) {
            if (!Object.keys(K.OFFER_LIST_SORT).includes(sortField))
                throw new common_1.BadRequestException();
        }
        const query = (0, offer_query_1.offerListingQuery)(sortField, sortOrder, limit, offset);
        const dataValue = [searchName ? `%${searchName}%` : null];
        return this.databaseService.rawQuery(query, dataValue, offer_dto_1.OfferListDto).pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Offer Details fetched successfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    updateSection(sectionId, jwtBody, body) {
        const { id } = jwtBody;
        body['updatedBy'] = id;
        const { query, data } = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.SECTION,
            columnData: body,
            primaryKey: K.PRIMARY_KEYS.SECTION,
            keysToIgnore: [],
            whereCondition: `section_id=${sectionId} and is_deleted = false`
        });
        return this.databaseService.rawQuery(query, data, section_dto_1.SectionIdDto).pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Updated Successfully'
            };
        }));
    }
    deleteSection(sectionId) {
        return this.databaseService
            .rawQuery(admin_query_1.deleteSectionQuery, [sectionId], section_dto_1.SectionIdDto)
            .pipe((0, rxjs_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return {
                message: 'Deleted Successfully'
            };
        }));
    }
    createSection(body, jwtBody) {
        const { id } = jwtBody;
        body['updatedBy'] = id;
        const { query, value } = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.SECTION, K.PRIMARY_KEYS.SECTION, body, []);
        const finalQuery = format(query, value);
        return this.databaseService.rawQuery(finalQuery, [], section_dto_1.SectionIdDto).pipe((0, rxjs_1.map)(() => {
            return {
                message: 'Created Successfully'
            };
        }));
    }
    singleOfferProductList(offerId, param) {
        const { limit, offset, sortField, sortOrder, filterCategory, assigned } = param;
        if (sortField) {
            if (!Object.keys(K.SECTION_PRODUCT_LIST_SORT).includes(sortField))
                throw new common_1.BadRequestException();
        }
        const { query, dataValue } = (0, admin_query_1.singleOfferProductListQuery)(limit, offset, sortField, sortOrder, filterCategory, assigned);
        return this.databaseService
            .rawQuery(query, [offerId, ...dataValue], admin_dto_1.SingleOfferProductListDto)
            .pipe((0, rxjs_1.map)((resultData) => {
            return {
                message: 'Single offer product list fetched successfully',
                data: resultData,
                pagination: {
                    total: resultData.length === 0 ? 0 : resultData[0].count
                }
            };
        }));
    }
    singleOfferProductAssign(body) {
        const { offerId, productId } = body;
        const assignedProductIdValues = productId.join();
        const query = (0, admin_query_1.singleOfferProductAssignQuery)(assignedProductIdValues);
        return this.databaseService.rawQuery(query, [offerId], admin_dto_2.MessageDto).pipe((0, rxjs_1.map)(() => {
            return { message: 'Offer assigned successfully' };
        }));
    }
    singleOfferProductUnassign(offerId, productId) {
        return this.databaseService
            .rawQuery(admin_query_1.singleOfferProductUnassignQuery, [offerId, productId], admin_dto_2.MessageDto)
            .pipe((0, rxjs_1.map)((data) => {
            if (data.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'Offer unassigned successfully' };
        }));
    }
    async adminPasswordUpdate(adminId, jwtBody, body) {
        const { id, email } = jwtBody;
        if (id != adminId)
            throw new common_1.UnauthorizedException();
        const { oldPassword, newPassword } = body;
        if (oldPassword === newPassword)
            throw new common_1.BadRequestException();
        const iteration = parseInt(this.config.password.iteration);
        const passKeyLen = parseInt(this.config.password.password_key_len);
        const newSalt = (0, crypto_1.randomBytes)(128).toString('base64');
        const newPasswordDerivedKey = pbkdf2
            .pbkdf2Sync(newPassword, newSalt, iteration, passKeyLen)
            .toString('base64');
        body['password'] = newPasswordDerivedKey;
        body['salt'] = newSalt;
        body['updatedBy'] = id;
        const selectQuery = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.ADMIN,
            columnData: K.SELECT_ADMIN_COLUMN_DATA,
            whereCondition: `${K.EMAIL}='${email}'`
        });
        const admin = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(selectQuery, [], auth_dto_1.LoginUserDto));
        const { password, salt } = admin[0];
        const oldPasswordDerivedKey = pbkdf2
            .pbkdf2Sync(oldPassword, salt, iteration, passKeyLen)
            .toString('base64');
        if (password !== oldPasswordDerivedKey)
            throw new common_1.UnauthorizedException();
        const query = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.ADMIN,
            primaryKey: K.PRIMARY_KEYS.ADMIN,
            columnData: body,
            keysToIgnore: ['oldPassword', 'newPassword'],
            whereCondition: `${K.EMAIL}='${email}'`
        });
        return this.databaseService
            .rawQuery(query.query, query.data, admin_dto_1.AdminPasswordUpdateDto)
            .pipe((0, rxjs_1.map)(() => {
            return { message: 'Admin password updated successfully' };
        }));
    }
};
AdminService = __decorate([
    (0, common_1.Injectable)(),
    __param(4, (0, common_1.Inject)(configuration_1.default.KEY)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        config_1.ConfigService,
        jwt_1.JwtService,
        mail_service_1.MailService, void 0])
], AdminService);
exports.AdminService = AdminService;
//# sourceMappingURL=admin.service.js.map