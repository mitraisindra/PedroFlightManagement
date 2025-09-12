using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IFlightRouteRepository
    {
        Task<(FlightRoute, bool)> Add(FlightRoute flightRoute);
        FlightRoute? GetFlightRoute(FlightRoute flightRoute);
        List<FlightRoute> GetAvailableFlightRouteByFilter(DateTime departTime, string departRegion,
                    string destRegion, int totalSeatsNeeded);
    }
}
