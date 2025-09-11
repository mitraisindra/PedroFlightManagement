import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddDestinationForm from "../ui/addDestinationForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegisterAircraftModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Destination</DialogTitle>
        </DialogHeader>
        <AddDestinationForm />
      </DialogContent>
    </Dialog>
  );
}
