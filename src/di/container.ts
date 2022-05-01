import { CorePorts } from '@core/ports';
import { config as appConfig } from '@infrastructure/config/index';
import { Logger, logger } from '@infrastructure/logger';
import { createContainer, asFunction, AwilixContainer, asValue } from 'awilix';

const container = createContainer();

type MakeModuleCallback = {
  container: AwilixContainer<CorePorts & any>;
  asFunction: typeof asFunction;
  asValue: typeof asValue;
  onReady: (fn: () => Promise<void>) => void;
  onDisposing: (fn: () => Promise<void>) => void;
  logger: Logger;
  config: typeof appConfig;
};

type Module = {
  name: string;
  fn: (data: MakeModuleCallback) => Promise<void>;
};

type MakeModule = (
  name: string,
  fn: (data: MakeModuleCallback) => Promise<void>,
) => { name: string; fn: (data: MakeModuleCallback) => Promise<void> };

type Bootstrap = (modules: Module[]) => Promise<void>;

const { makeModule, bootstrap } = ((
  logger: Logger,
  config: typeof appConfig,
): { makeModule: MakeModule; bootstrap: Bootstrap } => {
  const onReadyHook: (() => Promise<void>)[] = [];
  const onDisposingHook: (() => Promise<void>)[] = [];

  const onReady = (fn: () => Promise<void>): void => {
    onReadyHook.push(fn);
  };

  const onDisposing = (fn: () => Promise<void>): void => {
    onDisposingHook.push(fn);
  };

  const makeModule = (name: string, fn: (data: MakeModuleCallback) => Promise<void>): Module => {
    return {
      name,
      fn,
    };
  };

  const stop = async () => {
    const promises: Promise<unknown>[] = [];
    for (const hook of onDisposingHook) promises.push(hook());
    await Promise.all(promises);
  };

  const shutdown = (code) => async () => {
    process.stdout.write('\n');
    setTimeout(() => {
      logger.error('Ok, my patience is over! #ragequit');
      process.exit(code);
    }, 10000).unref();
    await stop();
    process.exit(code);
  };

  const bootstrap: Bootstrap = async (modules: Module[]): Promise<void> => {
    let module;
    try {
      for (module of modules) {
        logger.info(`Bootstraping ${module.name} module`);
        await module.fn({
          container,
          asFunction,
          asValue,
          onReady,
          onDisposing,
          logger,
          config,
        });
      }
    } catch (error) {
      logger.error(`Error bootstraping module ${module?.name || ''}`, error);
      return;
    }
    onReadyHook.forEach((hook) => {
      hook()
        .then(() => {
          return;
        })
        .catch(() => {
          return;
        });
    });
    process.on('SIGTERM', shutdown(0));
    process.on('SIGINT', shutdown(0));
    process.on('uncaughtException', shutdown(1));
    process.on('unhandledRejection', shutdown(1));
  };

  return {
    makeModule,
    bootstrap,
  };
})(logger, appConfig);

export { makeModule, bootstrap };
