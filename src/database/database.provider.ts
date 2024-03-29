import { Logger, Provider } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Pool } from 'pg';
import { from, lastValueFrom } from 'rxjs';
import { delay, retryWhen, scan, tap } from 'rxjs/operators';
import configuration from './../config/configuration';

const POSTGRES_CONNECTION = 'postgres_connection';

export const pgConnectionFactory: Provider = {
  provide: POSTGRES_CONNECTION,
  useFactory: async (config: ConfigType<typeof configuration>) => {
    const logger = new Logger('pgConnectionFactory');
    const pool = new Pool({
      host: config.pg.dbHost,
      database: config.pg.dbName,
      port: parseInt(config.pg.dbPort, 10),
      user: config.pg.dbUsername,
      password: config.pg.dbPassword
    });
    return lastValueFrom(
      from(pool.connect()).pipe(
        retryWhen(e =>
          e.pipe(
            scan((errorCount: number, error: Error) => {
              logger.warn(
                `Unable to connect to database. ${error.message}. Retrying ${
                  errorCount + 1
                }...`
              );
              if (errorCount + 1 > 9) {
                throw error;
              }
              return errorCount + 1;
            }, 0),
            delay(1 * 1000)
          )
        ),
        tap(() => {
          logger.log('Connected to Postgres Database successfully!');
        })
      )
    );
  },
  inject: [configuration.KEY]
};
