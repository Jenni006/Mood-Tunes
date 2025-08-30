import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface SubscriptionData {
  subscribed: boolean;
  subscription_tier: string | null;
  subscription_end: string | null;
}

export function useSubscription() {
  const { user } = useAuth();
  const [subscription, setSubscription] = useState<SubscriptionData>({
    subscribed: false,
    subscription_tier: null,
    subscription_end: null
  });
  const [loading, setLoading] = useState(true);

  const checkSubscription = async () => {
    if (!user) {
      setSubscription({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase.functions.invoke('check-subscription');
      
      if (error) throw error;
      
      setSubscription({
        subscribed: data?.subscribed || false,
        subscription_tier: data?.subscription_tier || null,
        subscription_end: data?.subscription_end || null
      });
    } catch (error) {
      console.error('Error checking subscription:', error);
      setSubscription({
        subscribed: false,
        subscription_tier: null,
        subscription_end: null
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkSubscription();
  }, [user]);

  return {
    ...subscription,
    loading,
    refetch: checkSubscription
  };
}