using FlightManagementSystem.Domain;
using FlightManagementSystem.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Infrastructure.Repositories
{
    public class AircraftRepository : IAircraftRepository
    {
        private readonly FlightManagementSystemDbContext _context;

        public AircraftRepository(FlightManagementSystemDbContext context)
        {
            _context = context;
        }

        public async Task<(Aircraft, bool)> Add(Aircraft aircraft) {
            var isAircraftExist = false;
            var checkAircraft = GetAircraftByCode(aircraft.AircraftCode);
            if (checkAircraft != null)
            {
                isAircraftExist = true;
                return (checkAircraft, isAircraftExist);
            }
            await _context.Aircraft.AddAsync(aircraft);
            await _context.SaveChangesAsync();

            return (aircraft, isAircraftExist);
        }

        public Aircraft? GetAircraftByCode(string aircraftCode)
        {
            var aircraft = _context.Aircraft.Where(x => x.AircraftCode.ToLower().Equals(aircraftCode.ToLower())).FirstOrDefault();
            return aircraft;
        }
    }
}
