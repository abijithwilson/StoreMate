import * as morgan from 'morgan';
import { CustomLogger } from '../shared/custom-logger/custom-logger.service';

export function useRequestLogging(app) {
  const logger = new CustomLogger('Http');
  app.use(
    morgan(
      ':remote-addr - :remote-user ":method :url HTTP/:http-version"' +
        ':status :res[content-length] ":referrer" ":user-agent"    ',
      {
        skip: req => {
          return (
            process.env.NODE_ENV === 'production' || req.url === '/status.html'
          );
        },
        stream: {
          write: (message) => logger.log(message.replace('\n', ''))
        }
      }
    )
  );
}
