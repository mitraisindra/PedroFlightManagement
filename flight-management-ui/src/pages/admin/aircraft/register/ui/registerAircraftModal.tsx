import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import RegisterAircraftForm from "../ui/registerAircraft";

interface Props {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function RegisterAircraftModal({ open, onOpenChange }: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Register Aircraft</DialogTitle>
        </DialogHeader>
        <RegisterAircraftForm />
      </DialogContent>
    </Dialog>
  );
}
