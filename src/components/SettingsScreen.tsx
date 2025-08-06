import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Palette, Volume2, Info, Trash2, LogOut, User, Moon, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SettingsScreenProps {
  onBack: () => void;
  onLogout: () => void;
}

export const SettingsScreen = ({ onBack, onLogout }: SettingsScreenProps) => {
  const { toast } = useToast();

  const handleDeleteAccount = () => {
    toast({
      title: "Delete Account",
      description: "This feature will be available soon.",
      variant: "destructive",
    });
  };

  const handleThemeChange = () => {
    toast({
      title: "Theme Settings",
      description: "Theme customization coming soon.",
    });
  };

  const handleSoundSettings = () => {
    toast({
      title: "Sound Settings",
      description: "Sound preferences coming soon.",
    });
  };

  const handleAbout = () => {
    toast({
      title: "About TODO Task",
      description: "Version 1.0.0 - Built with React & TypeScript",
    });
  };

  const settingsOptions = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your account information",
      onClick: () => toast({ title: "Profile", description: "Profile settings coming soon." }),
    },
    {
      icon: Palette,
      title: "Themes",
      description: "Customize app appearance",
      onClick: handleThemeChange,
    },
    {
      icon: Volume2,
      title: "Sounds",
      description: "Notification and sound preferences",
      onClick: handleSoundSettings,
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage task reminders",
      onClick: () => toast({ title: "Notifications", description: "Notification settings coming soon." }),
    },
    {
      icon: Moon,
      title: "Focus Mode",
      description: "Distraction-free environment",
      onClick: () => toast({ title: "Focus Mode", description: "Focus mode coming soon." }),
    },
    {
      icon: Info,
      title: "About Us",
      description: "App information and credits",
      onClick: handleAbout,
    },
  ];

  return (
    <div className="min-h-screen bg-background animate-fade-in">
      {/* Header */}
      <div className="bg-gradient-card px-6 py-8 border-b border-border/50">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="w-6 h-6" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Settings</h1>
            <p className="text-muted-foreground">Customize your experience</p>
          </div>
        </div>
      </div>

      {/* Settings Content */}
      <div className="px-6 py-6 space-y-6">
        {/* Settings Options */}
        <div className="space-y-3">
          {settingsOptions.map((option, index) => (
            <Card 
              key={index} 
              className="bg-gradient-card border-border/50 shadow-soft hover:shadow-glow transition-all duration-300 cursor-pointer group"
              onClick={option.onClick}
            >
              <CardContent className="flex items-center gap-4 p-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <option.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {option.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {option.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Danger Zone */}
        <Card className="bg-gradient-card border-destructive/20 shadow-soft">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-destructive flex items-center gap-2">
              <Trash2 className="w-5 h-5" />
              Danger Zone
            </CardTitle>
            <CardDescription>
              These actions are permanent and cannot be undone
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button
              variant="destructive"
              onClick={handleDeleteAccount}
              className="w-full justify-start"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Delete Account
            </Button>
          </CardContent>
        </Card>

        {/* Logout Button */}
        <div className="pt-6">
          <Button
            variant="outline"
            size="mobile"
            onClick={onLogout}
            className="w-full"
          >
            <LogOut className="w-5 h-5 mr-2" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};