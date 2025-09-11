using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IAirportRepository
    {
        public Task<(Airport, bool)> Add(Airport airport);
        public Airport? GetAirportByIATACode(string airportIATACode);
    }
}
