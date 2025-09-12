import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddDestinationForm from "../ui/addFlightRouteForm";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegisterAircraftModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Create Flight Route</DialogTitle>
        </DialogHeader>
        <AddDestinationForm />
      </DialogContent>
    </Dialog>
  );
}
