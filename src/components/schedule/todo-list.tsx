import { Clock, Plus } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { TodoItem, GroupedTodos } from "../../types/todo";
import { useState, useEffect } from "react";
import { randomUUID } from "crypto";
import { fetchCanvasAssignments, getUserData } from '@/api/scheduleApi';
import { useUser } from "@/provider/userProvider";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

interface TodoItemProps extends TodoItem {
  completed: boolean;
  onComplete: () => void;
}

export default function TodoList() {
  const { user } = useUser();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [todos, setTodos] = useState<GroupedTodos[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newTask, setNewTask] = useState({
    title: "",
    date: "",
    time: ""
  });
  const [isOpen, setIsOpen] = useState(false);
  const [hasCanvasToken, setHasCanvasToken] = useState(false);

  useEffect(() => {
    const checkUserData = async () => {
      if (!user?.email) return;
      
      try {
        const userData = await getUserData(user.email);
        setHasCanvasToken(!!userData.canvas_token);
        setLoading(false);
      } catch (err) {
        console.error("Error checking user data:", err);
        setError("Failed to load user data");
        setLoading(false);
      }
    };

    checkUserData();
  }, [user?.email]);

  useEffect(() => {
    const fetchAssignments = async () => {
      if (!user?.email || !hasCanvasToken) return;

      try {
        setError(null);
        const assignments = await fetchCanvasAssignments(user.email);

        const groupedAssignments = assignments.reduce((groups: GroupedTodos[], assignment) => {
          // Format the date to match our desired format (e.g., "Feb 8")
          const [year, month, day] = assignment.date_due.split('-');
          const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
          const formattedDate = date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          });

          const todoItem: TodoItem = {
            id: assignment.canvas_link,
            title: assignment.name,
            time: assignment.time_due,
            accentColor: "bg-blue-500",
            isCanvasAssignment: true,
            courseName: assignment.course_name
          };

          const existingGroup = groups.find(g => g.date === formattedDate);
          if (existingGroup) {
            existingGroup.items.push(todoItem);
          } else {
            groups.push({
              date: formattedDate,
              items: [todoItem]
            });
          }
          return groups;
        }, []);

        setTodos(sortTodosByDate(groupedAssignments));
      } catch (error) {
        console.error("Error fetching Canvas assignments:", error);
        setError("Failed to load Canvas assignments");
      }
    };

    fetchAssignments();
  }, [user?.email, hasCanvasToken]);

  const formatDisplayDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: '2-digit'
    });
  };

  const sortTodosByDate = (todos: GroupedTodos[]) => {
    return [...todos].sort((a, b) => {
      return new Date(a.date).getTime() - new Date(b.date).getTime();
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
    const dateObj = new Date(newTask.date);
    const formattedDate = dateObj.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });

    const newTodoItem: TodoItem = {
      id: randomUUID(),
      title: newTask.title,
      time: newTask.time,
      accentColor: "bg-purple-500"
    };

    setTodos(prevTodos => {
      let updatedTodos = [...prevTodos];
      const existingGroupIndex = updatedTodos.findIndex(
        group => group.date === formattedDate
      );

      if (existingGroupIndex !== -1) {
        updatedTodos[existingGroupIndex].items.push(newTodoItem);
        updatedTodos[existingGroupIndex].items.sort((a, b) =>
          new Date('1970/01/01 ' + a.time).getTime() -
          new Date('1970/01/01 ' + b.time).getTime()
        );
      } else {
        const newGroup: GroupedTodos = {
          date: formattedDate,
          items: [newTodoItem]
        };
        updatedTodos.push(newGroup);
        updatedTodos = sortTodosByDate(updatedTodos);
      }
      return updatedTodos;
    });

    setNewTask({ title: "", date: "", time: "" });
    setIsOpen(false);
  };

  const CanvasPrompt = () => (
    <Card className="bg-white p-6 text-center">
      <div className="flex flex-col items-center gap-4">
        <div className="rounded-full bg-blue-50 p-3">
          <Clock className="h-6 w-6 text-blue-500" />
        </div>
        <div className="space-y-2">
          <h3 className="text-lg font-semibold">Connect Canvas</h3>
          <p className="text-sm text-gray-500">
            Link your Canvas account to see your assignments in your todo list.
            Upload your Canvas access token to get started.
          </p>
        </div>
      </div>
    </Card>
  );

  if (loading) {
    return <div className="flex justify-center items-center h-48">Loading...</div>;
  }

  return (
    <div className="relative pt-12 px-4">
      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

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

      {!hasCanvasToken ? (
        <CanvasPrompt />
      ) : (
        <div className="space-y-4">
          {todos.map((group) => (
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
      )}
    </div>
  );
}

function TodoItem({
  id,
  title,
  time,
  completed,
  accentColor,
  isCanvasAssignment,
  courseName,
  onComplete
}: TodoItemProps & { courseName?: string }) {
  return (
    <Card className="relative">
      <div className={`absolute left-0 top-0 w-1 h-full ${accentColor}`} />
      <CardContent className="p-2 flex items-center gap-3">
        <input
          type="radio"
          checked={completed}
          onChange={onComplete}
          className="h-4 w-4 text-purple-600 cursor-pointer"
        />
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-medium">{title}</h3>
            {isCanvasAssignment && (
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded">
                Canvas
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="h-3 w-3" />
            <span>{time}</span>
            {courseName && (
              <span className="ml-2 text-gray-500">• {courseName}</span>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}