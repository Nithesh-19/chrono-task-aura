import { useState } from "react";
import { Button } from "@/components/ui/button";
import { TaskItem } from "./TaskItem";
import { AddTaskSheet } from "./AddTaskSheet";
import { PomodoroTimer } from "./PomodoroTimer";
import { Plus, Timer, Settings, TrendingUp, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskListProps {
  onSettings: () => void;
}

export const TaskList = ({ onSettings }: TaskListProps) => {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      text: "Complete project presentation",
      completed: false,
      createdAt: new Date(),
    },
    {
      id: "2", 
      text: "Review quarterly reports",
      completed: true,
      createdAt: new Date(Date.now() - 86400000),
    },
    {
      id: "3",
      text: "Schedule team meeting",
      completed: false,
      createdAt: new Date(Date.now() - 172800000),
    },
  ]);
  
  const [showAddTask, setShowAddTask] = useState(false);
  const [showTimer, setShowTimer] = useState(false);
  const { toast } = useToast();

  const completedTasks = tasks.filter(task => task.completed).length;
  const totalTasks = tasks.length;
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  const handleAddTask = (text: string) => {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: new Date(),
    };
    setTasks(prev => [newTask, ...prev]);
    toast({
      title: "Task Added",
      description: "Your new task has been added successfully.",
    });
  };

  const handleToggleTask = (id: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleEditTask = (id: string, newText: string) => {
    setTasks(prev => 
      prev.map(task => 
        task.id === id ? { ...task, text: newText } : task
      )
    );
    toast({
      title: "Task Updated",
      description: "Your task has been updated successfully.",
    });
  };

  const handleDeleteTask = (id: string) => {
    setTasks(prev => prev.filter(task => task.id !== id));
    toast({
      title: "Task Deleted",
      description: "Your task has been removed from the list.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-card px-6 py-8 border-b border-border/50">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">My Tasks</h1>
            <p className="text-muted-foreground">Stay focused and productive</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onSettings}>
            <Settings className="w-6 h-6" />
          </Button>
        </div>
        
        {/* Progress Overview */}
        <div className="bg-card/30 backdrop-blur-sm rounded-xl p-4 border border-border/30">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary" />
              <span className="font-medium text-foreground">Progress</span>
            </div>
            <span className="text-sm text-muted-foreground">
              {completedTasks}/{totalTasks} completed
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div 
              className="bg-gradient-primary h-2 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>Keep going!</span>
            <span>{Math.round(progressPercentage)}%</span>
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="px-6 py-6">
        {tasks.length === 0 ? (
          <div className="text-center py-12">
            <CheckCircle2 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
            <p className="text-muted-foreground mb-6">Create your first task to get started!</p>
            <Button variant="productivity" onClick={() => setShowAddTask(true)}>
              <Plus className="w-5 h-5 mr-2" />
              Create Task
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {tasks.map(task => (
              <TaskItem
                key={task.id}
                task={task}
                onToggle={handleToggleTask}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gradient-card border-t border-border/50 px-6 py-4 backdrop-blur-sm">
        <div className="flex items-center justify-center gap-8">
          <Button
            variant="ghost"
            size="icon"
            onClick={onSettings}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Settings className="w-6 h-6" />
            <span className="text-xs">Settings</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setShowTimer(true)}
            className="flex flex-col gap-1 h-auto py-2"
          >
            <Timer className="w-6 h-6" />
            <span className="text-xs">Timer</span>
          </Button>
          
          <Button
            variant="productivity"
            size="icon"
            onClick={() => setShowAddTask(true)}
            className="w-14 h-14 rounded-full shadow-glow"
          >
            <Plus className="w-7 h-7" />
          </Button>
        </div>
      </div>

      {/* Modals */}
      <AddTaskSheet
        isOpen={showAddTask}
        onClose={() => setShowAddTask(false)}
        onAddTask={handleAddTask}
      />
      
      <PomodoroTimer
        isVisible={showTimer}
        onClose={() => setShowTimer(false)}
      />
    </div>
  );
};