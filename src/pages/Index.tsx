import { useState } from "react";
import { SplashScreen } from "@/components/SplashScreen";
import { AuthScreen } from "@/components/AuthScreen";
import { TaskList } from "@/components/TaskList";
import { SettingsScreen } from "@/components/SettingsScreen";

type AppState = 'splash' | 'auth' | 'tasks' | 'settings';

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>('splash');

  const handleSplashContinue = () => {
    setCurrentScreen('auth');
  };

  const handleAuthBack = () => {
    setCurrentScreen('splash');
  };

  const handleLogin = () => {
    setCurrentScreen('tasks');
  };

  const handleShowSettings = () => {
    setCurrentScreen('settings');
  };

  const handleSettingsBack = () => {
    setCurrentScreen('tasks');
  };

  const handleLogout = () => {
    setCurrentScreen('splash');
  };

  return (
    <div className="min-h-screen bg-background">
      {currentScreen === 'splash' && (
        <SplashScreen onContinue={handleSplashContinue} />
      )}
      
      {currentScreen === 'auth' && (
        <AuthScreen onBack={handleAuthBack} onLogin={handleLogin} />
      )}
      
      {currentScreen === 'tasks' && (
        <TaskList onSettings={handleShowSettings} />
      )}
      
      {currentScreen === 'settings' && (
        <SettingsScreen onBack={handleSettingsBack} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Index;
