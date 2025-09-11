using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace FlightManagementSystem.Domain.Interfaces
{
    public interface IAircraftRepository
    {
        public Task<(Aircraft, bool)> Add(Aircraft aircraft);
        public Aircraft? GetAircraftByCode(string aircraftCode);
    }
}
