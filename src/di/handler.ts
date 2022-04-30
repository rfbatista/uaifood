import { ScopedRequest } from '@di/middleware';
import { asFunction } from 'awilix';
import { NextFunction, Request, Response } from 'express';

type HandlerType = (context: any) => (req, res, next) => Promise<unknown>;

type HandlerScoped = (req: ScopedRequest | Request, res: Response, next: NextFunction) => unknown;

const runAsync =
  (handler: (req, res, next) => Promise<unknown>) =>
  (req: unknown, res: unknown, next: NextFunction): Promise<unknown> =>
    handler(req, res, next).catch(next);

const handler = (handlerToResolve: HandlerType): HandlerScoped => {
  const resolver = asFunction(handlerToResolve);

  const handlerScoped: HandlerScoped = (req: ScopedRequest | Request, res: Response, next: NextFunction): unknown => {
    if (!('container' in req)) {
      throw new Error("Can't find the request container! Have you registered the `requestContainer` middleware?");
    }
    const injectedHandler = req?.container?.build(resolver);
    if (injectedHandler) return runAsync(injectedHandler)(req, res, next);
  };

  return handlerScoped;
};

export { handler };
