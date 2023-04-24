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
exports.UtilsService = void 0;
const common_1 = require("@nestjs/common");
const configuration_1 = require("../config/configuration");
const rxjs_1 = require("rxjs");
let UtilsService = class UtilsService {
    constructor(config) {
        this.config = config;
    }
    sampleUtil(data) {
        return data;
    }
    static camelToSnakeCase(str) {
        return str.replace(/[A-Z0-9]/g, (letter) => `_${letter.toLowerCase()}`);
    }
    static convertSnakeCaseToCamelCase(stringToBeConverted) {
        return stringToBeConverted.replace(/(_\w)/g, (k) => {
            return k[1].toUpperCase();
        });
    }
    static convertStringToSentenceCase(stringToBeConverted) {
        return stringToBeConverted.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());
    }
    static generateUpdateQuery({ tableName, primaryKey, columnData, keysToIgnore, keysToReplace = {}, addSqlQuery = {}, whereCondition, start = 1 }) {
        for (const singleKeyToReplace in keysToReplace) {
            columnData[singleKeyToReplace] = keysToReplace[singleKeyToReplace];
        }
        const { preparedParam, preparedValue } = this.alterPreparedParams(columnData, keysToIgnore, start);
        for (const key in addSqlQuery) {
            preparedParam.push(`${key} = ${addSqlQuery[key]}`);
        }
        return {
            query: `UPDATE ${tableName} SET ${preparedParam.join(', ')},updated_at=CURRENT_TIMESTAMP WHERE ${whereCondition} 
      RETURNING ${primaryKey};`,
            data: preparedValue
        };
    }
    static alterPreparedParams(columnData, keysToIgnore, start = 1) {
        const preparedValue = [];
        const preparedParam = [];
        for (const key in columnData) {
            if (!keysToIgnore.includes(key)) {
                if (columnData[key] === null)
                    rxjs_1.skip;
                else {
                    preparedParam.push(`${this.camelToSnakeCase(key)} =$${start}`);
                    preparedValue.push(columnData[key]);
                    start++;
                }
            }
        }
        return {
            preparedParam,
            preparedValue
        };
    }
    static generateInsertMultipleRowQuery(tableName, columnData, keysToIgnore) {
        try {
            const columnKeyNames = Object.keys(columnData[0]);
            const paramvalue = [];
            const columnNamesSnakeCase = columnKeyNames
                .filter((x) => !keysToIgnore.includes(x))
                .map(this.camelToSnakeCase);
            columnData.map((singleColumn) => {
                keysToIgnore.forEach((x) => {
                    delete singleColumn[x];
                });
                paramvalue.push(Object.values(singleColumn));
            });
            const columnNames = columnNamesSnakeCase.join(', ');
            const insertQuery = `INSERT INTO ${tableName} 
      (${columnNames}) VALUES %L;`;
            return { query: insertQuery, value: paramvalue };
        }
        catch (error) {
            throw error;
        }
    }
    static generateSelectQuery({ tableName, columnData, whereCondition, orderCondtion }) {
        try {
            const columnNames = columnData.join(', ');
            let selectQuery = '';
            if (!whereCondition) {
                selectQuery = `SELECT ${columnNames} FROM ${tableName}
         ${orderCondtion};`;
            }
            else {
                selectQuery = `SELECT ${columnNames} FROM ${tableName} 
        WHERE ${whereCondition};`;
            }
            return selectQuery;
        }
        catch (error) {
            throw error;
        }
    }
    static generateInsertQuery(tableName, primaryKey, columnData, keysToIgnore) {
        try {
            const columnKeyNames = Object.keys(columnData);
            const paramvalue = [];
            const columnNamesSnakeCase = columnKeyNames
                .filter((x) => !keysToIgnore.includes(x))
                .map(this.camelToSnakeCase);
            const columnNames = columnNamesSnakeCase.join(', ');
            keysToIgnore.forEach((x) => delete columnData[x]);
            paramvalue.push(Object.values(columnData));
            const insertQuery = `INSERT INTO ${tableName} 
      (${columnNames}) VALUES %L RETURNING  ${primaryKey};`;
            return { query: insertQuery, value: paramvalue };
        }
        catch (error) {
            throw error;
        }
    }
    static generateDeleteQuery({ tableName, primaryKey, value }) {
        try {
            return {
                query: `DELETE FROM ${tableName}
        WHERE ${primaryKey}=${value} RETURNING *;`
            };
        }
        catch (error) {
            throw error;
        }
    }
    static generateSoftDeleteQuery({ tableName, primaryKey, value }) {
        try {
            return {
                query: `UPDATE ${tableName}
         SET is_deleted = true
         WHERE ${primaryKey} = ${value} RETURNING ${primaryKey};`
            };
        }
        catch (error) {
            throw error;
        }
    }
    static generateBulkDeleteQuery({ tableName, primaryKey, value }) {
        try {
            const query = `DELETE FROM ${tableName}
      WHERE ${primaryKey} IN (${value.join(',')}) RETURNING ${primaryKey};`;
            return query;
        }
        catch (error) {
            throw error;
        }
    }
};
UtilsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(configuration_1.default.KEY)),
    __metadata("design:paramtypes", [void 0])
], UtilsService);
exports.UtilsService = UtilsService;
//# sourceMappingURL=utils.service.js.map