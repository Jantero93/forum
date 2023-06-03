const getEnv = (key: string) => {
  const envVariable = import.meta.env[key] ?? 'moro';

  if (!envVariable) {
    throw new Error(`Env variable ${key} not found`);
  }

  return envVariable;
};

export default {
  API_URL: getEnv('VITE_APP_API_URL')
};
