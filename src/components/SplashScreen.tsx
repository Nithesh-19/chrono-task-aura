import { Button } from "@/components/ui/button";
import { CheckCircle2, ClipboardList } from "lucide-react";
import todoLogo from "@/assets/todo-logo.png";

interface SplashScreenProps {
  onContinue: () => void;
}

export const SplashScreen = ({ onContinue }: SplashScreenProps) => {
  return (
    <div className="min-h-screen bg-gradient-hero flex flex-col items-center justify-center px-6 animate-fade-in">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-12 animate-slide-up">
        <div className="relative mb-6">
          <div className="w-32 h-32 bg-white/10 backdrop-blur-sm rounded-3xl flex items-center justify-center shadow-strong">
            <img src={todoLogo} alt="TODO Task Logo" className="w-20 h-20" />
          </div>
          {/* Floating check icons */}
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-productivity-green rounded-full flex items-center justify-center animate-pulse">
            <CheckCircle2 className="w-5 h-5 text-white" />
          </div>
          <div className="absolute -bottom-2 -left-2 w-6 h-6 bg-productivity-orange rounded-full flex items-center justify-center animate-pulse delay-300">
            <CheckCircle2 className="w-4 h-4 text-white" />
          </div>
        </div>

        {/* App Title */}
        <h1 className="text-5xl font-bold text-white mb-3 text-center">
          TODO Task
        </h1>
        <p className="text-xl text-white/80 text-center mb-2">
          Stay Organized, Stay Productive
        </p>
        <p className="text-lg text-white/60 text-center max-w-sm">
          Transform your daily routine with smart task management
        </p>
      </div>

      {/* Action Button */}
      <div className="w-full max-w-sm animate-slide-up delay-200">
        <Button 
          variant="hero" 
          size="mobile" 
          onClick={onContinue}
          className="w-full shadow-strong"
        >
          Let's Start →
        </Button>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="flex space-x-2 opacity-60">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-150"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-pulse delay-300"></div>
        </div>
      </div>
    </div>
  );
};