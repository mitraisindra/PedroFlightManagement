using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain
{
    public class Airport
    {
        public int Id { get; set; }
        public string ICAO { get; set; }
        public string IATA { get; set; }
        public int? RegionId { get; set; }
        public string UsageClass { get; set; }
        public string AirportName { get; set; }        

        public virtual Region Region { get; set; }
        public virtual ICollection<FlightRoute>? FlightRoutesDep { get; set; }
        public virtual ICollection<FlightRoute>? FlightRoutesDest { get; set; }
    }
}
