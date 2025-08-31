import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { Check, Star, Crown, Zap, ArrowLeft, Loader2 } from 'lucide-react';

const plans = [
  {
    id: 'free',
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started with MoodTunes',
    features: [
      '5 mood playlists per day',
      'Basic artist selection',
      'Standard audio quality',
      'Community support'
    ],
    icon: Star,
    priceId: null,
    popular: false
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '$9.99',
    period: '/month',
    description: 'Unlimited music discovery and premium features',
    features: [
      'Unlimited mood playlists',
      'Advanced AI recommendations',
      'High-quality audio streaming',
      'Offline playlist downloads',
      'Priority support',
      'Custom mood creation'
    ],
    icon: Crown,
    priceId: 'price_1QeBctRuUatE5UOF5KshzrjN', // Replace with your actual Stripe price ID
    popular: true
  },
  {
    id: 'pro',
    name: 'Pro',
    price: '$19.99',
    period: '/month',
    description: 'For music enthusiasts who want everything',
    features: [
      'Everything in Premium',
      'Exclusive artist content',
      'Concert recommendations',
      'Advanced analytics',
      'Early access to new features',
      'Personal music curator'
    ],
    icon: Zap,
    priceId: 'price_1QeBd8RuUatE5UOF2mKdOx8e', // Replace with your actual Stripe price ID
    popular: false
  }
];

export default function Pricing() {
  const { user, loading: authLoading } = useAuth();
  const { subscribed, subscription_tier, loading: subLoading, refetch } = useSubscription();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [processingPlan, setProcessingPlan] = useState<string | null>(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
    }
  }, [user, authLoading, navigate]);

  const handleSubscribe = async (priceId: string, planName: string) => {
    if (!user) {
      navigate('/auth');
      return;
    }

    setProcessingPlan(planName);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { priceId }
      });

      if (error) throw error;
      
      // Open Stripe checkout in a new tab
      window.open(data.url, '_blank');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to start checkout process",
        variant: "destructive"
      });
    } finally {
      setProcessingPlan(null);
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      // Open customer portal in a new tab
      window.open(data.url, '_blank');
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to open customer portal",
        variant: "destructive"
      });
    }
  };

  const getCurrentPlan = () => {
    if (!subscribed) return 'free';
    return subscription_tier?.toLowerCase() || 'free';
  };

  const isCurrentPlan = (planId: string) => {
    return getCurrentPlan() === planId;
  };

  if (authLoading || subLoading) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center">
        <Card className="bg-card/90 backdrop-blur-sm border-primary/20 p-8">
          <CardContent className="flex items-center space-x-4">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
            <span className="text-foreground">Loading...</span>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <div className="sticky top-0 z-50 bg-gradient-card backdrop-blur-md border-b border-primary/30 shadow-deep">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              onClick={() => navigate('/')}
              variant="ghost"
              size="sm"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to App
            </Button>
            <h1 className="text-2xl font-bold bg-gradient-accent bg-clip-text text-transparent">
              Choose Your Plan
            </h1>
          </div>
          
          {subscribed && (
            <Button
              onClick={handleManageSubscription}
              variant="outline"
              className="border-primary/20 text-primary hover:bg-primary/10"
            >
              Manage Subscription
            </Button>
          )}
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Unlock Your Musical Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Choose the perfect plan to discover music that matches your mood, anytime, anywhere.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            const isCurrent = isCurrentPlan(plan.id);
            const isProcessing = processingPlan === plan.name;

            return (
              <Card 
                key={plan.id} 
                className={`relative bg-card/90 backdrop-blur-sm border-primary/20 transition-all duration-300 hover:shadow-purple ${
                  plan.popular ? 'ring-2 ring-primary-glow scale-105' : ''
                } ${isCurrent ? 'bg-gradient-secondary border-primary' : ''}`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-accent text-white px-4 py-1 rounded-full text-sm font-medium">
                      Most Popular
                    </div>
                  </div>
                )}

                {isCurrent && (
                  <div className="absolute -top-4 right-4">
                    <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-xs font-medium">
                      Current Plan
                    </div>
                  </div>
                )}

                <CardHeader className="text-center pb-8">
                  <div className="mx-auto mb-4 w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center">
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {plan.description}
                  </CardDescription>
                  <div className="pt-4">
                    <span className="text-4xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground">{plan.period}</span>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <Check className="h-5 w-5 text-primary-glow flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="pt-6">
                    {plan.id === 'free' ? (
                      <Button 
                        className="w-full" 
                        variant={isCurrent ? "secondary" : "outline"}
                        disabled={isCurrent}
                      >
                        {isCurrent ? 'Current Plan' : 'Get Started Free'}
                      </Button>
                    ) : (
                      <Button
                        className="w-full bg-gradient-accent text-white hover:opacity-90"
                        onClick={() => handleSubscribe(plan.priceId!, plan.name)}
                        disabled={isCurrent || isProcessing}
                      >
                        {isProcessing ? (
                          <>
                            <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                            Processing...
                          </>
                        ) : isCurrent ? (
                          'Current Plan'
                        ) : (
                          `Upgrade to ${plan.name}`
                        )}
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Refresh Subscription Status */}
        <div className="text-center mt-12">
          <Button
            variant="ghost"
            onClick={refetch}
            className="text-muted-foreground hover:text-foreground"
          >
            Refresh Subscription Status
          </Button>
        </div>
      </div>
    </div>
  );
}