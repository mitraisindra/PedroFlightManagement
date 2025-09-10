using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.DTOs
{
    public class AirportDTO
    {
        public int Id { get; set; }
        public string ICAO { get; set; }
        public string IATA { get; set; }
        public int? RegionId { get; set; }
        public string UsageClass { get; set; }
        public string AirportName { get; set; }
    }
}
