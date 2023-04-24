import configuration from 'src/config/configuration';
import { ConfigType } from '@nestjs/config';
interface UpdateQueryForMultipleRow {
    tableName: string;
    primaryKey: string;
    keysToIgnore: string[];
    columnData: {
        [s: string]: any;
    };
    keysToReplace?: Record<string, any>;
    whereCondition?: string;
    addSqlQuery?: Record<string, any>;
    start?: number;
}
interface SelectQuery {
    tableName: string;
    columnData: string[];
    whereCondition?: string;
    orderCondtion?: string;
}
interface DeleteQuery {
    tableName: string;
    value: number;
    primaryKey: string;
}
interface BulkDeleteQuery {
    tableName: string;
    value: number[];
    primaryKey: string;
}
export declare class UtilsService {
    private config;
    constructor(config: ConfigType<typeof configuration>);
    sampleUtil(data: any[]): any[];
    static camelToSnakeCase(str: any): any;
    static convertSnakeCaseToCamelCase(stringToBeConverted: string): string;
    static convertStringToSentenceCase(stringToBeConverted: string): string;
    static generateUpdateQuery({ tableName, primaryKey, columnData, keysToIgnore, keysToReplace, addSqlQuery, whereCondition, start }: UpdateQueryForMultipleRow): {
        query: string;
        data: any[];
    };
    static alterPreparedParams(columnData: any, keysToIgnore: any, start?: number): {
        preparedParam: any[];
        preparedValue: any[];
    };
    static generateInsertMultipleRowQuery(tableName: string, columnData: [{
        [s: string]: any;
    }], keysToIgnore: string[]): {
        query: string;
        value: any[];
    };
    static generateSelectQuery({ tableName, columnData, whereCondition, orderCondtion }: SelectQuery): string;
    static generateInsertQuery(tableName: string, primaryKey: string, columnData: {
        [s: string]: any;
    }, keysToIgnore: string[]): {
        query: string;
        value: any[];
    };
    static generateDeleteQuery({ tableName, primaryKey, value }: DeleteQuery): {
        query: string;
    };
    static generateSoftDeleteQuery({ tableName, primaryKey, value }: DeleteQuery): {
        query: string;
    };
    static generateBulkDeleteQuery({ tableName, primaryKey, value }: BulkDeleteQuery): string;
}
export {};
