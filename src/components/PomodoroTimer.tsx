import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Play, Pause, RotateCcw, Timer } from "lucide-react";
import { cn } from "@/lib/utils";

interface PomodoroTimerProps {
  isVisible: boolean;
  onClose: () => void;
}

export const PomodoroTimer = ({ isVisible, onClose }: PomodoroTimerProps) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes in seconds
  const [isRunning, setIsRunning] = useState(false);
  const [mode, setMode] = useState<'work' | 'break'>('work');

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsRunning(false);
      // Auto switch modes
      if (mode === 'work') {
        setMode('break');
        setTimeLeft(5 * 60); // 5 minute break
      } else {
        setMode('work');
        setTimeLeft(25 * 60); // 25 minute work session
      }
    }

    return () => clearInterval(interval);
  }, [isRunning, timeLeft, mode]);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const toggleTimer = () => {
    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    setIsRunning(false);
    setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
  };

  const switchMode = (newMode: 'work' | 'break') => {
    setMode(newMode);
    setIsRunning(false);
    setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-fade-in">
      <Card className="w-full max-w-sm bg-gradient-card border-border/50 shadow-strong animate-scale-in">
        <CardHeader className="text-center pb-4">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Timer className="w-6 h-6 text-primary" />
            <CardTitle className="text-xl font-bold">Pomodoro Timer</CardTitle>
          </div>
          <CardDescription>
            {mode === 'work' ? 'Focus Time' : 'Break Time'}
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Timer Display */}
          <div className="text-center">
            <div className={cn(
              "text-6xl font-mono font-bold mb-4 transition-colors",
              mode === 'work' ? 'text-productivity-blue' : 'text-productivity-green'
            )}>
              {formatTime(timeLeft)}
            </div>
            
            {/* Progress Ring Visual */}
            <div className="relative w-32 h-32 mx-auto mb-6">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke="hsl(var(--muted))"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  stroke={mode === 'work' ? 'hsl(var(--productivity-blue))' : 'hsl(var(--productivity-green))'}
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray="283"
                  strokeDashoffset={283 - (283 * (mode === 'work' ? (25 * 60 - timeLeft) / (25 * 60) : (5 * 60 - timeLeft) / (5 * 60)))}
                  className="transition-all duration-1000 ease-linear"
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className={cn(
                  "w-16 h-16 rounded-full flex items-center justify-center",
                  mode === 'work' ? 'bg-productivity-blue/20' : 'bg-productivity-green/20'
                )}>
                  {isRunning ? (
                    <Pause className="w-8 h-8 text-foreground" />
                  ) : (
                    <Play className="w-8 h-8 text-foreground" />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="flex gap-2 mb-4">
            <Button
              variant={mode === 'work' ? 'timer' : 'outline'}
              size="sm"
              onClick={() => switchMode('work')}
              className="flex-1"
            >
              Work (25:00)
            </Button>
            <Button
              variant={mode === 'break' ? 'success' : 'outline'}
              size="sm"
              onClick={() => switchMode('break')}
              className="flex-1"
            >
              Break (05:00)
            </Button>
          </div>

          {/* Controls */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              size="lg"
              onClick={resetTimer}
              className="flex-1"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset
            </Button>
            <Button
              variant={mode === 'work' ? 'timer' : 'success'}
              size="lg"
              onClick={toggleTimer}
              className="flex-1"
            >
              {isRunning ? (
                <>
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </>
              ) : (
                <>
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </>
              )}
            </Button>
          </div>

          {/* Close Button */}
          <Button variant="ghost" onClick={onClose} className="w-full">
            Close Timer
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};