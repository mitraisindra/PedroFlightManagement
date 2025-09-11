using FlightManagementSystem.Domain;
using FlightManagementSystem.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Infrastructure.Repositories
{
    public class FlightRouteRepository : IFlightRouteRepository
    {
        private readonly FlightManagementSystemDbContext _context;

        public FlightRouteRepository(FlightManagementSystemDbContext context)
        {
            _context = context;
        }

        public async Task<(FlightRoute, bool)> Add(FlightRoute flightRoute) {
            var isFlightRouteExist = false;
            var checkFlightRoute = GetFlightRoute(flightRoute);
            if (checkFlightRoute != null)
            {
                isFlightRouteExist = true;
                return (checkFlightRoute, isFlightRouteExist);
            }
            await _context.FlightRoute.AddAsync(flightRoute);
            await _context.SaveChangesAsync();

            return (flightRoute, isFlightRouteExist);
        }

        public FlightRoute? GetFlightRoute(FlightRoute flightRoute)
        {
            var flightRouteFound = _context.FlightRoute
                .Where(x => x.DepartAirport.Equals(flightRoute.DepartAirport) 
                        && x.DestinationAirport.Equals(flightRoute.DestinationAirport)
                        && x.AircraftId.Equals(flightRoute.AircraftId))
                .FirstOrDefault();
            return flightRouteFound;
        }
    }
}
