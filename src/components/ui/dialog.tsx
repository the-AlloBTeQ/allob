import React, { useState } from 'react';
import { Ticket, Loader2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog-base";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";

const TicketDialog = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [attachments, setAttachments] = useState<FileList | null>(null);

  const [ticketData, setTicketData] = useState({
    subject: '',
    category: '',
    priority: 'medium',
    description: '',
    orderReference: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const formData = new FormData();
    Object.entries(ticketData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    if (attachments) {
      Array.from(attachments).forEach((file) => {
        formData.append('attachments', file);
      });
    }

    try {
      const response = await fetch('/api/support/tickets', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error);

      toast({
        title: "Ticket Submitted Successfully",
        description: `Ticket ID: ${data.ticketId}. We'll respond within 24 hours.`,
      });

      // Reset form
      setTicketData({
        subject: '',
        category: '',
        priority: 'medium',
        description: '',
        orderReference: ''
      });
      setAttachments(null);
    } catch (error) {
      toast({
        title: "Submission Failed",
        description: error instanceof Error ? error.message : 'Something went wrong',
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Ticket className="h-4 w-4" />
          Submit Support Ticket
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Submit Support Ticket</DialogTitle>
          <DialogDescription>
            We typically respond within 24 hours
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Subject"
            value={ticketData.subject}
            onChange={(e) => setTicketData({ ...ticketData, subject: e.target.value })}
            required
          />

          <Select
            value={ticketData.category}
            onValueChange={(value) => setTicketData({ ...ticketData, category: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="delivery">Delivery Problem</SelectItem>
              <SelectItem value="account">Account Issues</SelectItem>
              <SelectItem value="payment">Payment Issue</SelectItem>
              <SelectItem value="vehicle">Vehicle Related</SelectItem>
              <SelectItem value="app">App Technical Issue</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>

          <Select
            value={ticketData.priority}
            onValueChange={(value) => setTicketData({ ...ticketData, priority: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>

          <Input
            placeholder="Order Reference (if applicable)"
            value={ticketData.orderReference}
            onChange={(e) => setTicketData({ ...ticketData, orderReference: e.target.value })}
          />

          <Textarea
            placeholder="Describe your issue in detail"
            value={ticketData.description}
            onChange={(e) => setTicketData({ ...ticketData, description: e.target.value })}
            className="min-h-[100px]"
            required
          />

          <div className="space-y-2">
            <Input
              type="file"
              onChange={(e) => setAttachments(e.target.files)}
              multiple
              className="cursor-pointer"
            />
            <p className="text-sm text-gray-500">
              Supported files: Images, PDFs, Documents (Max 5MB each)
            </p>
          </div>

          <Button 
            type="submit" 
            className="w-full"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Submitting...
              </>
            ) : (
              'Submit Ticket'
            )}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TicketDialog;