const getEnv = (key: string) => {
  const envVariable = import.meta.env[key];

  if (!envVariable) {
    throw new Error(`Env variable ${key} not found`);
  }

  return envVariable as string;
};

export default {
  API_URL: getEnv('VITE_APP_API_URL'),
  NODE_ENV: getEnv('VITE_NODE_ENV'),
  DEFAULT_TITLE: getEnv('VITE_APP_TITLE')
};
