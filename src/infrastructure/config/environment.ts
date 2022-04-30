import dotenv from 'dotenv';

dotenv.config();

const envString = (variable: string, defaultValue?: string): string => {
  const value = process.env[variable] || defaultValue;

  if (value == null) {
    throw new TypeError(`Required environment variable ${variable} is undefined and has no default`);
  }

  return value;
};

const envNumber = (variable: string, defaultValue?: number): number => {
  const value = Number(process.env[variable]) || defaultValue;

  if (value == null) {
    throw new TypeError(`Required environment variable ${variable} is undefined and has no default`);
  }

  return value;
};

export { envString, envNumber };
