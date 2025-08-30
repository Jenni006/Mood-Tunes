import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock, User } from 'lucide-react';
export default function Auth() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const {
    user,
    signIn,
    signUp
  } = useAuth();
  const {
    toast
  } = useToast();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        await signUp(email, password);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account."
        });
      } else {
        await signIn(email, password);
        toast({
          title: "Welcome back!",
          description: "You have been signed in successfully."
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "An error occurred",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };
  return <div className="min-h-screen bg-gradient-primary flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-2">Moodify</h1>
          <p className="text-white/80">Your personalized music companion</p>
        </div>

        <Card className="bg-card/90 backdrop-blur-sm border-primary/20">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center text-foreground">
              {isSignUp ? 'Create account' : 'Sign in'}
            </CardTitle>
            <CardDescription className="text-center text-muted-foreground">
              {isSignUp ? 'Enter your details to create your account' : 'Enter your credentials to access your music'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && <div className="space-y-2">
                  <Label htmlFor="displayName" className="text-foreground">Display Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input id="displayName" type="text" placeholder="Your name" value={displayName} onChange={e => setDisplayName(e.target.value)} className="pl-10 bg-input border-border text-foreground" />
                  </div>
                </div>}
              
              <div className="space-y-2">
                <Label htmlFor="email" className="text-foreground">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="email" type="email" placeholder="your@email.com" value={email} onChange={e => setEmail(e.target.value)} className="pl-10 bg-input border-border text-foreground" required />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input id="password" type={showPassword ? "text" : "password"} placeholder="••••••••" value={password} onChange={e => setPassword(e.target.value)} className="pl-10 pr-10 bg-input border-border text-foreground" required />
                  <Button type="button" variant="ghost" size="sm" className="absolute right-1 top-1 h-8 w-8 p-0 text-muted-foreground hover:text-foreground" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                </div>
              </div>

              <Button type="submit" className="w-full bg-gradient-accent text-white hover:opacity-90 transition-opacity" disabled={loading}>
                {loading ? "Loading..." : isSignUp ? "Create account" : "Sign in"}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <Button variant="ghost" onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:text-primary-glow">
                {isSignUp ? "Already have an account? Sign in" : "Don't have an account? Sign up"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>;
}