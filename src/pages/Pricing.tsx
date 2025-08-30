import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Check, Star, Crown, Zap } from 'lucide-react';

const plans = [
  {
    name: 'Basic',
    price: '$4.99',
    period: '/month',
    icon: Zap,
    features: [
      '3 mood playlists per day',
      'Limited skips',
      'Standard audio quality',
      'Basic mood matching'
    ],
    popular: false
  },
  {
    name: 'Standard',
    price: '$9.99',
    period: '/month',
    icon: Star,
    features: [
      'Unlimited mood playlists',
      'Unlimited skips',
      'High-quality audio',
      'Ad-free experience',
      'Advanced mood analysis'
    ],
    popular: true
  },
  {
    name: 'Premium',
    price: '$14.99',
    period: '/month',
    icon: Crown,
    features: [
      'Everything in Standard',
      'Personalized recommendations',
      'Offline downloads',
      'Early access to new features',
      'Priority customer support'
    ],
    popular: false
  }
];

export default function Pricing() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<string | null>(null);

  const handleSubscribe = async (tier: string) => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to subscribe to a plan.",
        variant: "destructive",
      });
      return;
    }

    setLoading(tier);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { tier }
      });

      if (error) throw error;

      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to create checkout session",
        variant: "destructive",
      });
    } finally {
      setLoading(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-primary">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Choose Your Music Journey
          </h1>
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            Unlock the power of mood-based music discovery with our premium plans
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative bg-card/90 backdrop-blur-sm border-primary/20 transition-all hover:scale-105 ${
                  plan.popular ? 'ring-2 ring-primary-glow shadow-glow' : ''
                }`}
              >
                {plan.popular && (
                  <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-accent text-white px-4 py-1">
                    Most Popular
                  </Badge>
                )}
                
                <CardHeader className="text-center pb-6">
                  <div className="mx-auto mb-4 w-12 h-12 bg-gradient-accent rounded-full flex items-center justify-center">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <CardTitle className="text-2xl text-foreground">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-primary">{plan.price}</span>
                    <span className="text-muted-foreground ml-1">{plan.period}</span>
                  </div>
                  <CardDescription className="text-muted-foreground">
                    Perfect for {plan.name.toLowerCase()} music lovers
                  </CardDescription>
                </CardHeader>
                
                <CardContent className="space-y-4">
                  <ul className="space-y-3">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-foreground">
                        <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button
                    onClick={() => handleSubscribe(plan.name)}
                    disabled={loading === plan.name}
                    className={`w-full mt-6 ${
                      plan.popular
                        ? 'bg-gradient-accent hover:opacity-90'
                        : 'bg-primary hover:bg-primary-glow'
                    } text-white transition-all`}
                  >
                    {loading === plan.name ? "Processing..." : `Subscribe to ${plan.name}`}
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-white/60">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}