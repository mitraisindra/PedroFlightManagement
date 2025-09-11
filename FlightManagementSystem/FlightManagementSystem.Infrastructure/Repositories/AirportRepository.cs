using FlightManagementSystem.Domain.Interfaces;
using FlightManagementSystem.Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Infrastructure.Repositories
{
    public class AirportRepository : IAirportRepository
    {
        private readonly FlightManagementSystemDbContext _context;

        public AirportRepository(FlightManagementSystemDbContext context)
        {
            _context = context;
        }

        public async Task<(Airport, bool)> Add(Airport airport)
        {
            var isAirportExist = false;
            var checkAirport = GetAirportByIATACode(airport.IATA);
            if (checkAirport != null)
            {
                isAirportExist = true;
                return (checkAirport, isAirportExist);
            }
            await _context.Airport.AddAsync(airport);
            await _context.SaveChangesAsync();

            return (airport, isAirportExist);
        }

        public Airport? GetAirportByIATACode(string airportIATACode)
        {
            var airport = _context.Airport.Where(x => x.IATA.ToLower().Equals(airportIATACode.ToLower())).FirstOrDefault();
            return airport;

        }
    }
}
