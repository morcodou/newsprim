require('dotenv').config();

const {
    DATABASE_URL,
    AUTH0_CLIENT_ID,
    AUTH0_ISSUER_BASE_URL,
    AUTH0_CLIENT_SECRET,
    AUTH0_SCOPE,
    AUTH0_SECRET,
    AUTH0_BASE_URL,
} = process.env;

module.exports = {
    publicRuntimeConfig: {
        BACKEND_URL: `${AUTH0_BASE_URL}/api/graphql`
    },
    serverRuntimeConfig: {
        auth: {
            baseURL: AUTH0_BASE_URL,
            issuerBaseURL: AUTH0_ISSUER_BASE_URL,
            clientID: AUTH0_CLIENT_ID,
            clientSecret: AUTH0_CLIENT_SECRET,
            secret: AUTH0_SECRET,
        },
        authorizationParams: {
            scope: AUTH0_SCOPE,
        },
        routes: {
            callback: `/api/callback`,
            postLogoutRedirect: `/`
        }
    }
}
