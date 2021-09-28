import { initAuth0 } from '@auth0/nextjs-auth0';
import getConfig from 'next/config';

const { serverRuntimeConfig } = getConfig();
const { auth, authorizationParams, routes } = serverRuntimeConfig;

export default initAuth0({
  ...auth,
  authorizationParams,
  routes,
  clockTolerance: 60,
  httpTimeout: 5000,
  session: {
    rollingDuration: 60 * 60 * 24,
    absoluteDuration: 60 * 60 * 24 * 7
  }
});