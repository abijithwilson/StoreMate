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
exports.UsersService = void 0;
const operators_1 = require("rxjs/operators");
const common_1 = require("@nestjs/common");
const users_dto_1 = require("../dto/users.dto");
const rxjs_1 = require("rxjs");
const message_dto_1 = require("../dto/message.dto");
const pbkdf2 = require("pbkdf2");
const format = require("pg-format");
const K = require("../../shared/constants");
const crypto_1 = require("crypto");
const database_service_1 = require("../../database/database.service");
const utils_service_1 = require("../../utils/utils.service");
const config_1 = require("@nestjs/config");
const configuration_1 = require("../../config/configuration");
const auth_dto_1 = require("../dto/auth.dto");
const users_query_1 = require("../db-queries/users.query");
let UsersService = class UsersService {
    constructor(databaseService, configService, config) {
        this.databaseService = databaseService;
        this.configService = configService;
        this.config = config;
    }
    signUp(signUpBody) {
        const { password } = signUpBody;
        const salt = (0, crypto_1.randomBytes)(128).toString('base64');
        const iteration = parseInt(this.configService.get('ITERATION'));
        const passKeyLen = parseInt(this.configService.get('PASSWORD_KEY_LENGTH'));
        const derivedKey = pbkdf2
            .pbkdf2Sync(password, salt, iteration, passKeyLen)
            .toString('base64');
        signUpBody['password'] = derivedKey;
        signUpBody['salt'] = salt;
        const query = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.USER, K.PRIMARY_KEYS.USER, signUpBody, K.KEYS_TO_IGNORE_IN_USER_INSERT);
        const userInsertQuery = format(query.query, query.value);
        return this.databaseService.rawQuery(userInsertQuery, [], users_dto_1.SignUpDto).pipe((0, operators_1.map)((result) => {
            if (result.length == 0)
                throw new Error('Error in insertion of user, try again..!!');
            return { message: 'User inserted successfully' };
        }));
    }
    userDelete(jwtBody) {
        const { id } = jwtBody;
        const deleteQuery = utils_service_1.UtilsService.generateDeleteQuery({
            primaryKey: K.PRIMARY_KEYS.USER,
            tableName: K.TABLE_NAMES.USER,
            value: id
        });
        return this.databaseService
            .rawQuery(deleteQuery.query, [], users_dto_1.DeleteUserStatus)
            .pipe((0, operators_1.map)(() => {
            return { message: 'User deleted successfully' };
        }));
    }
    userUpdate(jwtBody, body) {
        const { id } = jwtBody;
        body['updatedBy'] = id;
        const queryAndValue = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.USER,
            primaryKey: K.PRIMARY_KEYS.USER,
            keysToIgnore: [],
            whereCondition: `${K.PRIMARY_KEYS.USER}=${id}`,
            columnData: body
        });
        return this.databaseService
            .rawQuery(queryAndValue.query, queryAndValue.data, users_dto_1.SignUpDto)
            .pipe((0, operators_1.map)(() => {
            return { message: 'User updated successfully' };
        }));
    }
    userProfileView(jwtBody) {
        const { id } = jwtBody;
        const query = utils_service_1.UtilsService.generateSelectQuery({
            tableName: K.TABLE_NAMES.USER,
            columnData: K.USER_PROFILE_VIEW_COLOUMN_DATA,
            whereCondition: `${K.PRIMARY_KEYS.USER}='${id}'`
        });
        return this.databaseService.rawQuery(query, [], users_dto_1.UserProfileViewDto).pipe((0, operators_1.map)((result) => {
            return {
                message: 'User details fetched successfully',
                data: result[0]
            };
        }));
    }
    async userPasswordUpdate(userId, jwtBody, body) {
        const { id, email } = jwtBody;
        if (id != userId)
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
            tableName: K.TABLE_NAMES.USER,
            columnData: K.SELECT_LOGIN_COLUMN_DATA,
            whereCondition: `${K.EMAIL}='${email}'`
        });
        const user = await (0, rxjs_1.firstValueFrom)(this.databaseService.rawQuery(selectQuery, [], auth_dto_1.LoginUserDto));
        const { password, salt } = user[0];
        const oldPasswordDerivedKey = pbkdf2
            .pbkdf2Sync(oldPassword, salt, iteration, passKeyLen)
            .toString('base64');
        if (password !== oldPasswordDerivedKey)
            throw new common_1.ForbiddenException();
        const query = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.USER,
            primaryKey: K.PRIMARY_KEYS.USER,
            columnData: body,
            keysToIgnore: ['oldPassword', 'newPassword'],
            whereCondition: `${K.EMAIL}='${email}'`
        });
        return this.databaseService
            .rawQuery(query.query, query.data, users_dto_1.UserPasswordUpdateDto)
            .pipe((0, operators_1.map)(() => {
            return { message: 'User password updated successfully' };
        }));
    }
    userAddressUpdate(jwtBody, body, userId) {
        const { id } = jwtBody;
        if (id != userId)
            throw new common_1.UnauthorizedException();
        const { query, data } = utils_service_1.UtilsService.generateUpdateQuery({
            tableName: K.TABLE_NAMES.ADDRESS,
            primaryKey: K.PRIMARY_KEYS.ADDRESS,
            keysToIgnore: [],
            whereCondition: `${K.FOREIGN_KEYS.ADDRESS.USER}=${userId}`,
            columnData: body
        });
        return this.databaseService
            .rawQuery(query, data, users_dto_1.UserAddressUpdateDto)
            .pipe((0, operators_1.map)(() => {
            return { message: 'User address updated successfully' };
        }));
    }
    userAddressCreate(jwtBody, body) {
        const { id } = jwtBody;
        body['updatedBy'] = id;
        body['user_id'] = id;
        const query = utils_service_1.UtilsService.generateInsertQuery(K.TABLE_NAMES.ADDRESS, K.PRIMARY_KEYS.ADDRESS, body, []);
        const userAddressInsertQuery = format(query.query, query.value);
        return this.databaseService
            .rawQuery(userAddressInsertQuery, [], users_dto_1.UserAddressCreateDto)
            .pipe((0, operators_1.map)((result) => {
            if (result.length === 0)
                throw new Error('Error in insertion of address, try again..!!');
            return { message: 'Address inserted successfully' };
        }));
    }
    userAddressFetch(id, jwtBody) {
        if (id !== Number(jwtBody.id))
            throw new common_1.UnauthorizedException();
        return this.databaseService
            .rawQuery(users_query_1.fetchAddressDetailQuery, [id], users_dto_1.AddressDetailDto)
            .pipe((0, operators_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'Address fetched successfully', data: result[0] };
        }));
    }
    userAddressDelete(id, jwtBody) {
        if (id !== Number(jwtBody.id))
            throw new common_1.UnauthorizedException();
        const deleteQuery = utils_service_1.UtilsService.generateDeleteQuery({
            tableName: K.TABLE_NAMES.ADDRESS,
            primaryKey: K.FOREIGN_KEYS.ADDRESS.USER,
            value: id
        });
        return this.databaseService
            .rawQuery(deleteQuery.query, [], users_dto_1.UserAddressIdDto)
            .pipe((0, operators_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'Address deleted successfully' };
        }));
    }
    userRewardUpdate(jwtBody, body) {
        const { id } = jwtBody;
        const { majorId } = body;
        return this.databaseService
            .rawQuery(users_query_1.updateUserRewardQuery, [majorId, id], users_dto_1.UserIdDto)
            .pipe((0, operators_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.HttpException({
                    message: 'Reward already updated'
                }, common_1.HttpStatus.PARTIAL_CONTENT);
            return {
                message: 'Reward updated successfully'
            };
        }));
    }
    userExitUpdate(jwtBody, body) {
        const { id } = jwtBody;
        const { deviceId } = body;
        return this.databaseService.rawQuery(users_query_1.userExitQuery, [deviceId, id], message_dto_1.MessageDto).pipe((0, operators_1.map)((result) => {
            if (result.length === 0)
                throw new common_1.NotFoundException();
            return { message: 'User data updated successfully' };
        }));
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(2, (0, common_1.Inject)(configuration_1.default.KEY)),
    __metadata("design:paramtypes", [database_service_1.DatabaseService,
        config_1.ConfigService, void 0])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map