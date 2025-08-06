import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Plus, X } from "lucide-react";

interface AddTaskSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAddTask: (text: string) => void;
}

export const AddTaskSheet = ({ isOpen, onClose, onAddTask }: AddTaskSheetProps) => {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (taskText.trim()) {
      onAddTask(taskText.trim());
      setTaskText("");
      onClose();
    }
  };

  const handleClose = () => {
    setTaskText("");
    onClose();
  };

  return (
    <Sheet open={isOpen} onOpenChange={handleClose}>
      <SheetContent 
        side="bottom" 
        className="bg-gradient-card border-t border-border/50 shadow-strong rounded-t-2xl"
      >
        <SheetHeader className="text-left pb-6">
          <div className="flex items-center justify-between">
            <div>
              <SheetTitle className="text-xl font-bold text-foreground">Create Task</SheetTitle>
              <SheetDescription className="text-muted-foreground">
                Add a new task to your list
              </SheetDescription>
            </div>
            <Button variant="ghost" size="icon" onClick={handleClose}>
              <X className="w-5 h-5" />
            </Button>
          </div>
        </SheetHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="taskText" className="text-foreground font-medium">
              Task Description
            </Label>
            <Input
              id="taskText"
              type="text"
              placeholder="Enter your new task..."
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              className="bg-input/50 border-border focus:border-primary text-base h-12"
              autoFocus
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              size="mobile"
              onClick={handleClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="productivity"
              size="mobile"
              disabled={!taskText.trim()}
              className="flex-1"
            >
              <Plus className="w-5 h-5 mr-2" />
              Add Task
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
};