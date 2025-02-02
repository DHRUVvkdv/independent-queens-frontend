import { Clock, Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { sampleTodos } from "../../data/sample-todos"
import type { TodoItem, GroupedTodos } from "../../types/todo"
import { useState } from "react"
import { randomUUID } from "crypto"

export default function TodoList() {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [todos, setTodos] = useState<GroupedTodos[]>(sampleTodos);
  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    time: ""
  });
  const [isOpen, setIsOpen] = useState(false);

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit'
    });
  };

  const sortTodosByDate = (todos: GroupedTodos[]) => {
    return [...todos].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    });
  };

  const getDayOfWeek = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { weekday: 'long' });
  };

  const handleTaskComplete = (taskId: string) => {
    setCompletedTasks(prev => [...prev, taskId]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleAddTask = () => {
    // Format the date to match our existing format
    const dateObj = new Date(newTask.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
    const dayOfWeek = dateObj.toLocaleDateString('en-US', {
      weekday: 'long'
    });

    const newTodoItem: TodoItem = {
      id: randomUUID,
      title: newTask.title,
      time: newTask.time,
      accentColor: "bg-purple-500" // Default accent color
    };

    // Check if we already have a group for this date
    let updatedTodos = [...todos];
    const existingGroupIndex = updatedTodos.findIndex(
      group => group.date === formattedDate
    );

    if (existingGroupIndex !== -1) {
      // Add to existing group
      updatedTodos[existingGroupIndex].items.push(newTodoItem);
      // Sort items by time
      updatedTodos[existingGroupIndex].items.sort((a, b) =>
        new Date('1970/01/01 ' + a.time).getTime() -
        new Date('1970/01/01 ' + b.time).getTime()
      );
    } else {
      // Create new group
      const newGroup: GroupedTodos = {
        date: formattedDate,
        items: [newTodoItem]
      };
      updatedTodos.push(newGroup);
      // Sort groups by date
      updatedTodos.sort((a, b) =>
        new Date(a.date).getTime() - new Date(b.date).getTime()
      );
    }

    setTodos(updatedTodos);
    setNewTask({ title: "", date: "", time: "" });
    setIsOpen(false);
  };

  return (
    <div className="relative pt-12 px-4">
      {/* Add Task Button */}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-0"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Task</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="title">Task Name</Label>
              <Input
                id="title"
                name="title"
                value={newTask.title}
                onChange={handleInputChange}
                placeholder="Enter task name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Due Date</Label>
              <Input
                id="date"
                name="date"
                type="date"
                value={newTask.date}
                onChange={handleInputChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="time">Time</Label>
              <Input
                id="time"
                name="time"
                type="time"
                value={newTask.time}
                onChange={handleInputChange}
              />
            </div>
            <Button
              className="w-full"
              onClick={handleAddTask}
              disabled={!newTask.title || !newTask.date || !newTask.time}
            >
              Add Task
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Todo List */}
      <div className="space-y-4">
        {sortTodosByDate(todos).map((group) => (
          <div key={group.date} className="flex gap-2">
            <div className="w-16">
              <h2 className="text-base font-medium text-muted-foreground">
                {formatDisplayDate(group.date)}
              </h2>
              <p className="text-xs text-muted-foreground">
                {getDayOfWeek(group.date)}
              </p>
            </div>
            <div className="flex-1 space-y-2">
              {group.items.map((todo) => {
                if (completedTasks.includes(todo.id)) return null;
                return (
                  <TodoItem
                    key={todo.id}
                    {...todo}
                    completed={completedTasks.includes(todo.id)}
                    onComplete={() => handleTaskComplete(todo.id)}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function TodoItem({
  id,
  title,
  time,
  completed,
  accentColor,
  onComplete
}: TodoItem & {
  completed: boolean;
  onComplete: () => void;
}) {
  return (
    <Card className="relative">
      <div className={`absolute left-0 top-0 w-1 h-full`} />
      <CardContent className="p-2 flex items-center gap-3">
        <input
          type="radio"
          checked={completed}
          onChange={onComplete}
          className="h-4 w-4 text-purple-600 cursor-pointer"
        />
        <div className="flex-1">
          <h3 className="text-sm font-medium">{title}</h3>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}