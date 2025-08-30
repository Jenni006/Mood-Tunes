import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { CheckCircle, Music } from 'lucide-react';

export default function SubscriptionSuccess() {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Check subscription status after successful payment
    if (user) {
      const checkSubscription = async () => {
        try {
          await supabase.functions.invoke('check-subscription');
        } catch (error) {
          console.error('Error checking subscription:', error);
        }
      };
      
      // Wait a moment for Stripe to process, then check
      setTimeout(checkSubscription, 2000);
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/90 backdrop-blur-sm border-primary/20">
        <CardHeader className="text-center pb-6">
          <div className="mx-auto mb-4 w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
            <CheckCircle className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl text-foreground">
            Subscription Successful!
          </CardTitle>
        </CardHeader>
        
        <CardContent className="text-center space-y-6">
          <p className="text-muted-foreground">
            Welcome to MoodTunes Premium! Your subscription has been activated successfully.
          </p>
          
          <div className="space-y-4">
            <div className="bg-gradient-secondary rounded-lg p-4">
              <Music className="h-6 w-6 text-primary mx-auto mb-2" />
              <p className="text-sm text-foreground">
                You now have access to unlimited mood playlists and premium features!
              </p>
            </div>
            
            <div className="space-y-3">
              <Button
                asChild
                className="w-full bg-gradient-accent text-white hover:opacity-90"
              >
                <Link to="/">Start Listening</Link>
              </Button>
              
              <Button
                variant="outline"
                asChild
                className="w-full border-primary/20 text-primary hover:bg-primary/10"
              >
                <Link to="/pricing">Manage Subscription</Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}