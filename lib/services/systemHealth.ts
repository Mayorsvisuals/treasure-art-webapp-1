import { validateEnv } from '../config/env';
import { supabase } from '../supabase/client';
import { featureFlags } from '../config/features';

export interface SystemHealthStatus {
  envStatus: {
    status: 'healthy' | 'warning' | 'error';
    message: string;
    details: string[];
  };
  supabaseStatus: {
    status: 'healthy' | 'warning' | 'error';
    message: string;
  };
  featureFlags: typeof featureFlags;
}

export async function checkSystemHealth(): Promise<SystemHealthStatus> {
  const envValidation = validateEnv();
  
  let supabaseStatus: 'healthy' | 'warning' | 'error' = 'warning';
  let supabaseMessage = 'Supabase client not initialized (missing environment variables).';
  
  if (supabase) {
    try {
      const { error } = await supabase.auth.getSession();
      if (error) {
        supabaseStatus = 'error';
        supabaseMessage = `Connection failed: ${error.message}`;
      } else {
        supabaseStatus = 'healthy';
        supabaseMessage = 'Connected to Supabase successfully.';
      }
    } catch (e: any) {
      supabaseStatus = 'error';
      supabaseMessage = `Connection error: ${e.message}`;
    }
  }

  return {
    envStatus: {
      status: envValidation.isValid ? 'healthy' : 'error',
      message: envValidation.isValid ? 'All required environment variables are set.' : 'Missing required environment variables.',
      details: envValidation.missing,
    },
    supabaseStatus: {
      status: supabaseStatus,
      message: supabaseMessage,
    },
    featureFlags,
  };
}
