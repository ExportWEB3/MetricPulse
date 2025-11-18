import cron from 'node-cron';
import axios from 'axios';
import sanitizedConfig from '../config/env.js';

let pingTask: cron.ScheduledTask | null = null;

export const startServerPingCron = () => {
  // Run every 5 minutes
  pingTask = cron.schedule('*/5 * * * *', async () => {
    try {
      const serverUrl = process.env.SERVER_URL || `http://localhost:${sanitizedConfig.PORT}`;
      const response = await axios.get(`${serverUrl}/health`, {
        timeout: 5000
      });
      
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ✅ Server ping successful - Status: ${response.status}`);
    } catch (error: any) {
      const timestamp = new Date().toISOString();
      console.error(`[${timestamp}] ❌ Server ping failed:`, error.message);
    }
  });

  console.log('🔄 Server ping cron job started - runs every 5 minutes');
};

export const stopServerPingCron = () => {
  if (pingTask) {
    pingTask.stop();
    console.log('⛔ Server ping cron job stopped');
  }
};
