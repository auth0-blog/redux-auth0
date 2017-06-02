# React + Redux + Auth0

This repo goes along with the [tutorial at SitePoint](https://www.sitepoint.com/redux-authentication-auth0/) and shows how to create a React + Redux app that calls an API and authenticates users with Auth0.

![single jedi](https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2016/06/1464890085redux-auth-7.png)

## Installation and Running the App

The app has a server directory that has an Express API for serving up Jedi data.

If you haven't already done so, [sign up for Auth0](https://auth0.com/signup) and retrieve your credentials from your [management area](https://manage.auth0.com).

Once you have your credentials, replace the values in `server/server.js` with your secret and client ID, an the values in the Lock instance in `actions/index.js` with your client ID and domain.

After that, install the dependencies and run the app.

```bash
cd server
npm install
node server.js

cd ..
npm install
npm start
```

## What is Auth0?

Auth0 helps you to:

* Add authentication with [multiple authentication sources](https://docs.auth0.com/identityproviders), either social like **Google, Facebook, Microsoft Account, LinkedIn, GitHub, Twitter, Box, Salesforce, amont others**, or enterprise identity systems like **Windows Azure AD, Google Apps, Active Directory, ADFS or any SAML Identity Provider**.
* Add authentication through more traditional **[username/password databases](https://docs.auth0.com/mysql-connection-tutorial)**.
* Add support for **[linking different user accounts](https://docs.auth0.com/link-accounts)** with the same user.
* Support for generating signed [Json Web Tokens](https://docs.auth0.com/jwt) to call your APIs and **flow the user identity** securely.
* Analytics of how, when and where users are logging in.
* Pull data from other sources and add it to the user profile, through [JavaScript rules](https://docs.auth0.com/rules).

## Create a free Auth0 account

1. Go to [Auth0](https://auth0.com/signup) and click Sign Up.
2. Use Google, GitHub or Microsoft Account to login.

## Issue Reporting

If you have found a bug or if you have a feature request, please report them at this repository issues section. Please do not report security vulnerabilities on the public GitHub issue tracker. The [Responsible Disclosure Program](https://auth0.com/whitehat) details the procedure for disclosing security issues.

## Author

[Auth0](auth0.com)

## License

This project is licensed under the MIT license. See the [LICENSE](LICENSE) file for more info.
