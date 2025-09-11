import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const schema = z.object({
  aircraftCode: z.string().min(1, "Aircraft Code is required").max(50),
  aircraftName: z.string().min(1, "Aircraft Name is required").max(50),
  // capacity: z.coerce.number().int().positive("Capacity must be positive"),
  capacity: z.number().positive("Negative value not allowed")
});

type AircraftForm = z.infer<typeof schema>;

export default function RegisterAircraftForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AircraftForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: AircraftForm) => {
    console.log("Register Aircraft:", data);
    // TODO: call API insert aircraft
  };

  return (
    <Card className="max-w-md mx-auto p-6">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Input placeholder="Aircraft Code" {...register("aircraftCode")} />
            {errors.aircraftCode && (
              <p className="text-red-500 text-sm">{errors.aircraftCode.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Aircraft Name" {...register("aircraftName")} />
            {errors.aircraftName && (
              <p className="text-red-500 text-sm">{errors.aircraftName.message}</p>
            )}
          </div>

          <div>
            <Input
              type="number"
              placeholder="Capacity"
              {...register("capacity")}
            />
            {errors.capacity && (
              <p className="text-red-500 text-sm">{errors.capacity.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
