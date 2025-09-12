using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Service.DTOs
{
    public class FlightRouteDTO
    {
        public int Id { get; set; }
        public int DepartAirport { get; set; }
        public int DestinationAirport { get; set; }
        public int AircraftId { get; set; }
        public DateTime Schedule { get; set; }
        public AirportDTO? DepAirport { get; set; }
        public AirportDTO? DestAirport { get; set; }
        public AircraftDTO? Aircraft { get; set; }
        public int? AvailSeatsCount { get; set; }
    }
}
