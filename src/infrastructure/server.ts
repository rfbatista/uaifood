import { makeModule } from '@di/container';
import { requestContainer } from '@di/middleware';
import { errorHanlder } from '@infrastructure/middlewares/error-handler';
import { notFoundHanlder } from '@infrastructure/middlewares/not-found-hanlder';
import { requestId } from '@infrastructure/middlewares/request-Id';
import { resultHanlder } from '@infrastructure/middlewares/result-handler';
import express, { Router, json, urlencoded, Express } from 'express';

const server = makeModule(
  'server',
  async ({ container, onReady, asValue, logger, config: { http } }): Promise<void> => {
    const serverExpress: Express = express();
    const apiRouter = Router();

    serverExpress
      .use(requestId())
      .use(requestContainer(container))
      .use(json({ limit: '1mb' }))
      .use(urlencoded({ extended: true }))
      .use('/api', apiRouter)
      .use(notFoundHanlder)
      .use(errorHanlder)
      .use(resultHanlder);

    onReady(
      async () =>
        new Promise((resolve) => {
          serverExpress.listen(http.port, () => {
            logger.info(`Webserver listening at: http://${http.host}:${http.port}`);
            resolve();
          });
        }),
    );
    container.register({
      server: asValue(serverExpress),
      apiRouter: asValue(apiRouter),
    });
  },
);

export { server };
