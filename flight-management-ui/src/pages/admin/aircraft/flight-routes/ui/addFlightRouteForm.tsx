import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";

const schema = z.object({
  departAirport: z.string().min(1, "Departing airport is required"),
  destinationAirport: z.string().min(1, "Destination airport is required"),
  aircraftId: z.string().min(1, "Aircraft is required"),
  schedule: z.date().min(1, "schedule is required")
});

type DestinationForm = z.infer<typeof schema>;

export default function AddDestinationForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<DestinationForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: DestinationForm) => {
    console.log("Register Aircraft:", data);
    // TODO: call API insert destination
  };

  // dummy aircraft data
  const dummyAircrafts = [
  { id: "1", code: "A320" },
  { id: "2", code: "B737" },
  { id: "3", code: "ATR72" },
];


  return (
    <Card className="w-full sm:max-w-xl p-8">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Departing Airport" {...register("departAirport")} />
            {errors.departAirport && (
              <p className="text-red-500 text-sm">{errors.departAirport.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Destination Airport" {...register("destinationAirport")} />
            {errors.destinationAirport && (
              <p className="text-red-500 text-sm">{errors.destinationAirport.message}</p>
            )}
          </div>

          <div>
            <Controller
              name="aircraftId"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} value={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Aircraft" />
                  </SelectTrigger>
                  <SelectContent>
                    {dummyAircrafts.map((a) => (
                      <SelectItem key={a.id} value={a.id}>
                        {a.code}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />
            {errors.aircraftId && <p className="text-red-500 text-sm">{errors.aircraftId.message}</p>}
          </div>

          {/* DatePicker for Schedule */}
          <div>
            <Controller
              name="schedule"
              control={control}
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start">
                      {field.value ? format(field.value, "PPP p") : "Pick schedule"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="p-0">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.schedule && <p className="text-red-500 text-sm">{errors.schedule.message}</p>}
          </div>


          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
