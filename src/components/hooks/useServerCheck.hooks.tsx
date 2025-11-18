import axios from "axios";
import { BASE_URL } from "../../utilities/baseURL";

/**
 * Simple server check without UserContext dependency
 * Avoids circular imports
 */
export const useServerCheck = () => {
  const checkServerStatus = async (retries = 3): Promise<boolean> => {
    // Create a simple axios instance without context dependencies
    const instance = axios.create({
      baseURL: BASE_URL,
      withCredentials: true,
      timeout: 5000, // 5 second timeout per request
    });

    for (let i = 0; i < retries; i++) {
      try {
        console.log(`[ServerCheck] Attempt ${i + 1}/${retries}`);
        const response = await instance.get('/serverstatus');
        console.log('[ServerCheck] Success:', response.status);
        return true;
      } catch (error: any) {
        console.error(`[ServerCheck] Attempt ${i + 1} failed:`, {
          status: error?.response?.status,
          message: error?.message,
          url: error?.config?.url,
          code: error?.code,
        });
        
        if (i === retries - 1) {
          // Final attempt failed
          console.warn('[ServerCheck] All retries exhausted. Server appears to be down.');
          return false;
        }
        
        // Wait before retrying (shorter delay - 500ms)
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    return false;
  };

  return { checkServerStatus };
};
