import {handleAuth, handleLogin, handleLogout} from "@auth0/nextjs-auth0";

export default handleAuth({
  async login(req, res) {
    await handleLogin(req, res, {
      returnTo: "/dashboard",
      authorizationParams: {
        ...(req.query || {}),
        audience: process.env.AUTH0_AUDIENCE,
        scope: "openid email profile",

        //  Setup: Create a new scope for the API server in Auth0"
        //  Auth0 -> Application -> API -> Name: "anything" ->
        //  Security -> Scopes -> Add a new scope ->
        //  Name: "newron-server" -> Description: "anything"
      },
      session: {
        storeRefreshToken: true,
        storeAccessToken: false,
      }
    });
  },
  async logout(req, res) {
    await handleLogout(req, res, {
      returnTo: "/",
    });
  },
});
