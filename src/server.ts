import mongoose from 'mongoose';
import app from './app.js';
import sanitizedConfig from './config/env.js';
import { startServerPingCron } from './utilities/cron.js';

// MongoDB Connection
const startServer = async () => {
  try {
    await mongoose.connect(sanitizedConfig.MONGO_URL);
    console.log(' MongoDB connected successfully');

    app.listen(sanitizedConfig.PORT, () => {
      console.log(` Server running on port ${sanitizedConfig.PORT}`);
      console.log(` Environment: ${sanitizedConfig.NODE_ENV}`);
      console.log(` Frontend URL: ${sanitizedConfig.FRONTEND_URL}`);
      
      // Start server ping cron job (for production on Render, also test in dev)
      startServerPingCron();
    });
  } catch (error: any) {
    console.error(' Error starting server:', error.message);
    process.exit(1);
  }
};

startServer();

export default app;
