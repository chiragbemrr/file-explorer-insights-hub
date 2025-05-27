
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';

interface LoginProps {
  onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate authentication
    setTimeout(() => {
      if (username && password) {
        onLogin();
      }
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-purple-500 to-blue-600">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-purple-500/20 to-blue-600/20 backdrop-blur-sm"></div>
      
      <Card className="w-full max-w-md mx-4 relative z-10 bg-white/10 backdrop-blur-lg border-white/20 shadow-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-white mb-2">
            Environmental Monitor
          </CardTitle>
          <p className="text-white/80">Sign in to access dashboard</p>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-white/90">Username</Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-300"
                placeholder="Enter username"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white/90">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus:bg-white/20 transition-all duration-300"
                placeholder="Enter password"
                required
              />
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {isLoading ? 'Signing in...' : 'Login'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
