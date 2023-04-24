import { Inject, Injectable } from '@nestjs/common';
import configuration from 'src/config/configuration';
import { ConfigType } from '@nestjs/config';
import { skip } from 'rxjs';

interface UpdateQueryForMultipleRow {
  tableName: string;
  primaryKey: string;
  keysToIgnore: string[];
  columnData: { [s: string]: any };
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
@Injectable()
export class UtilsService {
  constructor(
    @Inject(configuration.KEY)
    private config: ConfigType<typeof configuration>
  ) {}

  sampleUtil(data: any[]) {
    return data;
  }

  static camelToSnakeCase(str) {
    return str.replace(/[A-Z0-9]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  static convertSnakeCaseToCamelCase(stringToBeConverted: string) {
    return stringToBeConverted.replace(/(_\w)/g, (k) => {
      return k[1].toUpperCase();
    });
  }

  static convertStringToSentenceCase(stringToBeConverted: string) {
    return stringToBeConverted.replace(
      /\w\S*/g,
      (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
  }
  static generateUpdateQuery({
    tableName,
    primaryKey,
    columnData,
    keysToIgnore,
    keysToReplace = {},
    addSqlQuery = {},
    whereCondition,
    start = 1
  }: UpdateQueryForMultipleRow) {
    for (const singleKeyToReplace in keysToReplace) {
      columnData[singleKeyToReplace] = keysToReplace[singleKeyToReplace];
    }

    const { preparedParam, preparedValue } = this.alterPreparedParams(
      columnData,
      keysToIgnore,
      start
    );
    for (const key in addSqlQuery) {
      preparedParam.push(`${key} = ${addSqlQuery[key]}`);
    }

    return {
      query: `UPDATE ${tableName} SET ${preparedParam.join(
        ', '
      )},updated_at=CURRENT_TIMESTAMP WHERE ${whereCondition} 
      RETURNING ${primaryKey};`,
      data: preparedValue
    };
  }
  static alterPreparedParams(columnData, keysToIgnore, start = 1) {
    const preparedValue = [];
    const preparedParam = [];
    for (const key in columnData) {
      if (!keysToIgnore.includes(key)) {
        if (columnData[key] === null) skip;
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

  static generateInsertMultipleRowQuery(
    tableName: string,
    columnData: [{ [s: string]: any }],
    keysToIgnore: string[]
  ) {
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
    } catch (error) {
      throw error;
    }
  }
  static generateSelectQuery({
    tableName,
    columnData,
    whereCondition,
    orderCondtion
  }: SelectQuery) {
    try {
      const columnNames = columnData.join(', ');
      let selectQuery = '';

      if (!whereCondition) {
        selectQuery = `SELECT ${columnNames} FROM ${tableName}
         ${orderCondtion};`;
      } else {
        selectQuery = `SELECT ${columnNames} FROM ${tableName} 
        WHERE ${whereCondition};`;
      }
      return selectQuery;
    } catch (error) {
      throw error;
    }
  }

  static generateInsertQuery(
    tableName: string,
    primaryKey: string,
    columnData: { [s: string]: any },
    keysToIgnore: string[]
  ) {
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
    } catch (error) {
      throw error;
    }
  }

  static generateDeleteQuery({ tableName, primaryKey, value }: DeleteQuery) {
    try {
      return {
        query: `DELETE FROM ${tableName}
        WHERE ${primaryKey}=${value} RETURNING *;`
      };
    } catch (error) {
      throw error;
    }
  }

  /**
   * Function to generate query for soft deletion.
   * @param tableName - Name of the table.
   * @param primaryKey - Primary key of the predefined table.
   * @param value - Value that is passed for soft deletion.
   * @returns - Primary key
   */

  static generateSoftDeleteQuery({
    tableName,
    primaryKey,
    value
  }: DeleteQuery) {
    try {
      return {
        query: `UPDATE ${tableName}
         SET is_deleted = true
         WHERE ${primaryKey} = ${value} RETURNING ${primaryKey};`
      };
    } catch (error) {
      throw error;
    }
  }

  static generateBulkDeleteQuery({
    tableName,
    primaryKey,
    value
  }: BulkDeleteQuery) {
    try {
      const query = `DELETE FROM ${tableName}
      WHERE ${primaryKey} IN (${value.join(',')}) RETURNING ${primaryKey};`;
      return query;
    } catch (error) {
      throw error;
    }
  }
}
