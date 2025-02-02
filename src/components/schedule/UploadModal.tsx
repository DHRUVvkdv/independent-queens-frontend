import React, { useState, ChangeEvent } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { UploadCloud, AlertCircle } from "lucide-react";

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { calendarFile: File | null; canvasToken: string }) => void;
}

const UploadModal: React.FC<UploadModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [calendarFile, setCalendarFile] = useState<File | null>(null);
  const [canvasToken, setCanvasToken] = useState('');
  const [error, setError] = useState<string>('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.name.endsWith('.ics')) {
        setCalendarFile(file);
        setError('');
      } else {
        setError('Please upload a valid .ics file');
        setCalendarFile(null);
      }
    }
  };

  const handleSubmit = () => {
    if (!calendarFile && !canvasToken) {
      setError('Please provide either a calendar file or Canvas API token');
      return;
    }
    onSubmit({ calendarFile, canvasToken });
    // Reset form
    setCalendarFile(null);
    setCanvasToken('');
    setError('');
  };

  const handleClose = () => {
    // Reset form on close
    setCalendarFile(null);
    setCanvasToken('');
    setError('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Import Schedule</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="grid gap-2">
            <Label htmlFor="calendar">Upload Calendar (.ics)</Label>
            <div className="flex items-center gap-2">
              <Input
                id="calendar"
                type="file"
                accept=".ics"
                onChange={handleFileChange}
                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
              <UploadCloud className="h-5 w-5 text-gray-500" />
            </div>
            {calendarFile && (
              <p className="text-sm text-gray-500">
                Selected file: {calendarFile.name}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="token">Canvas API Token</Label>
            <Input
              id="token"
              type="password"
              value={canvasToken}
              onChange={(e) => setCanvasToken(e.target.value)}
              placeholder="Enter your Canvas API token"
            />
            <p className="text-sm text-gray-500">
              You can find your Canvas API token in Account: Settings
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>Import</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UploadModal;