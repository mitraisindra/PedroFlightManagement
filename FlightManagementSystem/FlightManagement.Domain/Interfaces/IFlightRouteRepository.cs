using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IFlightRouteRepository
    {
        public Task<(FlightRoute, bool)> Add(FlightRoute flightRoute);
        public FlightRoute? GetFlightRoute(FlightRoute flightRoute);
    }
}
