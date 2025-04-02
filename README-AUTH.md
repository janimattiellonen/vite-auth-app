# Auth0 Setup Guide

This guide explains how to set up Auth0 authentication for the AuthApp project.

## 1. Create an Auth0 Account

1. Go to [Auth0](https://auth0.com/) and sign up for an account
2. Create a new tenant or use an existing one

## 2. Set Up Single Page Application

1. In the Auth0 Dashboard, go to "Applications" > "Applications"
2. Click "Create Application"
3. Name it "AuthApp"
4. Select "Single Page Application"
5. Click "Create"

### Configure Single Page Application

1. In the application settings:
   - Allowed Callback URLs: `https://localhost:5199, https://localhost:5199/callback`
   - Allowed Logout URLs: `https://localhost:5199`
   - Allowed Web Origins: `https://localhost:5199`
   - Click "Save Changes"

2. Note down these values for your `.env` file:
   - Domain
   - Client ID
   - Client Secret (if shown)

## 3. Set Up Machine to Machine Application

This application is needed for the Management API to create users.

1. In Auth0 Dashboard, go to "Applications" > "Applications"
2. Click "Create Application"
3. Name it "AuthApp Management API"
4. Select "Machine to Machine Application"
5. Click "Create"

### Configure Machine to Machine Application

1. Select "Auth0 Management API" as the API to access
2. Select these permissions:
   - `create:users`
   - `read:users`
   - `update:users`
   - `delete:users`
3. Click "Authorize"

4. Note down these values for your `.env` file:
   - Client ID
   - Client Secret

## 4. Update Environment Variables

Update your `.env` file with the following values:

```env
# Auth0 Single Page Application
VITE_AUTH0_DOMAIN="your-tenant.region.auth0.com"
VITE_AUTH0_CLIENT_ID="your-spa-client-id"
VITE_AUTH0_AUDIENCE="https://api.authapp.local"
VITE_AUTH0_CALLBACK_URL="https://localhost:5199/callback"

# Auth0 Management API
AUTH0_MGMT_DOMAIN="your-tenant.region.auth0.com"
AUTH0_MGMT_CLIENT_ID="your-m2m-client-id"
AUTH0_MGMT_CLIENT_SECRET="your-m2m-client-secret"
AUTH0_MGMT_AUDIENCE="https://your-tenant.region.auth0.com/api/v2/"
```

## 5. Configure Database Connection

1. Go to "Authentication" > "Database"
2. Click on "Username-Password-Authentication"
3. In the "Applications" tab, ensure both your applications are enabled
4. In the "Password Policy" tab, configure password requirements
5. Optionally, enable email verification in the "Email" tab

## 6. Testing the Setup

1. Start your development server:
   ```bash
   npm run dev
   ```

2. Visit https://localhost:5199
3. Try to register a new user
4. Try to log in with the registered user
5. Try to access protected routes

## Troubleshooting

### Common Issues

1. **Unauthorized Error**: Check your Management API credentials and permissions
2. **Callback URL Error**: Verify the callback URLs in Auth0 settings match your application
3. **CORS Error**: Ensure Web Origins are properly configured
4. **Invalid Audience**: Make sure the audience matches in both Auth0 and your application

### Useful Links

- [Auth0 React SDK Documentation](https://auth0.com/docs/quickstart/spa/react)
- [Auth0 Management API Documentation](https://auth0.com/docs/api/management/v2)
- [Auth0 Authentication API Documentation](https://auth0.com/docs/api/authentication)
