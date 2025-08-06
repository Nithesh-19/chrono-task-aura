import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Circle, MoreVertical, Edit3, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  text: string;
  completed: boolean;
  createdAt: Date;
}

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = ({ task, onToggle, onEdit, onDelete }: TaskItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleCancelEdit = () => {
    setEditText(task.text);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSaveEdit();
    } else if (e.key === "Escape") {
      handleCancelEdit();
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-3 p-4 bg-gradient-card rounded-xl border border-border/50 shadow-soft transition-all duration-300 hover:shadow-glow group",
      task.completed && "opacity-60"
    )}>
      {/* Completion Toggle */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onToggle(task.id)}
        className="shrink-0 hover:scale-110 transition-transform"
      >
        {task.completed ? (
          <CheckCircle2 className="w-6 h-6 text-productivity-green" />
        ) : (
          <Circle className="w-6 h-6 text-muted-foreground hover:text-primary" />
        )}
      </Button>

      {/* Task Content */}
      <div className="flex-1 min-w-0">
        {isEditing ? (
          <input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            onBlur={handleSaveEdit}
            onKeyPress={handleKeyPress}
            className="w-full bg-transparent text-foreground border-none outline-none focus:ring-0 text-base"
            autoFocus
          />
        ) : (
          <p className={cn(
            "text-base text-foreground transition-all duration-200",
            task.completed && "line-through text-muted-foreground"
          )}>
            {task.text}
          </p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {task.createdAt.toLocaleDateString()}
        </p>
      </div>

      {/* Actions Menu */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="shrink-0 opacity-0 group-hover:opacity-100 transition-opacity"
          >
            <MoreVertical className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-popover border border-border/50 shadow-strong">
          <DropdownMenuItem
            onClick={() => setIsEditing(true)}
            className="text-foreground hover:bg-accent hover:text-accent-foreground cursor-pointer"
          >
            <Edit3 className="w-4 h-4 mr-2" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onDelete(task.id)}
            className="text-destructive hover:bg-destructive hover:text-destructive-foreground cursor-pointer"
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};