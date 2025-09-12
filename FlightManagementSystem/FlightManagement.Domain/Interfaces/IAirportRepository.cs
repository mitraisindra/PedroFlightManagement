using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IAirportRepository
    {
        Task<(Airport, bool)> Add(Airport airport);
        Airport? GetAirportByIATACode(string airportIATACode);
        Task<List<Airport>> GetAll();
    }
}
