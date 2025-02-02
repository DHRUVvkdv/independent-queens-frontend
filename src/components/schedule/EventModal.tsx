import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from 'react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (eventData: {
    title: string;
    date: string;
    startTime: string;
    endTime: string;
  }) => void;
}

export default function EventModal({ isOpen, onClose, onSubmit }: EventModalProps) {
  const [eventData, setEventData] = useState({
    title: '',
    date: '',
    startTime: '',
    endTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(eventData);
    setEventData({ title: '', date: '', startTime: '', endTime: '' }); // Reset form
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="title" className="text-sm font-medium">Event Name</label>
            <Input
              id="title"
              value={eventData.title}
              onChange={(e) => setEventData({ ...eventData, title: e.target.value })}
              placeholder="Enter event name"
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="date" className="text-sm font-medium">Date</label>
            <Input
              id="date"
              type="date"
              value={eventData.date}
              onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="startTime" className="text-sm font-medium">Start Time</label>
            <Input
              id="startTime"
              type="time"
              value={eventData.startTime}
              onChange={(e) => setEventData({ ...eventData, startTime: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="endTime" className="text-sm font-medium">End Time</label>
            <Input
              id="endTime"
              type="time"
              value={eventData.endTime}
              onChange={(e) => setEventData({ ...eventData, endTime: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Create Event</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}