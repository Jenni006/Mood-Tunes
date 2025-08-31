import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { useSubscription } from '@/hooks/useSubscription';
import { useProfile } from '@/hooks/useProfile';
import { AuthModal } from './AuthModal';
import { User, LogOut, Crown, Settings, CreditCard } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/use-toast';

export function UserMenu() {
  const { user, signOut } = useAuth();
  const { subscribed, subscription_tier } = useSubscription();
  const { profile } = useProfile();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { toast } = useToast();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: "Signed out",
        description: "You have been signed out successfully.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive",
      });
    }
  };

  const handleManageSubscription = async () => {
    try {
      const { data, error } = await supabase.functions.invoke('customer-portal');
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to open customer portal",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    return (
      <>
        <Button
          onClick={() => setShowAuthModal(true)}
          variant="outline"
          className="bg-white/10 text-white border-white/20 hover:bg-white/20"
        >
          <User className="h-4 w-4 mr-2" />
          Sign In
        </Button>
        <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      </>
    );
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={`${
            subscribed 
              ? 'bg-gradient-accent text-white border-primary/30' 
              : 'bg-white/10 text-white border-white/20'
          } hover:opacity-90`}
        >
          {subscribed ? (
            <Crown className="h-4 w-4 mr-2" />
          ) : (
            <User className="h-4 w-4 mr-2" />
          )}
          {profile?.display_name || user.email?.split('@')[0]}
          {subscription_tier && (
            <span className="ml-2 text-xs opacity-80">({subscription_tier})</span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        align="end" 
        className="bg-gradient-secondary border-purple/20 backdrop-blur-sm"
      >
        {subscribed && (
          <DropdownMenuItem onClick={handleManageSubscription} className="cursor-pointer">
            <CreditCard className="h-4 w-4 mr-2" />
            Manage Subscription
          </DropdownMenuItem>
        )}
        {!subscribed && (
          <DropdownMenuItem onClick={() => window.location.href = '/pricing'} className="cursor-pointer">
            <Crown className="h-4 w-4 mr-2" />
            Upgrade to Premium
          </DropdownMenuItem>
        )}
        <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
          <LogOut className="h-4 w-4 mr-2" />
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}