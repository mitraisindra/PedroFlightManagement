import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const usageClassOptions = ["Domestic", "International"] as const;

const schema = z.object({
  icao: z.string().min(1, "ICAO code is required").max(4),
  iata: z.string().min(1, "IATA code is required").max(3),
  airportName: z.string().min(1, "Airport name is required").max(100),
   usageClass: z.enum(usageClassOptions),
  regionDTO: z.object({
    regionName: z.string().min(1, "Region name is required"),
    province: z.string().min(1, "Province is required"),
    country: z.string().min(1, "Country is required"),
  }),
});

type DestinationForm = z.infer<typeof schema>;

export default function AddDestinationForm() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<DestinationForm>({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: DestinationForm) => {
    console.log("Submitting airport:", data);
    // TODO: call POST /api/Airport
  };

  return (
    <Card className="w-full max-w-2xl mx-auto p-8">
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Airport fields */}
          <div>
            <Input placeholder="ICAO Code" {...register("icao")} />
            {errors.icao && <p className="text-red-500 text-sm">{errors.icao.message}</p>}
          </div>

          <div>
            <Input placeholder="IATA Code" {...register("iata")} />
            {errors.iata && <p className="text-red-500 text-sm">{errors.iata.message}</p>}
          </div>

          <div>
            <Input placeholder="Airport Name" {...register("airportName")} />
            {errors.airportName && (
              <p className="text-red-500 text-sm">{errors.airportName.message}</p>
            )}
          </div>

          <div>
            <Select onValueChange={(val) => setValue("usageClass", val as "Domestic" | "International")}>
                <SelectTrigger>
                    <SelectValue placeholder="Select Usage Class" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="Domestic">Domestic</SelectItem>
                    <SelectItem value="International">International</SelectItem>
                </SelectContent>
            </Select>

            {errors.usageClass && (
              <p className="text-red-500 text-sm">{errors.usageClass.message}</p>
            )}
          </div>

          {/* Region fields */}
          <div>
            <Input placeholder="Region Name" {...register("regionDTO.regionName")} />
            {errors.regionDTO?.regionName && (
              <p className="text-red-500 text-sm">{errors.regionDTO.regionName.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Province" {...register("regionDTO.province")} />
            {errors.regionDTO?.province && (
              <p className="text-red-500 text-sm">{errors.regionDTO.province.message}</p>
            )}
          </div>

          <div>
            <Input placeholder="Country" {...register("regionDTO.country")} />
            {errors.regionDTO?.country && (
              <p className="text-red-500 text-sm">{errors.regionDTO.country.message}</p>
            )}
          </div>

          <Button type="submit" className="w-full h-12 text-lg">
            Save Destination
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
