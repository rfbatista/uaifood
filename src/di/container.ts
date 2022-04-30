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

  const onReady = (fn: () => Promise<void>): void => {
    onReadyHook.push(fn);
  };

  const makeModule = (name: string, fn: (data: MakeModuleCallback) => Promise<void>): Module => {
    return {
      name,
      fn,
    };
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
  };

  return {
    makeModule,
    bootstrap,
  };
})(logger, appConfig);

export { makeModule, bootstrap };
