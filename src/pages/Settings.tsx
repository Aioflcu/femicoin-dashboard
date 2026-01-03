import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useSettings } from '@/contexts/SettingsContext';
import { useEffect } from 'react';
import Header from '@/components/dashboard/Header';
import Footer from '@/components/dashboard/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Bell, DollarSign, Volume2, Mail, TrendingUp } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

const currencies = [
  { value: 'usd', label: 'USD ($)', symbol: '$' },
  { value: 'eur', label: 'EUR (€)', symbol: '€' },
  { value: 'gbp', label: 'GBP (£)', symbol: '£' },
  { value: 'jpy', label: 'JPY (¥)', symbol: '¥' },
  { value: 'btc', label: 'BTC (₿)', symbol: '₿' },
];

const Settings = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { settings, updateSettings } = useSettings();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  const handleSave = () => {
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated successfully.",
    });
  };

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container px-4 py-6 max-w-4xl mx-auto">
        {/* Back Button */}
        <Button 
          variant="ghost" 
          onClick={() => navigate('/dashboard')}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Dashboard
        </Button>

        <div className="mb-8">
          <h1 className="text-3xl font-display font-bold">Settings</h1>
          <p className="text-muted-foreground mt-1">Customize your WICN experience</p>
        </div>

        <div className="space-y-6">
          {/* Alert Thresholds */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Price Alert Threshold
              </CardTitle>
              <CardDescription>
                Get notified when cryptocurrency prices change by this percentage
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Alert when price changes by:</Label>
                  <span className="text-2xl font-bold text-primary">{settings.alertThreshold}%</span>
                </div>
                <Slider
                  value={[settings.alertThreshold]}
                  onValueChange={([value]) => updateSettings({ alertThreshold: value })}
                  min={1}
                  max={20}
                  step={1}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>1%</span>
                  <span>20%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Default Currency */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary" />
                Default Currency
              </CardTitle>
              <CardDescription>
                Choose your preferred currency for displaying prices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Select
                value={settings.defaultCurrency}
                onValueChange={(value) => updateSettings({ defaultCurrency: value })}
              >
                <SelectTrigger className="w-full max-w-xs">
                  <SelectValue placeholder="Select currency" />
                </SelectTrigger>
                <SelectContent>
                  {currencies.map((currency) => (
                    <SelectItem key={currency.value} value={currency.value}>
                      {currency.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-primary" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Control how and when you receive notifications
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="notifications" className="text-base">Push Notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive notifications in your browser</p>
                </div>
                <Switch
                  id="notifications"
                  checked={settings.notificationsEnabled}
                  onCheckedChange={(checked) => updateSettings({ notificationsEnabled: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="priceAlerts" className="flex items-center gap-2 text-base">
                    <TrendingUp className="w-4 h-4" />
                    Price Alerts
                  </Label>
                  <p className="text-sm text-muted-foreground">Get alerts when prices hit your threshold</p>
                </div>
                <Switch
                  id="priceAlerts"
                  checked={settings.priceAlerts}
                  onCheckedChange={(checked) => updateSettings({ priceAlerts: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="email" className="flex items-center gap-2 text-base">
                    <Mail className="w-4 h-4" />
                    Email Notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">Receive important updates via email</p>
                </div>
                <Switch
                  id="email"
                  checked={settings.emailNotifications}
                  onCheckedChange={(checked) => updateSettings({ emailNotifications: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label htmlFor="sound" className="flex items-center gap-2 text-base">
                    <Volume2 className="w-4 h-4" />
                    Sound Effects
                  </Label>
                  <p className="text-sm text-muted-foreground">Play sound when receiving notifications</p>
                </div>
                <Switch
                  id="sound"
                  checked={settings.soundEnabled}
                  onCheckedChange={(checked) => updateSettings({ soundEnabled: checked })}
                />
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button variant="gold" size="lg" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Settings;
