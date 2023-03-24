export const oktaConfig = {
    issuer: `https://${process.env.REACT_APP_OKTA_DOMAIN}/oauth2/default`,
    clientId: process.env.REACT_APP_CLIENT_ID,
    redirectUri: `${window.location.origin}/dev/login/callback`,
    scopes: ["openid", "profile", "email"],
    pkce: true,
};