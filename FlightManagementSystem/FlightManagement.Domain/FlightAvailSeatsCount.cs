using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain
{
    public class FlightAvailSeatsCount
    {
        public int FlightRouteId { get; set; }
        public int AvailableSeatsCount { get; set; }
    }
}
