# Vercel Web Analytics Setup

This project has been configured with Vercel Web Analytics to track server-side events and API usage.

## What's Been Configured

1. **Package Installation**: The `@vercel/analytics` package has been added to the project dependencies.

2. **Server Integration**: Analytics tracking has been initialized in `server.js` using the `inject()` function, which enables tracking of server-side events.

3. **Vercel Configuration**: A `vercel.json` file has been created to properly configure the Express backend for deployment on Vercel.

## Enabling Analytics in Vercel Dashboard

To start collecting analytics data, you need to enable Web Analytics in your Vercel project:

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard)
2. Select your project (a-iguru-server)
3. Click on the **Analytics** tab
4. Click **Enable** to activate Web Analytics

> **Note:** Enabling Web Analytics will add new routes (scoped at `/_vercel/insights/*`) after your next deployment.

## Deploying to Vercel

Deploy your app using one of these methods:

### Using Vercel CLI

```bash
# Install Vercel CLI if you haven't already
npm i -g vercel

# Deploy
vercel deploy
```

### Using Git Integration (Recommended)

1. Connect your Git repository to Vercel
2. Push your changes to the main branch
3. Vercel will automatically deploy your latest commits

## Verifying Analytics Integration

Once deployed, you can verify that analytics is working by:

1. Making API requests to your endpoints
2. Checking the browser's Network tab for requests to `/_vercel/insights/` endpoints
3. Viewing analytics data in the Vercel Dashboard under the Analytics tab

## Environment Variables

Make sure to configure the following environment variables in your Vercel project settings:

- `MONGO_URI`: Your MongoDB connection string
- `JWT_SECRET`: Your JWT secret key
- `NODE_ENV`: Set to "production" for production deployments

## Additional Features

For more advanced analytics features, consider:

- **Custom Events**: Track specific API endpoint usage or business events
- **Filtering**: Use the Vercel dashboard to filter analytics data by various parameters
- **Privacy Compliance**: Vercel Analytics is designed with privacy in mind and complies with GDPR and other data protection standards

## Learn More

- [Vercel Analytics Documentation](https://vercel.com/docs/analytics)
- [Custom Events Guide](https://vercel.com/docs/analytics/custom-events)
- [Privacy and Compliance](https://vercel.com/docs/analytics/privacy-policy)
