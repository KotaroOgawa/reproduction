const environments = {
  development: {
    apiBaseUrl: "http://localhost:8080/api",
  },
  production: {
    apiBaseUrl: "https://example.com/api",
  },
};
const currentEnv = "development";

export const config = environments[currentEnv];
